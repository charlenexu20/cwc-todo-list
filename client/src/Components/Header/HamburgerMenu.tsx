import { HamburgerIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Page } from "./Header";
import { Link } from "react-router-dom";

type Props = {
  pages: Page[];
  isLargerThan340: boolean;
};

const HamburgerMenu = ({ pages, isLargerThan340 }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        size={isLargerThan340 ? "md" : "sm"}
        colorScheme="brand"
        color="#001858"
        _hover={{ bgColor: "#aa96b1", color: "#fffffe" }}
      />
      <MenuList>
        {pages.map((page) => {
          return (
            <Link to={page.path} key={page.name}>
              <MenuItem
                color="#172c66"
                _hover={{ bgColor: "#F7FADB" }}
                _focus={{ bgColor: "#F7FADB" }}
              >
                {page.name}
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
