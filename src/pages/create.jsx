import { Logo } from "@/components/logo";
import { SEO } from "@/components/seo";
import Image from "next/image";
import { useState } from "react";

const create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const displayImage = (e) => {
    const fileInput = e.target;
    const image = fileInput.files[0];
    const selectedImage = URL.createObjectURL(image);

    setSelectedImage(selectedImage);
    setIsImageUploaded(true);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setIsImageUploaded(false);
  };

  const handleUpFile = (e) => {
    console.log(e.target.files[0]);
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
          </div>
        </div>
      </main>
    </>
  );
};

export default create;
