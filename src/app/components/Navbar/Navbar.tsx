"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleLinkClick = () => {
    setIsChecked(false);
  };
  const pathname = usePathname();

  return (
    <>
      <div className="bg-[#ecdce4] text-gray-800 px-4 py-2 flex justify-between items-center fixed top-0 z-40 w-full shadow-[0_0px_35px_-15px_rgba(255,255,255,0.3)]">
        <Link href="/" className="">
          Ziba mujer
        </Link>

        <input
          type="checkbox"
          id="menu"
          className="peer menu md:hidden"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />

        <nav className="bg-[#ecdce4] mx-0 fixed z-40 bg-opacity-95 text-gray-800 inset-0 translate-y-14 w-0 overflow-hidden md:static md:translate-y-0 md:bg-transparent peer-checked:w-[100%] transition-height ease-in-out duration-300 md:w-auto ">
          {pathname.includes("/crud") ? (
            <ul className=" flex flex-col cursor-pointer md:flex-row ">
              <Link
                href="/crud/agregar-producto"
                className="px-2 py-1 border-t-2 border-gray-700 hover:bg-[#ddc2cf] text-lg md:border-none md:hover:bg-transparent md:hover:opacity-40 hover:text-gray-700"
                onClick={handleLinkClick}
              >
                Agregar Producto
              </Link>

              <Link
                href="/crud/productos"
                className="px-2 py-1 border-t-2 border-gray-700 hover:bg-[#ddc2cf] text-lg md:border-none md:hover:bg-transparent md:hover:opacity-40 hover:text-gray-700"
                onClick={handleLinkClick}
              >
                Ver mis productos
              </Link>
            </ul>
          ) : (
            <ul className=" flex flex-col cursor-pointer md:flex-row ">
              <Link
                href="/"
                className="px-2 py-1 border-t-2 border-gray-700 hover:bg-[#ddc2cf] text-lg md:border-none md:hover:bg-transparent md:hover:opacity-40 hover:text-gray-700"
                onClick={handleLinkClick}
              >
                Inicio
              </Link>

              <Link
                href="/tasks"
                className="px-2 py-1 border-t-2 border-gray-700 hover:bg-[#ddc2cf] text-lg md:border-none md:hover:bg-transparent md:hover:opacity-40 hover:text-gray-700"
                onClick={handleLinkClick}
              >
                Carteras
              </Link>

              <Link
                href="/contactanos"
                className="px-2 py-1 border-t-2 border-b-2 border-gray-700 hover:bg-[#ddc2cf] text-lg md:border-none md:hover:bg-transparent md:hover:opacity-40 hover:text-gray-700"
                onClick={handleLinkClick}
              >
                Contactanos
              </Link>
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
