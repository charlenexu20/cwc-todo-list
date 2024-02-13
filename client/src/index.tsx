import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/log-in",
        element: <LogIn />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          const token = localStorage.getItem("token");
          // if we have a token, we'll use it as a bearer token on our request for user data
          if (token) {
            try {
              const response = await axios.get(
                "http://localhost:3001/auth/profile",
                { headers: { Authorization: `Bearer ${token}` } },
              );
              return response.data;
            } catch (error) {
              // if you have an expired token, we will show an error toast and redirect the user to the log-in page
              toast({
                title: "An error occurred.",
                description: "You must be signed in to view this page.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
              return redirect("/log-in");
            }
          } else {
            // if we do not have a token, we will show an error toast and redirect the user to the sign-up page
            toast({
              title: "An error occurred.",
              description: "You must have an account to view this page.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            return redirect("/sign-up");
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <>
    <ToastContainer />
    <RouterProvider router={router} />
  </>,
);
