"use client";

import { IoSaveOutline } from "react-icons/io5";
import { VscNewFile } from "react-icons/vsc";
import { toast } from "react-toastify";
import { IoShareSocialOutline, IoCopyOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

import Icon from "./Icons";
import ShareModal from "./ShareModal";
import { useState } from "react";

export default function Menu({ mode, onSave, onStar, isStarred, onCopy }) {
  const router = useRouter();
  const [openShareModal, setOpenShareModal] = useState(false);

  console.log(isStarred);

  const NEW_FILE_ICONS = [
    { icon: <IoSaveOutline />, text: "Save", onClick: onSave },

    {
      icon: <IoShareSocialOutline />,
      text: "Share",
      onClick: () => {
        toast.info("Please Save the file first!");
      },
    },
    {
      icon: <FaRegStar />,
      text: "Add To Favourites",
      onClick: () => {
        toast.info("Please Save the file first!");
      },
    },
  ];

  const FILE_ICONS = [
    {
      icon: <VscNewFile />,
      text: "New",
      onClick: () => {
        router.push("/new/file");
      },
    },

    {
      icon: <IoCopyOutline />,
      text: "Copy",
      onClick: onCopy,
    },

    {
      icon: <IoShareSocialOutline />,
      text: "Share",
      onClick: () => {
        setOpenShareModal(true);
      },
    },
    {
      icon: isStarred ? <FaStar /> : <FaRegStar />,
      text: isStarred ? "Remove From Favorites" : "Add To Favourites",
      onClick: onStar,
    },
  ];

  let ICONLIST = [];

  if (mode === "new") {
    ICONLIST = NEW_FILE_ICONS;
  }

  if (mode === "file") {
    ICONLIST = FILE_ICONS;
  }

  return (
    <>
      <div className="w-[100%] opacity-30 hover:opacity-100 transition-all fixed bottom-8">
        <nav className="w-[50%] max-sm:w-[75%] m-auto rounded-full bg-white h-12">
          <ul className="flex justify-evenly items-center h-8">
            {ICONLIST.map((icon) => (
              <Icon key={icon.text} text={icon.text} onClick={icon.onClick}>
                {icon.icon}
              </Icon>
            ))}
          </ul>
        </nav>
      </div>
      <ShareModal isOpen={openShareModal} onClose={setOpenShareModal} />
    </>
  );
}
