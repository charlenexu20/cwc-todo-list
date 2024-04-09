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
