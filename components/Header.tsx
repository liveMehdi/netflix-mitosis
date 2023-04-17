import { HiSearch, HiBell } from "react-icons/hi";
import { BellIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

/////////////////////////////////////////////////////////////////////

function Header() {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //////////////////////////////////////////////////////////////////////

  function focusSearch() {
    const checkbox = document.getElementById(
      "searchbar"
    ) as HTMLInputElement;
    checkbox.checked = true;
    checkbox.focus()
  }

  //////////////////////////////////////////////////////////////////////
  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex item-center space-x-4 text-sm font-light">
        <div className="searchFirstButton" onClick={() => focusSearch()}>
          <HiSearch className="hidden sm:inline h-6 w-6 searchIcon" />
          <input id="searchbar" type="text" className="searchbar" />
        </div>
        <p className="hidden lg:inline">Kids</p>
        <HiBell className="h-6 w-6" />
        <Link href="/login">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
            onClick={() => logout()}
          />
        </Link>
      </div>
    </header>
  );
}
////////////////////////////////////////////////////////////////////////

export default Header;
