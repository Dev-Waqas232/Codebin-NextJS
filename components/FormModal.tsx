import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { IoIosClose } from "react-icons/io";

type ModalComponentProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSave: (data: {
    description: string;
    programmingLanguage: string;
    tags: string[];
  }) => void;
  isLoading: boolean;
};

const AVAILABLE_LANGUAGES = [
  "python",
  "javascript",
  "jsx",
  "html",
  "css",
  "cpp",
  "java",
  "typescript",
  "tsx",
  "go",
  "rust",
  "sql",
  "kotlin",
];

function ModalComponent({
  isOpen,
  setIsOpen,
  onSave,
  isLoading,
}: ModalComponentProps) {
  const [description, setdescription] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
  };

  const handleSubmit = () => {
    if (description.trim() === "") {
      toast.warning("Please Enter File Description");
      return;
    }
    if (!AVAILABLE_LANGUAGES.includes(programmingLanguage)) {
      toast.warning("Please Specify Programming Language");
      return;
    }

    if (tags.length === 0) {
      toast.warning("At least add 1 tag");
      return;
    }

    onSave({ description, programmingLanguage, tags });
  };
  return (
    <div className="">
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="flex rounded-md justify-center items-center fixed top-12 left-[50%] transform  -translate-x-1/2 w-1/3 py-8 max-md:2/3 max-lg:w-1/2 bg-white z-10">
          <div className="space-y-4 w-[90%] mx-auto">
            <div className="space-y-2">
              <label htmlFor="description" className="block font-semibold">
                File Description:
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                className="border border-gray-300 w-full p-2 rounded focus:outline-bgPrimary"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="programmingLanguage"
                className="block font-semibold"
              >
                Programming Language
              </label>
              <select
                value={programmingLanguage}
                className="border border-gray-300 w-full p-2 rounded focus:outline-bgPrimary"
                onChange={(e) => setProgrammingLanguage(e.target.value)}
              >
                <option selected>Select Programming Language</option>
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
            </div>

            {/* Input for tags */}

            <div>
              <label htmlFor="tags" className="block font-semibold mb-2">
                Add Tags... <small>( Press Enter For Saving tags )</small>
              </label>
              <input
                type="text"
                id="tags"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="border border-gray-300 w-full p-2 rounded focus:outline-bgPrimary"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-full px-5 py-1 flex items-center gap-3"
                  >
                    <span className="mr-2">{tag}</span>
                    <button
                      onClick={() => handleTagDelete(tag)}
                      className="bg-black rounded-full text-gray-200 hover:bg-red-500"
                    >
                      <IoIosClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Input for tags */}

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="btn-primary w-20 p-2 rounded"
              >
                {isLoading ? <Spinner /> : "Save"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 text-black p-2 w-20 rounded-full ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ModalComponent;
