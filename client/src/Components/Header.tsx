import { Box, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Log In", path: "/log-in", showWhenLoggedIn: false },
  { name: "Create Account", path: "/sign-up", showWhenLoggedIn: false },
  { name: "Projects", path: "/projects", showWhenLoggedIn: true },
  { name: "Account Details", path: "/profile", showWhenLoggedIn: true },
];

type Props = {
  loggedIn: boolean;
};

const Header = ({ loggedIn }: Props) => {
  return (
    <Box display="flex" alignItems="center">
      <Box p={4} display="flex" gap={4} alignItems="center">
        <Image
          borderRadius="full"
          boxSize="70px"
          src="https://i.pinimg.com/originals/8d/dc/8f/8ddc8f3de64883ab8ad6d139878dfdeb.jpg"
          alt="temp logo"
        />
        <Heading fontSize={26}>Project Planning Tool</Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" width="70%">
        {pages.map((page) => {
          if (
            (loggedIn && page.showWhenLoggedIn) ||
            (!loggedIn && !page.showWhenLoggedIn)
          ) {
            return (
              <Link to={page.path} key={page.name}>
                <Box>{page.name.toUpperCase()}</Box>
              </Link>
            );
          } else {
            return null;
          }
        })}
      </Box>
    </Box>
  );
};

export default Header;
