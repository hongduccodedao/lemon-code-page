/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import icons from "@/utils/icons";
import { SEO } from "@/components/seo";
import { LayoutMain } from "@/components/layouts";
import { toast } from "react-toastify";
import { paths } from "@/utils/paths";
import Link from "next/link";
import * as apis from "@/apis";

const {
  RiGoogleFill,
  RiGithubFill,
  RiMailFill,
  RiLock2Fill,
  RiEyeOffFill,
  RiEyeFill,
  RiAccountCircleFill,
} = icons;

const register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleLogin = async () => {
    if (!email || !password || !passwordConfirm || !firstName || !lastName) {
      return toast.error("Please fill all the fields");
    }

    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match");
    }

    const response = await apis.apiRegister({
      email,
      password,
      firstName,
      lastName,
    });

    if (response.err === 0) {
      toast.success("Register successfully");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setFirstName("");
      setLastName("");
      window.location.href = paths.LOGIN;
    } else {
      toast.error(response);
    }
  };

  return (
    <>
      <SEO title="Register" description="Register page" />
      <main>
        <LayoutMain>
          <div className="w-full flex items-center justify-center">
            <div className="bg-white inline-block p-5 rounded-lg shadow-md min-w-[600px] mt-10">
              <h1 className="font-semibold mb-5 text-2xl text-center">
                Welcome to Lemon Code
              </h1>
              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-3 justify-center bg-red-500 w-full py-2 rounded-md text-white hover:bg-red-600">
                  <RiGoogleFill className="text-2xl" /> Login with Google
                </button>
                <button className="flex items-center gap-3 justify-center bg-neutral-800 w-full py-2 rounded-md text-white hover:bg-neutral-900">
                  <RiGithubFill className="text-2xl" /> Login with Github
                </button>
              </div>
              <div className="relative after:absolute after:w-full after:h-0.5 after:bg-gray-300 after:top-1/2 after:left-0 after:rounded-md my-5">
                <span className="text-xs bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 whitespace-nowrap z-10 text-gray-500">
                  Or create an account with email
                </span>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-gray-600 text-sm mb-4"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-3">
                      <RiAccountCircleFill className="text-2xl" />
                      <input
                        type="firstName"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full outline-none"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-gray-600 text-sm mb-4"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-3">
                      <RiAccountCircleFill className="text-2xl" />
                      <input
                        type="lastName"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full outline-none"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-600 text-sm mb-4">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-3">
                    <RiMailFill className="text-2xl" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full outline-none"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-gray-600 text-sm mb-4"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-3">
                    <RiLock2Fill className="text-2xl" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="w-full outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="text-gray-500 outline-none focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <RiEyeFill className="text-xl" />
                      ) : (
                        <RiEyeOffFill className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="passwordConfirm"
                    className="text-gray-600 text-sm mb-4"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 gap-3">
                    <RiLock2Fill className="text-2xl" />
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      name="passwordConfirm"
                      id="passwordConfirm"
                      className="w-full outline-none"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      className="text-gray-500 outline-none focus:outline-none"
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                    >
                      {showPasswordConfirm ? (
                        <RiEyeFill className="text-xl" />
                      ) : (
                        <RiEyeOffFill className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  className="bg-green-500 w-full py-2 rounded-md text-white hover:bg-green-600 mt-5"
                  onClick={() => handleLogin()}
                >
                  Register
                </button>

                <div className="relative after:absolute after:w-full after:h-0.5 after:bg-gray-300 after:top-1/2 after:left-0 after:rounded-md my-5">
                  <span className="text-xs bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 whitespace-nowrap z-10 text-gray-500">
                    Already have an account?{" "}
                    <Link
                      href={paths.LOGIN}
                      className="hover:text-green-500 hover:underline"
                    >
                      Login now
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </LayoutMain>
      </main>
    </>
  );
};

export default register;
