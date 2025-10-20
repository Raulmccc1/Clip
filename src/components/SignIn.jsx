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
import { Lock, Mail, Upload, User } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";
import * as Yup from "yup";
import { useAuth } from "@/context/authContext";

const MAX_FILE_SIZE = 7 * 1024 * 1024;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profile_pic, setProfile_pic] = useState(null);
  const [error, setError] = useState([]);

  const { signUp, authError, authLoading } = useAuth();

  const [authData, setAuthData] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Full Name is required."),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed()
          .required("A profile picture is required")
          .test(
            "fileSize",
            `File size too large. Max size is ${
              MAX_FILE_SIZE / (1024 * 1024)
            } MB`,
            (value) => {
              if (value instanceof File) {
                return value.size <= MAX_FILE_SIZE;
              }
              return true;
            }
          ),
      });

      await schema.validate(
        { name, email, password, profile_pic },
        { abortEarly: false }
      );
      const res = await signUp(
        name.trim(),
        email.trim(),
        password,
        profile_pic
      );
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
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to register.
          </CardDescription>
          {!authData?.success && authError && (
            <p className="text-sm text-red-500">{authError}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="name">name</Label>
            <InputGroup>
              <InputGroupInput
                id="name"
                name="name"
                type={"text"}
                value={name}
                disabled={authLoading}
                onChange={(e) => setName(e.target.value)}
                autoComplete="current-password"
                placeholder={"Enter tour name"}
              />
              <InputGroupAddon>
                <InputGroupText>
                  <User strokeWidth={1} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {error.name && <p className="text-sm text-red-500">{error.name}</p>}
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="email">Email address</Label>
            <InputGroup>
              <InputGroupInput
                id="email"
                name="email"
                type={"email"}
                value={email}
                disabled={authLoading}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder={"Enter your email"}
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
                value={password}
                disabled={authLoading}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder={"Enter your password"}
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
          <div className="flex flex-col gap-3 mb-5">
            <Label htmlFor="profile_pic">Profile_pic</Label>
            <InputGroup
              className={`${
                profile_pic && !error.profile_pic
                  ? "border-green-400"
                  : error.profile_pic
                  ? "border-red-500"
                  : ""
              }`}
            >
              <InputGroupInput
                id="profile_pic"
                name="profile_pic"
                type="file"
                disabled={authLoading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setProfile_pic(file);
                }}
                accept="image/*"
                placeholder={"Choose your Profile picture"}
              />
              <InputGroupAddon>
                <InputGroupText>
                  <Upload strokeWidth={1} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {error.profile_pic && (
              <p className="text-sm text-red-500">{error.profile_pic}</p>
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

export default SignIn;
