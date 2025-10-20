import React, { lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./Layout";
import { URLProvider } from "./context/urlContext";

const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const LinkAnalytic = lazy(() => import("./pages/LinkAnalytic"));
const Auth = lazy(() => import("./pages/Auth"));
const Redirect = lazy(() => import("./pages/Redirect"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About/About"));
const Features = lazy(() => import("./pages/Features"));

function URLLayout() {
  return (
    <URLProvider>
      <Outlet />
    </URLProvider>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="auth" element={<Auth />} />
          <Route element={<URLLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="dashboard/:id" element={<LinkAnalytic />} />
            <Route path=":id" element={<Redirect />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
