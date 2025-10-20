import { SquareArrowOutUpRight } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogIn from "@/components/Login";
import SignIn from "@/components/SignIn";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import useAuthUser from "@/hooks/AuthUser";

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url = searchParams.get("create-new-link") || "";
  const mode = searchParams.get("mode") ?? "login";

  const navigate = useNavigate();
  const { session, user } = useAuth();

  useEffect(() => {
    if (session || user) {
      if (url.length !== 0) {
        navigate(`/dashboard?create-new-link=${url}`);
      } else {
        navigate("/dashboard");
      }
    }
  }, [session, user]);

  const onTabChange = useCallback(
    (newValue) => {
      const params = new URLSearchParams(searchParams);
      params.set("mode", newValue);
      setSearchParams(params, { replace: true });
    },
    [searchParams]
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-16 sm:mb-20 md:mb-24 lg:mb-28">
        <div className="flex flex-col items-center justify-center px-3 sm:px-0">
          <SquareArrowOutUpRight size={"64"} strokeWidth={"1"} />
          <h1 className="text-3xl sm:text-5xl md:text-6xl text-center mt-3 font-extralight font-sans">
            Welcome Back
          </h1>
          <p className="mt-3 text-center text-sm sm:text-base md:text-lg text-black/30 dark:text-white/50 max-w-3xl">
            Login in to your ShortLink account
          </p>
        </div>
        <div className="mt-11">
          <Tabs
            defaultValue={mode}
            onValueChange={onTabChange}
            className={"w-fit md:w-[35rem] mx-auto"}
          >
            <TabsList className={"w-full grid grid-cols-2"}>
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LogIn />
            </TabsContent>
            <TabsContent value="signin">
              <SignIn />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
