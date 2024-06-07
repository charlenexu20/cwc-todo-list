import { Outlet, useLoaderData } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import { useState } from "react";
import { theme } from "./theme";

type Data = {
  name: string;
  email: string;
  username: string;
};

export type Context = {
  loggedIn: boolean;
  toggleLoggedIn: () => void;
};

function App() {
  const data = useLoaderData() as Data | undefined;
  const [loggedIn, setLoggedIn] = useState(data?.username !== undefined);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  const context: Context = {
    loggedIn,
    toggleLoggedIn,
  };

  return (
    <ChakraProvider theme={theme}>
      <Header loggedIn={loggedIn} />
      <Outlet context={context} />
    </ChakraProvider>
  );
}

export default App;
