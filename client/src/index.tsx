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
    loader: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:3001/auth/profile",
            { headers: { Authorization: `Bearer ${token}` } },
          );
          return response.data;
        } catch (error) {
          return {};
        }
      } else {
        return {};
      }
    },
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
          if (token) {
            try {
              const response = await axios.get(
                "http://localhost:3001/auth/profile",
                { headers: { Authorization: `Bearer ${token}` } },
              );
              return response.data;
            } catch (error) {
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
