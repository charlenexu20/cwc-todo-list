import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: `'Roboto Slab', serif`,
    body: `'Courier Prime', monospace`,
  },
  styles: {
    global: {
      body: {
        bg: "#FEFFF7",
      },
    },
  },
  colors: {
    brand: {
      500: "#d8d0db", // Active color
      600: "#aa96b1", // Hover color
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
        bgColor: "#F7FADB",
      },
      _active: { transform: "scale(1)" },
    },
    accordionButton: {
      bgColor: "#AEA9DF",
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
          bgColor: "#D8D0DB",
          color: "#001858",
          _hover: { bgColor: "#AA96B1", color: "#FEFFF7" },
        },
        "delete-btn": {
          bgColor: "#F7FADB",
          color: "#aea9df",
          _hover: { bgColor: "#f0f1ca ", color: "#AA96B1" },
        },
      },
      defaultProps: {
        size: "lg",
      },
    },

    // IconButton: {
    //   baseStyle: {
    //     bgColor: "#d8d0db",
    //     color: "#001858",
    //   },
    //   variants: {
    //     "custom-btn": {
    //       _hover: { bgColor: "#aa96b1", color: "#fffffe" },
    //     },
    //   },
    // },
  },
});
