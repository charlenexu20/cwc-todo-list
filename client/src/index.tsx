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
import ResetPassword from "./pages/ResetPassword";
import Project from "./pages/Project";

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
        loader: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const response = await axios.get(
                "http://localhost:3001/auth/user-projects",
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
      {
        path: "/project/:id",
        element: <Project />,
        loader: async ({ params }) => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const response = await axios.get(
                `http://localhost:3001/auth/project/${params.id}`,
                { headers: { Authorization: `Bearer ${token}` } },
              );

              if (response.data.length === 0) {
                toast({
                  title: "An error occurred.",
                  description: "You do not have access to that project!",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
                return redirect("/projects");
              }
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
      {
        path: "/reset-password/:token/:id",
        element: <ResetPassword />,
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
