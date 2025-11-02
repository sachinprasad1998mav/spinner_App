import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import RequireAuth from "./app/RequireAuth";
import App from "./App";
import DashboardPage from "./pages/Dashboard";
import PlayPage from "./pages/PlayPage";
import RewardsPage from "./pages/RewardsPage";
import LoginPage from "./pages/LoginPage";

import "./index.css";

store.subscribe(() => {
  try {
    const { user } = store.getState().auth;
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("auth persistence failed", err);
    }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "play", element: <PlayPage /> },
          { path: "rewards", element: <RewardsPage /> },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
});
