import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import * as Yup from "yup";
import { useAuth } from "@/context/authContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const { logIn, authError, authLoading } = useAuth();
  const [authData, setAuthData] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate({ email, password }, { abortEarly: false });
      const res = await logIn(email.trim(), password);
      setAuthData(res);
    } catch (er) {
      const newErrors = {};

      er?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setError(newErrors);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
          {!authData?.success && authError && (
            <p className="text-sm text-red-500">{authError}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="email">Email address</Label>
            <InputGroup>
              <InputGroupInput
                id="email"
                name="email"
                type={"email"}
                disabled={authLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder={"Enter you email"}
              />
              <InputGroupAddon>
                <InputGroupText>
                  <Mail strokeWidth={1} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {error.email && (
              <p className="text-sm text-red-500">{error.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="password">Password</Label>
            <InputGroup>
              <InputGroupInput
                id="password"
                name="password"
                type={"password"}
                disabled={authLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder={"Enter you password"}
              />
              <InputGroupAddon>
                <InputGroupText>
                  <Lock strokeWidth={1} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {error.password && (
              <p className="text-sm text-red-500">{error.password}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LogIn;
