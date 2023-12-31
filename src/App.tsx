import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Sessions, CreateSession, EndSession } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// these are all the routes in the app -- the navigation component will take the user from one view to the next
// using these routes
let router = createBrowserRouter([
  {
    path: "/",
    element: <CreateSession />,
  },
  {
    path: "/createSession",
    element: <CreateSession />,
  },
  {
    path: "/sessions",
    element: <Sessions />,
  },
  {
    path: "/endSession",
    element: <EndSession />,
  },
]);

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
    </div>
  );
}
