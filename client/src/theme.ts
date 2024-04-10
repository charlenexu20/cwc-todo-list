import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `'Roboto Slab', serif`,
    body: `'Courier Prime', monospace`,
  },
  styles: {
    global: {
      body: {
        bg: "#fef6e4",
      },
    },
  },
  colors: {
    brand: {
      500: "#f3d2c1",
    },
  },
  layerStyles: {
    heading: {
      color: "#001858",
    },
    text: {
      color: "#172c66",
    },
    boxButton: {
      border: "1px solid #172c66",
      borderRadius: "md",
      backgroundColor: "#fffffe",
      boxShadow: "md",
      _hover: {
        cursor: "pointer",
        transform: "scale(1.005)",
        bgColor: "#faece6",
      },
      _active: { transform: "scale(1)" },
    },
    // actionButton: {
    //   border: "3px solid #001858",
    //   bgColor: "#f3d2c1",
    //   color: "#001858",
    // },
    // editButton: {
    //   border: "1px solid #001858",
    //   bgColor: "#f3d2c1",
    //   color: "#001858",
    // },
    accordionButton: {
      bgColor: "#d77372",
      borderTopRadius: "md",
      _active: { transform: "scale(1)" },
    },
    accordionPanel: {
      bgColor: "#fffffe",
      borderBottomRadius: "md",
      borderLeft: "1px solid #172c66",
      borderRight: "1px solid #172c66",
      borderBottom: "1px solid #172c66",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "#001858",
        letterSpacing: "0.1rem",
      },
    },
    Text: {
      baseStyle: {
        color: "#172c66",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "#45446A",
      },
    },
    Link: {
      baseStyle: {
        color: "#172c66",
      },
    },
    Button: {
      variants: {
        "action-button": {
          bgColor: "#f3d2c1",
          color: "#001858",
          _hover: { bgColor: "#fac2a5", color: "#001858" },
          // boxShadow: "0 0 2px 2px #efdfde",
        },
      },
    },
    IconButton: {
      baseStyle: {
        bgColor: "#f3d2c1",
        color: "#001858",
        _hover: { bgColor: "#8bd3dd", color: "#fef6e4" },
      },
      variants: {
        "edit-button": {
          bgColor: "#f3d2c1",
          color: "#001858",
          _hover: { bgColor: "#8bd3dd", color: "#fef6e4" },
          // boxShadow: "0 0 2px 2px #efdfde",
        },
      },
    },
  },
});
