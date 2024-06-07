import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Page } from "./Header";

type Props = {
  pages: Page[];
};

const FullMenu = ({ pages }: Props) => {
  return (
    <Box display="flex" justifyContent="space-around" width="50%">
      {pages.map((page) => {
        return (
          <Link to={page.path} key={page.name}>
            <Box layerStyle="text">{page.name}</Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default FullMenu;
