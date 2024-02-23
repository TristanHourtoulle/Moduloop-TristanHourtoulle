"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Logo } from "./header/Logo";
import { RegisterButton } from "./header/RegisterButton";
import { LoginButton } from "./header/LoginButton";

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Header = () => {
  const [selectedLink, setSelectedLink] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setSession(data.session);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session && session.user && session.user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  return session ? (
    <div className='flex items-center h-24 w-full'>
        <Logo />

        {/* Desktop View */}
        <div className="hidden sm:flex flex-grow justify-center">
          <div className="flex items-center justify-center gap-7 mr-auto ml-auto">
            <Link
              href="/"
              onClick={() => {
                setSelectedLink("/");
              }}
              className={`nav-link ${selectedLink === "/" ? "nav-link-selected" : "link-to-scale"}`}
            >
              Accueil
            </Link>
            <Link
              href="/pages/projects"
              onClick={() => {
                setSelectedLink("/pages/projects");
              }}
              className={`nav-link ${selectedLink === '/pages/projects' ? 'nav-link-selected' : 'link-to-scale'}`}>
              Projets
            </Link>
            {isAdmin && (
              <Link
              href="/pages/products"
              onClick={() => {
                setSelectedLink("/pages/products");
              }}
              className={`nav-link ${selectedLink === '/pages/products' ? 'nav-link-selected' : 'link-to-scale'}`}>
                Produits
              </Link>
            )}
            {isAdmin && (
              <Link
              href="/pages/users"
              onClick={() => {
                setSelectedLink("/pages/users");
              }}
              className={`nav-link ${selectedLink === '/pages/users' ? 'nav-link-selected' : 'link-to-scale'}`}>
                Users
              </Link>
            )}
            <Link
              href="https://www.moduloop.com/contact/"
              className="link-to-scale"
              onClick={(e) => {
                e.preventDefault();
                const newWindow = window.open("https://www.moduloop.com/contact/", "_blank");
                if (newWindow) newWindow.opener = null;
                window.location.href = "/";
              }}
            >
              <p className="nav-link">Contact</p>
            </Link>
          </div>


          {/* Move the div containing the user icon inside the popover panel */}
          <Link href="/" className='nav-user link-to-scale mr-5'>
              <Image
                  src="/icons/utilisateur.svg"
                  alt="profil"
                  width={30}
                  height={30}
                  className='object-contain'
              />
          </Link>

        </div>

        {/* Mobile View */}
        <div className='flex grow items-center justify-end sm:hidden mr-3'>
            <button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
            hover:bg-gray-100 hover/text-gray-500 focus:outline-none focus:ring-inset focus:ring-indigo-500"
            onClick={handleMenuClick}>
            <span className='sr-only'>Ouvrir le menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
        </div>
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black opacity-30"/>
        )}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 transform p-2 transition md:hidden rounded-xl mobile-menu">
            <div className='rounder-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50 mobile-menu'>
                <div className='px-5 pt-5 pb-6'>
                <div className='flex items-center justify-between'>
                    <Logo />
                    <div className='-mr-2'>
                      <button className="inline-flex items-center justify-center rounded-md bg-white p-2
                      text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset
                      focus:ring-indigo-500"
                      onClick={handleMenuClick}>
                        <span className='sr-only'>Fermer</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                </div>
                <div className='mt-6 ml-3'>
                    <nav className='grid gap-y-8'>
                      <Link href="/" className=''><p className="text">Accueil</p></Link>
                      <Link href="/pages/projects" className=''><p className="text">Projets</p></Link>
                      { isAdmin && ( <Link href="/pages/products" className="">
                            Produits
                          </Link>
                      )} { isAdmin && ( <Link href="/pages/users" className="">
                            Users
                      </Link> )}
                      <Link
                        href="https://www.moduloop.com/contact/"
                        onClick={(e) => {
                          e.preventDefault();
                          const newWindow = window.open("https://www.moduloop.com/contact/", "_blank");
                          if (newWindow) newWindow.opener = null;
                          window.location.href = "/";
                        }}
                      >
                        <p className="">Contact</p>
                      </Link>
                    </nav>
                </div>
                <div className='mt-6 flex items-center gap-5 justify-center'>
                    <RegisterButton />
                    <LoginButton />
                </div>
                </div>
            </div>
          </div>
        )}
    </div>
  ) : (
    <div>Not connected</div>
    );
  };

  export default Header;
