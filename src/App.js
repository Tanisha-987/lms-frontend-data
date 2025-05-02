import Navbar from "./components/navbar";
// import Welcome from "./components/welcome";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages
import Home from "./pages/home";
import Courses from "./pages/courses";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Courses/>
      </>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/courses",
    element: (
      <>
        <Navbar />
        <Courses />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
