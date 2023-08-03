/* eslint-disable react-hooks/rules-of-hooks */
import { Editor } from "@/components/edtior";
import { Logo } from "@/components/logo";
import { SEO } from "@/components/seo";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { paths } from "@/utils/paths";

const create = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.user);

  const [selectedImage, setSelectedImage] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [title, setTitle] = useState("");

  const [tags, setTags] = useState([]);

  const displayImage = (e) => {
    const fileInput = e.target;
    const image = fileInput.files[0];
    if (
      image.type !== "image/png" &&
      image.type !== "image/jpg" &&
      image.type !== "image/jpeg"
    ) {
      return toast.error("Image format is not supported");
    }
    if (image.size > 1024 * 1024 * 5) {
      return toast.error("Image size is too large");
    }
    setFileImage(image);
    const selectedImage = URL.createObjectURL(image);

    setSelectedImage(selectedImage);
    setIsImageUploaded(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsImageUploaded(false);
  };

  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  const handlePublic = async () => {
    const content = editorValue;

    if (!title) {
      return toast.error("Please enter title");
    }
    if (!content) {
      return toast.error("Please enter content");
    }

    const data = {
      title,
      content,
      tags,
    };

    if (isImageUploaded) {
      data.image = fileImage;
    }

    let accessToken = null;
    let localStorageData = localStorage.getItem("persist:lemon/user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      accessToken = JSON.parse(localStorageData.token);
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/post`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (res.data.err === 0) {
      toast.success("Post created successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <SEO title="Create" description="Create a new post" />
      <main>
        <div className="p-5 border border-gray-300 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <Logo />
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-10">
          {!isLogged ? (
            <div>
              <span className="">
                Please{" "}
                <Link href={paths.LOGIN} className="text-green-500">
                  Login
                </Link>{" "}
                to create a post.
              </span>
            </div>
          ) : (
            <>
              <div className="bg-white p-10 rounded-xl shadow-md">
                <div className="flex items-center gap-10">
                  {isImageUploaded && (
                    <div className="relative max-w-[500px]">
                      <Image
                        src={selectedImage}
                        alt="Selected Image"
                        layout="responsive"
                        width={100}
                        height={100}
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-block px-4 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
                    >
                      {isImageUploaded ? "Change Image" : "Add a cover image"}
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={displayImage}
                    />
                    {isImageUploaded && (
                      <button
                        className="inline-block px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  className="my-4 w-full outline-none text-6xl placeholder:text-gray-600 font-bold"
                  placeholder="New post title here..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="tags"
                  placeHolder="Add tags..."
                  className="w-full my-2"
                />
                <small className="py-2">
                  <span className="text-gray-400">Note:</span> Press{" "}
                  <span className="font-bold">Enter</span> to add a tag
                </small>
                <Editor value={editorValue} onChange={handleEditorChange} />
                <button
                  className="cursor-pointer inline-block px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-300 ease-in-out mt-5"
                  onClick={handlePublic}
                >
                  Public
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default create;
