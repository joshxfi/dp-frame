"use client";

import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import frame from "../../public/frame.png";

export default function Home() {
  const [profilePic, setProfilePic] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const handleProfilePicChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setProfilePic(dataUrl);
    };

    reader.readAsDataURL(file);
  };

  const saveImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toast.promise(
      toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 3,
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "gravitate-dp.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        }),
      { loading: "Saving...", success: "Saved!", error: "Error!" }
    );
  }, [ref]);

  return (
    <main className="flex items-center flex-col justify-center min-h-screen">
      <div className="flex space-x-4 mb-12">
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
      </div>

      <div ref={ref} className="relative overflow-hidden h-[500px] w-[500px]">
        <Image
          priority
          quality={100}
          src={frame}
          placeholder="blur"
          height={500}
          width={500}
          className="object-contain absolute pointer-events-none z-10"
          alt="Profile Picture"
        />

        {profilePic && (
          <Draggable>
            <Resizable>
              <Image
                quality={100}
                src={profilePic}
                height={500}
                width={500}
                className="object-contain"
                alt="Profile Picture"
                draggable={false}
              />
            </Resizable>
          </Draggable>
        )}
      </div>

      <button
        onClick={saveImage}
        className="bg-blue-600 rounded px-5 py-2 mt-12"
      >
        Save Image
      </button>
    </main>
  );
}
