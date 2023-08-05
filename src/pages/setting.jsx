import React from "react";
import { SEO } from "@/components/seo";
import { LayoutMain } from "@/components/layouts";
import { useSelector } from "react-redux";
import Image from "next/image";

const Setting = () => {
  const { current } = useSelector((state) => state.user);

  const [avatar, setAvatar] = React.useState(current?.avatar);
  const [firstName, setFirstName] = React.useState(current?.firstName);
  const [lastName, setLastName] = React.useState(current?.lastName);
  const [isAvatarChanged, setIsAvatarChanged] = React.useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setIsAvatarChanged(true);
      setAvatar(imageUrl);
    }
  };

  return (
    <>
      <SEO title="Setting" />
      <main>
        <LayoutMain>
          <div className="max-w-[1200px] mx-auto my-10 flex gap-10">
            <div className="flex flex-col gap-5">
              <div className="relative w-[250px] h-[250px]">
                <Image
                  src={avatar}
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
                <button className="bg-green-100 p-2 rounded-md cursor-pointer text-sm border border-green-400 inline-block">
                  Save
                </button>
              </div>
            </div>
          </div>
        </LayoutMain>
      </main>
    </>
  );
};

export default Setting;
