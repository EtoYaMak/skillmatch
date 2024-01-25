import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer p-10 bg-black text-base-content font-Poppins">
      <h1 className="hiddenHSEO">Skillmint.io Job Portal Footer</h1>
      <h2 className="hiddenHSEO">This is the Footer for Skillmint's website</h2>
      <aside className="w-full flex flex-col justify-center items-center select-none">
        <h1 className=" flex flex-col text-[#fff] bg-transparent w-fit select-none">
          <Link
            to="/"
            className="bg-transparent font-Poppins leading-8 w-full tracking-tighter text-4xl font-extrabold hover:text-[#d0333c] ease-in-out duration-500 "
          >
            SKILL
            <br />
            MINT
          </Link>
        </h1>
        Job Portal since 2023.
      </aside>
      <nav className="hidden">
        <header className="text-[14px] text-white hover:text-[#d0333c]">
          Services
        </header>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Branding
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Design
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Marketing
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Advertisement
        </a>
      </nav>
      <nav className="hidden">
        <header className="text-[14px] text-white hover:text-[#d0333c]">
          Company
        </header>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          About us
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Contact
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Jobs
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Press kit
        </a>
      </nav>
      <nav className="hidden">
        <header className="text-[14px] text-white hover:text-[#d0333c]">
          Legal
        </header>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Terms of use
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Privacy policy
        </a>
        <a className="text-[12px] text-white/70 hover:text-[#d0333c] hover:underline">
          Cookie policy
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
