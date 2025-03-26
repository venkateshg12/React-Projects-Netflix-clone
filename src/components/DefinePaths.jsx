import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import HomePage from './HomePage';
import Browse from './Browse';
import DetailedInfo from './DetailedInfo';
import GptSearch from './GptSearch';
import MovieSearch from './MovieSearch';

const DefinePaths = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/:id",
      element: <DetailedInfo />
    },
    {
      path: "gptSearch",
      element: <GptSearch />
    },
    {
      path: "findMovie",
      element: <MovieSearch />
    }
  ]);

  return (
    <RouterProvider router={appRouter} />
  );
}
export default DefinePaths;