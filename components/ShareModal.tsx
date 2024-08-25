"use client";

import { Dialog } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

type ShareModalProps = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};
const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const pathname = usePathname();

  const URL = `https://codebin-jet.vercel.app/${pathname}`;

  const copyToClipBoard = () => {
    navigator.clipboard
      .writeText(URL)
      .then(() => {
        toast.success("Link Copied");
        onClose(false);
      })
      .catch((err) => {
        toast.error("Error in copying link");
      });
  };

  return (
    <div className="">
      <Dialog open={isOpen} onClose={() => onClose(false)}>
        <Dialog.Overlay
          onClick={() => onClose(false)}
          className="fixed inset-0 bg-black opacity-30"
        />
        <div className="rounded-md  px-4  fixed top-1/4 left-[50%] transform  -translate-x-1/2 w-1/3 py-4 max-md:w-[75%] max-lg:w-1/2 bg-white z-10">
          <h2 className="font-semibold text-2xl">Copy Link</h2>
          <div className="flex mt-4 mb-4 justify-between rounded-full items-center border-2 border-bgPrimary">
            <input
              className="w-[80%] focus:outline-none  py-3 ps-3 bg-transparent"
              type="text"
              value={URL}
            />
            <button
              onClick={copyToClipBoard}
              className="w-[15%] max-md:w-[20%] flex justify-center items-center bg-bgPrimary rounded-br-full rounded-tr-full py-3"
            >
              <IoCopyOutline size={28} color="white" className="" />
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ShareModal;
