"use client";
import Menu from "@/components/Menu";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function page({ params }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<any>();
  const { data: session }: { data: any } = useSession();
  const [isStarred, setIsStarred] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/api/document/${params.id}`);
        console.log(response);
        setFile(response.data.data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("Document doesn't exists");
          return;
        }
        toast.error("Couldn't Fetch Document.Try again later");
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  // Checking if current user has already starred file or not
  let checkStar: any;

  useEffect(() => {
    if (file && session) {
      checkStar = file.starUsers.find((user: any) => user === session.user.id);
      if (checkStar) {
        setIsStarred(true);
      } else {
        setIsStarred(false);
      }
    }
  }, [file]);

  function handleBtnClick() {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }

  async function handleStarFile() {
    // Starring File

    if (!session) {
      toast.warning("Please login to add to favourites");
      return;
    }

    if (session.user.id === file.user) {
      toast.warning("Can't add your own file to favorites");
      return;
    }

    try {
      const response = await axios.post(`/api/document/${params.id}/starred`, {
        userId: session.user.id,
      });

      if (response.data.ok) {
        toast.success(response.data.message);
        setFile(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't add to favorites");
    }
  }

  function copyCode() {
    navigator.clipboard
      .writeText(file.value)
      .then(() => {
        toast.success("Copied code to clipboard");
      })
      .catch((err) => {
        toast.error("Error in copying link");
      });
  }

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="pt-8">
          <button
            onClick={handleBtnClick}
            className="ms-8  btn btn-outline w-28 text-white"
          >
            <IoMdArrowBack className="mr-3" /> Go Back
          </button>
          <div className="wrapper">
            <pre>
              <code id="code-display">
                <SyntaxHighlighter
                  showLineNumbers
                  style={dracula}
                  language={file.programmingLanguage}
                >
                  {file.value}
                </SyntaxHighlighter>
              </code>
            </pre>
          </div>
        </div>
      )}
      <Menu
        mode="file"
        onSave={() => {}}
        onStar={handleStarFile}
        isStarred={isStarred}
        onCopy={copyCode}
      />
    </>
  );
}
