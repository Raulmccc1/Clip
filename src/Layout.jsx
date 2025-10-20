import React, { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet, useLocation } from "react-router-dom";
import { Fallback } from "./components/Fallback";

const Header = lazy(() => import("./components/Header/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <ErrorBoundary FallbackComponent={Fallback}>
        {/* Header */}
        <Suspense
          fallback={
            <div className="min-h-[30vh] grid place-items-center">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">
                  Loading header...
                </span>
              </div>
            </div>
          }
        >
          <Header />
        </Suspense>

        <main id="main-content" className="flex-1 w-full">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Suspense
          fallback={
            <div className="min-h-[30vh] grid place-items-center">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
                  aria-hidden="true"
                />
                <span className="text-sm text-muted-foreground">
                  Loading footer...
                </span>
              </div>
            </div>
          }
        >
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
