"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { FaStar } from "react-icons/fa";
import { PROGRAMMING_LANGUAGES } from "@/utils/data";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const StarredFilesPage = () => {
  const [files, setFiles] = useState<any>([]);
  const [error, setError] = useState("");
  const {
    data: session,
    status,
  }: { data: any; status: "authenticated" | "loading" | "unauthenticated" } =
    useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchStarredFiles = async () => {
      if (status !== "loading") {
        setError("");
        try {
          const response = await axios.get(
            `/api/document/user/${session.user.id}/starred`
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

    fetchStarredFiles();
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

  const handleDeleteFile = async (id: string) => {
    try {
      const response = await axios.post(`/api/document/${id}/starred`, {
        userId: session.user.id,
      });
      console.log(response);
      if (response.data.ok) {
        setFiles((prev: any) => prev.filter((file: any) => file._id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn't Delete File");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold mt-8">Starred Files</h2>
      {files.length === 0 && (
        <p className="text-xl text-center">You haven't starred any file yet.</p>
      )}
      <div className="w-full mt-4 grid md:grid-cols-2 grid-cols-1 gap-4">
        {files.map((file: any) => (
          <div
            key={file._id}
            className="bg-[#282A36]  px-6 py-3 rounded-xl leading-none "
          >
            <h2 className="flex justify-between">
              <span
                onClick={() => router.push(`/new/file/${file._id}`)}
                className="italic cursor-pointer capitalize"
              >
                {file.description}
              </span>
              <span className="flex gap-1">
                <FaStar
                  className="cursor-pointer"
                  onClick={() => handleDeleteFile(file._id)}
                />
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

      {files.length > 4 && (
        <div className="w-full flex justify-center items-center mt-4">
          <button
            className="btn w-32 scale"
            onClick={() => router.push("/dashboard/saved-files")}
          >
            View All
          </button>
        </div>
      )}
    </>
  );
};

export default StarredFilesPage;
