import { Box, Heading, Image, useMediaQuery } from "@chakra-ui/react";
import FullMenu from "./FullMenu";
import HamburgerMenu from "./HamburgerMenu";

export type Page = {
  name: string;
  path: string;
  showWhenLoggedIn: boolean;
};

const pages: Page[] = [
  { name: "Log In", path: "/log-in", showWhenLoggedIn: false },
  { name: "Create Account", path: "/sign-up", showWhenLoggedIn: false },
  { name: "Projects", path: "/projects", showWhenLoggedIn: true },
  { name: "Account Details", path: "/profile", showWhenLoggedIn: true },
];

export type Props = {
  loggedIn: boolean;
};

const Header = ({ loggedIn }: Props) => {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [isLargerThan775] = useMediaQuery("(min-width: 775px)");
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan340] = useMediaQuery("(min-width: 340px)");

  const filterPages = (pages: Page[]) => {
    return pages.filter((page) => {
      if (loggedIn) {
        return page.showWhenLoggedIn;
      } else {
        return !page.showWhenLoggedIn;
      }
    });
  };

  return (
    <Box py={4} px={isLargerThan500 ? 8 : 4} display="flex" alignItems="center">
      <Box
        display="flex"
        gap={isLargerThan500 ? 4 : 2}
        alignItems="center"
        flex={1}
      >
        <Image
          borderRadius="full"
          boxSize={
            isLargerThan775
              ? "80px"
              : isLargerThan500
                ? "65"
                : isLargerThan340
                  ? "58px"
                  : "50px"
          }
          src="https://i.pinimg.com/originals/8d/dc/8f/8ddc8f3de64883ab8ad6d139878dfdeb.jpg"
          alt="temp logo"
          boxShadow="lg"
        />
        <Heading
          fontSize={isLargerThan775 ? "4xl" : isLargerThan500 ? "3xl" : "xl"}
        >
          Project Planning Tool
        </Heading>
      </Box>
      {isLargerThan1000 ? (
        <FullMenu pages={filterPages(pages)} />
      ) : (
        <HamburgerMenu
          pages={filterPages(pages)}
          isLargerThan340={isLargerThan340}
        />
      )}
    </Box>
  );
};

export default Header;
