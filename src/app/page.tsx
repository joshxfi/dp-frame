"use client";

import Image from "next/image";
import { useState, useCallback, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from "react-draggable";
import { toPng } from "html-to-image";
import toast from "react-hot-toast";
import frame from "../../public/frame.png";

export default function Home() {
  const [profilePic, setProfilePic] = useState("");
  const [frameOpacity, setFrameOpacity] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <main className="flex items-center flex-col justify-center min-h-screen bg-black text-white">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleProfilePicChange}
        className="hidden"
      />

      <div className="overflow-hidden rounded-2xl">
        <div
          ref={ref}
          className="relative overflow-hidden md:h-[500px] md:w-[500px] h-[350px] w-[350px]"
        >
          <div style={{ opacity: frameOpacity }} className="z-50 relative">
            <Image
              priority
              quality={100}
              src={frame}
              placeholder="blur"
              height={500}
              width={500}
              className="object-contain absolute pointer-events-none z-50"
              alt="DP Frame"
            />
          </div>

          {profilePic && (
            <Draggable
              onStart={() => setFrameOpacity(0.8)}
              onStop={() => setFrameOpacity(1)}
            >
              <div>
                <TransformWrapper>
                  <TransformComponent>
                    <Image
                      quality={100}
                      src={profilePic}
                      height={500}
                      width={500}
                      className="object-contain scale-50"
                      alt="Profile Picture"
                      draggable={false}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </Draggable>
          )}
        </div>
      </div>

      <div className="mt-12 space-x-3 text-sm md:text-base">
        <button
          onClick={() => inputRef.current?.click()}
          className="bg-slate-800 px-5 py-2 rounded"
        >
          Upload Photo
        </button>

        <button
          disabled={!profilePic}
          onClick={saveImage}
          className="bg-purple-600 rounded px-5 py-2 disabled:bg-purple-600/50 disabled:cursor-not-allowed"
        >
          Save Image
        </button>
      </div>
      <p className="text-purple-200 absolute bottom-5 text-xs md:text-sm">
        MIT Licensed.{" "}
        <a
          href="https://github.com/joshxfi/dp-frame"
          target="_blank"
          rel="noreferrer noopener"
          className=" underline"
        >
          View Source Code
        </a>
      </p>
    </main>
  );
}
