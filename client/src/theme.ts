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
  layerStyles: {
    heading: {
      color: "#001858",
    },
    text: {
      color: "#172c66",
    },
    boxButton: {
      border: "1px solid #001858",
      borderRadius: "md",
      backgroundColor: "#fffffe",
      boxShadow: "md",
      _hover: { cursor: "pointer", transform: "scale(1.005)" },
      _active: { transform: "scale(1)" },
    },
    createButton: {
      w: "100%",
      border: "3px solid #001858",
      bgColor: "#fffffe",
      color: "#001858",
    },
    accordionButton: {
      bgColor: "#001858",
      borderTopRadius: "md",
      _active: { transform: "scale(1)" },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "#001858",
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
    // Button: {
    //   baseStyle: {
    //     bg: "#f582ae",
    //     color: "#001858",
    //   },
    //   defaultProps: {
    //     size: "lg",
    //     variant: "sm",
    //   },
    // },
  },
});
