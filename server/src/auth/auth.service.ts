import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountDetailDto, LogInDto, SignUpDto } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { ProjectsService } from 'src/projects/projects.service';
import { FeaturesService } from 'src/features/features.service';
import { UserStoriesService } from 'src/userStories/userStories.service';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private projectsService: ProjectsService,
    private featuresService: FeaturesService,
    private userStoriesService: UserStoriesService,
    private tasksService: TasksService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createAccessToken(user: User, secret?: string) {
    const payload = { sub: user.id };

    if (secret) {
      return await this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '10m',
      });
    } else {
      return await this.jwtService.signAsync(payload);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const usernameExists = (
      await this.usersService.findUserByUsername(signUpDto.username)
    )?.username;

    const emailExists = (
      await this.usersService.findUserByEmail(signUpDto.email)
    )?.email;

    if (usernameExists) {
      throw new BadRequestException('username already exists');
    }

    if (emailExists) {
      throw new BadRequestException('email already exists');
    }

    const hashedPassword = await this.hashPassword(signUpDto.password);
    signUpDto.password = hashedPassword;

    const user = await this.usersService.createUser(signUpDto);

    return this.createAccessToken(user);
  }

  async verifyPassword(enteredPassword: string, existingPassword: string) {
    return await bcrypt.compare(enteredPassword, existingPassword);
  }

  async logIn(logInDto: LogInDto) {
    const user = await this.usersService.findUserByUsername(logInDto.username);

    if (user) {
      const passwordsMatch = await this.verifyPassword(
        logInDto.password,
        user.password,
      );
      if (!passwordsMatch) {
        throw new UnauthorizedException('incorrect password');
      }
    } else {
      throw new UnauthorizedException('username does not exist');
    }

    return await this.createAccessToken(user);
  }

  async changeAccountDetail(accountDetailDto: AccountDetailDto) {
    const user = await this.usersService.findUserByUsername(
      accountDetailDto.username,
    );

    if (accountDetailDto.field === 'password') {
      const plainTextPassword = accountDetailDto.value;
      const hashedPassword = await this.hashPassword(plainTextPassword);
      user[accountDetailDto.field] = hashedPassword;
    } else {
      user[accountDetailDto.field] = accountDetailDto.value;
    }

    const updateUser = await this.usersService.createUser(user);
    return {
      name: updateUser.name,
      email: updateUser.email,
      username: updateUser.username,
    };
  }

  async getProfileData(id: number) {
    const user = await this.usersService.findUserById(id);
    return {
      email: user.email,
      name: user.name,
      username: user.username,
    };
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (user === null) {
      throw new BadRequestException('email not found');
    }

    // Create a JWT with the user's current hashed password as secret
    const token = await this.createAccessToken(user, user.password);

    // Send an email to the user with a link to a reset password page on the frontend with the JWT and userId as params
    return await this.mailService.sendPasswordResetEmail(user, token);
  }

  async sendNewPassword(newPassword: string, id: number, token: string) {
    // Get the user associated with that id
    const user = await this.usersService.findUserById(id);

    // Verify token using the user we just looked up's hashed password
    await this.jwtService
      .verifyAsync(token, {
        secret: user.password,
      })
      .catch(() => {
        throw new UnauthorizedException('token is invalid');
      })
      .then(async () => {
        // If we have a payload, hash the newPassword and update the user in the database
        const hashedPassword = await this.hashPassword(newPassword);
        user.password = hashedPassword;
        return await this.usersService.createUser(user);
      });
  }

  async deleteUser(id: number) {
    return await this.usersService.deleteUser(id);
  }

  async getUserProjects(userId: number) {
    const user = await this.getProfileData(userId);
    const projects = await this.projectsService.getUserProjects(userId);

    return {
      user,
      projects,
    };
  }

  async getProject(userId: number, id: number) {
    const projects = await this.projectsService.getUserProjects(userId);
    return projects.find((project) => project.id === id);
  }

  async createProject(name: string, description: string, userId: number) {
    return await this.projectsService.createProject(name, description, userId);
  }

  async updateProject(
    field: string,
    value: string,
    userId: number,
    projectId: number,
  ) {
    return await this.projectsService.updateProject(
      field,
      value,
      userId,
      projectId,
    );
  }

  async createFeature(
    name: string,
    description: string,
    userId: number,
    projectId: number,
  ) {
    // Retrieve projects associated with the user
    const projects = await this.projectsService.getUserProjects(userId);

    // Find the project with the specified ID
    const project = projects.find((project) => project.id === projectId);

    // Check if the project is found
    if (project) {
      // If the project is found, create the feature
      await this.featuresService.createFeature(name, description, projectId);
      return await this.projectsService.getProjectById(projectId);
    } else {
      // If the project is not found, throw an UnauthorizedException
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async updateFeature(
    field: string,
    value: string,
    userId: number,
    featureId: number,
  ) {
    const projectId = await this.featuresService.updateFeature(
      field,
      value,
      userId,
      featureId,
    );
    return await this.projectsService.getProjectById(projectId);
  }

  async createUserStory(
    name: string,
    description: string,
    userId: number,
    projectId: number,
    featureId: number,
  ) {
    const projects = await this.projectsService.getUserProjects(userId);
    const project = projects.find((project) => project.id === projectId);

    if (project) {
      const features = project.features;
      const feature = features.find((feature) => feature.id === featureId);

      if (feature) {
        await this.userStoriesService.createUserStory(
          name,
          description,
          featureId,
        );
        return await this.projectsService.getProjectById(projectId);
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async updateUserStory(
    field: string,
    value: string,
    userId: number,
    userStoryId: number,
  ) {
    const projectId = await this.userStoriesService.updateUserStory(
      field,
      value,
      userId,
      userStoryId,
    );
    return await this.projectsService.getProjectById(projectId);
  }

  async deleteUserStory(userStoryId: number, userId: number) {
    const projectId = await this.userStoriesService.deleteUserStory(
      userStoryId,
      userId,
    );
    return await this.projectsService.getProjectById(projectId);
  }

  async createTask(
    name: string,
    userId: number,
    projectId: number,
    featureId: number,
    userStoryId: number,
  ) {
    const projects = await this.projectsService.getUserProjects(userId);
    const project = projects.find((project) => project.id === projectId);

    if (project) {
      const features = project.features;
      const feature = features.find((feature) => feature.id === featureId);

      if (feature) {
        const userStories = feature.userStories;
        const userStory = userStories.find(
          (userStory) => userStory.id === userStoryId,
        );

        if (userStory) {
          await this.tasksService.createTask(name, userStoryId);
          return await this.projectsService.getProjectById(projectId);
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } else {
        throw new UnauthorizedException('Unauthorized');
      }
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async updateTask(
    field: string,
    value: string,
    userId: number,
    taskId: number,
  ) {
    const userStoryId = await this.tasksService.updateTask(
      field,
      value,
      userId,
      taskId,
    );
    return await this.userStoriesService.getUserStoryStatusById(userStoryId);
  }

  async deleteTask(taskId: number, userId: number) {
    const userStoryId = await this.tasksService.deleteTask(taskId, userId);
    const storyStatus =
      await this.userStoriesService.getUserStoryStatusById(userStoryId);

    const updatedUserStory =
      await this.userStoriesService.getUserStoryById(userStoryId);

    return {
      storyStatus,
      taskList: updatedUserStory.tasks,
    };
  }
}
