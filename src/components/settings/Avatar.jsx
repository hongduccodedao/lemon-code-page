import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/axios";
import { toast } from "react-toastify";
import { getCurrent } from "@/store/user/asyncActions";

const Avatar = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [fileImage, setFileImage] = React.useState(null);
  const [avatar, setAvatar] = React.useState(current?.avatar);
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
  return (
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
  );
};

export default Avatar;
