"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { FaRegStar } from "react-icons/fa";
import { PROGRAMMING_LANGUAGES } from "@/utils/data";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import SearchModal from "./SearchModal";

const SearchFiles = () => {
  const [files, setFiles] = useState<any>([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: session,
    status,
  }: { data: any; status: "authenticated" | "loading" | "unauthenticated" } =
    useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchNewFiles = async () => {
      if (status !== "loading") {
        setError("");
        try {
          const response = await axios.get(
            `/api/document/user/${session.user.id}/except-user`
          );
          if (response.data.ok) {
            setFiles(response.data.data);
            return;
          }
          setError("Something Went Wrong");
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchNewFiles();
  }, [status]);

  if (status === "unauthenticated" && error) {
    return <div>Something Went Wrong!</div>;
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const visibleFiles = files.slice(0, 4);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Explore New Snippets</h2>
        <IoIosSearch size={28} className="cursor-pointer" onClick={openModal} />
      </div>
      {files.length === 0 && (
        <p className="text-xl text-center">No Data Found</p>
      )}
      <div className="w-full mt-4 grid md:grid-cols-2 grid-cols-1 gap-4">
        {visibleFiles.map((file: any) => (
          <div
            key={file._id}
            className="bg-[#282A36]  px-6 py-3 rounded-xl leading-none "
          >
            <h2 className="flex justify-between">
              <span
                onClick={() => router.push(`/new/file/${file._id}`)}
                className="italic cursor-pointer"
              >
                {file.description}
              </span>
              <span className="flex gap-1">
                <FaRegStar /> {file.starCount}
              </span>
            </h2>
            <div className="flex gap-1 mt-4 items-center justify-between">
              <div className="flex items-center gap-2 ">
                <img
                  className="w-6"
                  src={
                    PROGRAMMING_LANGUAGES.find(
                      (lang) => lang.language === file.programmingLanguage
                    )?.image?.src
                  }
                  alt=""
                />
                <p>
                  {
                    PROGRAMMING_LANGUAGES.find(
                      (lang) => lang.language === file.programmingLanguage
                    )?.name
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SearchModal isOpen={modalOpen} onClose={closeModal} files={files} />
    </>
  );
};

export default SearchFiles;
