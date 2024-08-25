import React from "react";

function Footer() {
  const getYear = new Date().getFullYear();

  return (
    <footer className="text-bgPrimary font-semibold bg-white body-font">
      <div>
        <div className="container mx-auto py-4 px-5">
          <p className="text-center text-sm">
            © {getYear} Codebin —
            <a
              href="https://twitter.com/Waqas_Munir232"
              rel="noopener noreferrer"
              className="ml-1"
              target="_blank"
            >
              @Waqas_Munir232
            </a>
            &nbsp; All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
