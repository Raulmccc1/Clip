import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

import { useAuth } from "@/context/authContext";

import { BarLoader } from "react-spinners";
import HeaderAuth from "./HeaderAuth";

const routes = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
];

const Header = React.memo(function Header() {
  const { session, user, logOut, authLoading } = useAuth();

  return (
    <div className="fixed top-0 z-50 w-full border-b backdrop-blur bg-white/30 dark:bg-black/30">
      {authLoading && (
        <BarLoader
          width={"100%"}
          cssOverride={{
            backgroundColor: "red",
            position: "absolute",
            bottom: "0px",
          }}
        />
      )}
      <header
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5 md:py-3"
        role="banner"
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span aria-hidden="true">
            <SquareArrowOutUpRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <Link
            to="/"
            className="text-lg sm:text-xl font-sans font-semibold tracking-tight"
            aria-label="Go to homepage"
          >
            Clip
          </Link>
        </div>

        {/* Primary Nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-5">
            {routes.map(({ name, href }, idx) => (
              <li key={idx}>
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `font-sans text-sm lg:text-base tracking-wide transition-colors ${
                      isActive
                        ? "text-black dark:text-white"
                        : "text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-white"
                    }`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth / Profile */}
        <HeaderAuth session={session} user={user} logOut={logOut} />
      </header>
    </div>
  );
});

export default Header;
