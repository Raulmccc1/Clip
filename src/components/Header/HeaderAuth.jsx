import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Badge } from "../ui/badge";

const HeaderAuth = ({ session, user, logOut }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const authLinks = (mode) => {
    params.set("mode", mode);
    return params.toString();
  };
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <ThemeToggle />
      {session || user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8 ring-1 ring-black/10 dark:ring-white/10">
              <AvatarImage
                src={user?.user_metadata?.profile_pic}
                alt={user?.user_metadata?.name}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className={"object-cover"}
              />
              <AvatarFallback className="text-[10px] font-medium">
                {user?.user_metadata?.name
                  .split(" ")
                  .map((val) => val[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              to={"/dashboard"}
              className="flex gap-3 items-center justify-start text-sm rounded"
            >
              <DropdownMenuItem className={"cursor-pointer w-full"}>
                <LinkIcon className="h-4 w-4" />
                <p>My Links</p>
              </DropdownMenuItem>
            </Link>
            <button
              className="w-full flex gap-3 items-center justify-start text-sm rounded"
              onClick={logOut}
            >
              <DropdownMenuItem className={"cursor-pointer w-full"}>
                <LogOut className="h-4 w-4 text-red-500" />
                <p className="text-red-500">LogOut</p>
              </DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "cursor-pointer px-3 sm:px-4 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50 dark:focus-visible:ring-white/50"
                }
              >
                <p>Account</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56">
              <DropdownMenuLabel>Authenticate</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link
                to={`/auth?${authLinks("signin")}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50 dark:focus-visible:ring-white/50 rounded text-sm"
              >
                <DropdownMenuItem className={"cursor-pointer w-full"}>
                  Sign Up
                </DropdownMenuItem>
              </Link>
              <Link
                to={`/auth?${authLinks("login")}`}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50 dark:focus-visible:ring-white/50 rounded text-sm"
              >
                <DropdownMenuItem className={"cursor-pointer w-full"}>
                  Log In
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default HeaderAuth;
