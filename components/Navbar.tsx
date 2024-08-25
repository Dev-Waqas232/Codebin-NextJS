"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AvatarList from "./AvatarList";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 70;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  const styles = {
    navbar: {
      backgroundColor: isScrolled ? "#fff" : "transparent", // Example changes
      boxShadow: isScrolled ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none",
      color: isScrolled ? "black" : "white",
    },
  };
  return (
    <header
      style={styles.navbar}
      className="text-white sticky inset-x-0  top-0 z-50 transition-colors"
    >
      <nav
        className="flex items-center justify-between w-[90%] max-md:w-[98%] mx-auto p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <Link
            href="/"
            className={`${
              isScrolled ? "text-bgPrimary" : "text-white"
            }  text-2xl font-extrabold`}
          >
            CodeBin
          </Link>
        </div>

        <div className="nav-links items-center ">
          <Link
            href="/new/file"
            className={` font-semibold leading-6 ${
              isScrolled ? "text-bgPrimary " : "text-white "
            }`}
          >
            Go To Editor
          </Link>
        </div>
        <div>
          {!session ? (
            <Link
              href="/auth/login"
              className={`${isScrolled ? "btn-primary " : "btn"} w-28 scale`}
            >
              Login
            </Link>
          ) : (
            <>
              <AvatarList>
                {session?.user?.image
                  ? session?.user.image
                  : session?.user?.name?.charAt(0)}
              </AvatarList>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
