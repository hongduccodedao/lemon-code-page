import React from "react";
import icons from "@/utils/icons";
import { SEO } from "@/components/seo";
import { LayoutMain } from "@/components/layouts";
import { toast } from "react-toastify";

const {
  RiGoogleFill,
  RiGithubFill,
  RiMailFill,
  RiLock2Fill,
  RiEyeOffFill,
  RiEyeFill,
} = icons;

const login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    if (!email || !password) {
      return toast.error("Please fill all the fields");
    }
    toast.success("Login success");
  };

  return (
    <>
      <SEO title="Login" description="Login page" />
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
                  Have a password? Continue with your email address
                </span>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <div>
                  <label htmlFor="email" className="text-gray-600 text-sm mb-4">
                    Email address <span className="text-red-500">*</span>
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
                      id="email"
                      className="w-full outline-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="border border-gray-300 rounded-md px-3 py-2"
                      />
                      <label
                        htmlFor="remember"
                        className="text-gray-600 text-sm"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-red-500 text-sm">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    className="bg-green-500 w-full py-2 rounded-md text-white hover:bg-green-600 mt-5"
                    onClick={() => handleLogin()}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </LayoutMain>
      </main>
    </>
  );
};

export default login;
