import Nav from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

export default async function page() {
  return (
    <>
      <Nav />
      <main className=" text-white w-[90%] mx-auto max-md:w-[98%] p-6 flex justify-center items-center pt-28 pb-40">
        <div className="lg:w-1/2"></div>
        <div className="lg:w-1/2 flex flex-col justify-center gap-3">
          <h2 className="text-4xl hero-heading">
            Store, Share, Inspire: Your Code Hub
          </h2>
          <p className="lg:text-base text-sm hero-subheading">
            Unlock the Power of Sharing Code!{" "}
            <span className="italic">CodeBin</span> is your dynamic hub to
            store, showcase, and collaborate on code snippets. Effortlessly save
            your code, generate instant shareable links, and immerse yourself in
            a creative coding community. Spark inspiration, foster
            collaboration, and unleash your coding prowess, all in one stylish,
            intuitive platform.
          </p>
          <button className="btn w-40 text-center scale hero-btn">
            <Link href="/new/file">Go to Editor</Link>
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
