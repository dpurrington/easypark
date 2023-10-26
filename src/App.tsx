import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// I'm thinking there's a way to pull all these in with one go.
import Root from "./routes/Root";
import Sessions from "./routes/Sessions";
import CreateSession from "./routes/CreateSession";
import EndSession from "./routes/EndSession";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/newSession",
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
