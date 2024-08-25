"use client";

import { PROGRAMMING_LANGUAGES } from "@/utils/data";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  files: any;
};

const SearchModal = ({ isOpen, onClose, files }: SearchModalProps) => {
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [visibleFiles, setVisibleFiles] = useState<any[]>([]);
  const router = useRouter();

  function filterFiles(lang: string, text: string) {
    const filteredFiles = files
      .filter(
        (file: any) =>
          file.programmingLanguage.toLowerCase() === lang.toLowerCase()
      )
      .filter((file: any) => file.description.toLowerCase().includes(text));
    setVisibleFiles(filteredFiles);
  }

  function handleLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedLanguage = event.target.value;
    setProgrammingLanguage(selectedLanguage);
    filterFiles(selectedLanguage, searchText);
  }

  function handleSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setSearchText(text);
    filterFiles(programmingLanguage, text);
  }

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <Dialog.Overlay
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-60"
        />
        <div className="rounded-md  px-4 py-8 fixed top-[20%] left-[50%] transform  -translate-x-1/2 min-h-[400px] w-1/2 max-md:w-[90%] bg-white z-10 mb-8">
          <div className="flex  border border-gray-300">
            <select
              className="w-[35%] p-2 rounded focus:outline-none"
              onChange={handleLanguageChange}
            >
              <option>Programming Language</option>
              <option value="cpp">C++</option>
              <option value="css">CSS</option>
              <option value="go">Go</option>
              <option value="html">HTML</option>
              <option value="javascript">Javascript</option>
              <option value="java">Java</option>
              <option value="jsx">JSX</option>
              <option value="kotlin">Kotlin</option>
              <option value="python">Python</option>
              <option value="rust">Rust</option>
              <option value="typescript">Typescript</option>
              <option value="tsx">TSX</option>
            </select>
            <div className="w-[55%]">
              <input
                type="text"
                placeholder="Search..."
                className="focus:outline-none p-2 w-full"
                onChange={handleSearchTextChange}
              />
            </div>
            <div className="w-[10%] flex items-center">
              <IoIosSearch size={28} className="cursor-pointer ms-auto me-2" />
            </div>
          </div>
          <div className="border border-gray-300 mt-4 h-[300px] overflow-auto">
            {visibleFiles.length === 0 ? (
              <div className="flex flex-col h-full w-full justify-center items-center">
                <p>No related data found...</p>
              </div>
            ) : (
              <div className="px-3 mb-4 w-full text-white mt-4 grid grid-cols-1 gap-4">
                {visibleFiles.map((file: any) => (
                  <div
                    key={file._id}
                    className="bg-[#282A36]  px-6 py-2  rounded-xl leading-none "
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
                              (lang) =>
                                lang.language === file.programmingLanguage
                            )?.image?.src
                          }
                          alt=""
                        />
                        <p>
                          {
                            PROGRAMMING_LANGUAGES.find(
                              (lang) =>
                                lang.language === file.programmingLanguage
                            )?.name
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SearchModal;
