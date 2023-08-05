import React from "react";
import { SEO } from "@/components/seo";
import { LayoutMain } from "@/components/layouts";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/utils/paths";
import axios from "@/axios";
import { toast } from "react-toastify";
import { getCurrent } from "@/store/user/asyncActions";
import * as apis from "@/apis";

const Setting = () => {
  const dispatch = useDispatch();
  const { current, isLogged } = useSelector((state) => state.user);
  const [fileImage, setFileImage] = React.useState(null);
  const [avatar, setAvatar] = React.useState(current?.avatar);
  const [firstName, setFirstName] = React.useState(current?.firstName);
  const [lastName, setLastName] = React.useState(current?.lastName);
  const [isAvatarChanged, setIsAvatarChanged] = React.useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIsAvatarChanged(true);
      setAvatar(imageUrl);
    }
  };

  const handleSaveAvatar = async () => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      {
        avatar: fileImage,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.err === 0) {
      toast.success("Update avatar successfully");
      setIsAvatarChanged(false);
      dispatch(getCurrent());
    } else {
      toast.error("Update avatar failed");
    }
  };

  const handleSaveInfo = async () => {
    const response = await apis.apiUpdateInfo({
      firstName,
      lastName,
    });

    if (response.err === 0) {
      toast.success("Update information successfully");
      dispatch(getCurrent());
    } else {
      toast.error("Update information failed");
    }
  };

  return (
    <>
      <SEO title="Setting" />
      <main>
        <LayoutMain>
          <div className="max-w-[1200px] mx-auto my-10 flex gap-10">
            {!isLogged ? (
              <span className="text-center text-2xl">
                You need to login to access this page. Please{" "}
                <Link
                  href={paths.LOGIN}
                  clasName="text-green-500 hover:underline"
                >
                  login
                </Link>{" "}
                first.
              </span>
            ) : (
              <>
                <div className="flex flex-col gap-5">
                  <div className="relative w-[250px] h-[250px]">
                    <Image
                      src={avatar}
                      alt="avatar"
                      layout="fill"
                      className="rounded-full object-cover border-4 border-gray-100 shadow-lg"
                    />
                  </div>
                  <div className="text-center">
                    {isAvatarChanged ? (
                      <button
                        type="button"
                        className="bg-red-100 p-2 rounded-md cursor-pointer text-sm border border-red-400"
                        onClick={() => {
                          setAvatar(current?.avatar);
                          setIsAvatarChanged(false);
                        }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <>
                        <div>
                          <label
                            htmlFor="avatar"
                            className="bg-green-100 p-2 rounded-md cursor-pointer text-sm border border-green-400"
                          >
                            Edit Avatar
                          </label>
                          <input
                            type="file"
                            id="avatar"
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarChange}
                          />
                        </div>
                      </>
                    )}
                    {isAvatarChanged && (
                      <button
                        type="button"
                        className="bg-green-100 p-2 rounded-md cursor-pointer text-sm border border-green-400 ml-2"
                        onClick={() => handleSaveAvatar()}
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex-1 w-full bg-white p-5 rounded-lg">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-400"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-green-400"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <button
                      className="bg-green-100 p-2 rounded-md cursor-pointer text-sm border border-green-400 inline-block"
                      onClick={() => handleSaveInfo()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </LayoutMain>
      </main>
    </>
  );
};

export default Setting;
