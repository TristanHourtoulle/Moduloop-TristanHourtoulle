"use client";

import { SessionType } from "@models/Session";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Logo } from "./header/Logo";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { getSession, logout } from "@lib/session";
import { LoginButton } from "./header/LoginButton";
import { LogoIcon } from "./header/LogoIcon";

const Header = () => {
  const navigation = usePathname();
  const [selectedLink, setSelectedLink] = useState("/pages/projects");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<SessionType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [actualPage, setActualPage] = useState(navigation);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Erreur lors de la déconnexion");
    } finally {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSession();
        const data = response;
        if (!data) {
          console.error("Error fetching session:", data);
          return;
        }
        setSession(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    const getLink = () => {
      if (actualPage.includes("projects")) {
        setSelectedLink("/pages/projects");
      } else if (actualPage.includes("products")) {
        setSelectedLink("/pages/products");
      } else if (actualPage.includes("users")) {
        setSelectedLink("/pages/users");
      } else if (actualPage.includes("methodology")) {
        setSelectedLink("/pages/methodology");
      } else {
        setSelectedLink("/");
      }
    };

    fetchSession();
    getLink();
  }, []);

  useEffect(() => {
    if (session && session.user && session.user.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  return session ? (
    <div className="flex items-center justify-between h-24 w-full py-2">
      <Logo />

      {/* Desktop View */}
      <div className="hidden lg:flex lg:justify-between w-full">
        <div className="flex items-center justify-center w-full gap-7">
          <Link
            href="/"
            onClick={() => {
              setSelectedLink("/");
            }}
            className={`outfit-regular text-md tertiary-color relative transition-all hover:text-[#30c1bd] ${
              selectedLink === "/"
                ? "after:content-[''] after:absolute after:left-0 after:mx-auto after:bottom-[-4px] after:w-[75%] after:border-b-3 after:border-[#30c1bd] after:rounded-full"
                : ""
            }`}
          >
            Accueil
          </Link>
          {session && session.user && (
            <Link
              href="/pages/projects"
              onClick={() => {
                setSelectedLink("/pages/projects");
              }}
              className={`outfit-regular text-md tertiary-color relative transition-all hover:text-[#30c1bd] ${
                selectedLink === "/pages/projects"
                  ? "after:content-[''] after:absolute after:left-0 after:mx-auto after:bottom-[-4px] after:w-[75%] after:border-b-3 after:border-[#30c1bd] after:rounded-full"
                  : ""
              }`}
            >
              Projets
            </Link>
          )}
          {session && session.user && (
            <Link
              href="/pages/methodology"
              onClick={() => {
                setSelectedLink("/pages/methodology");
              }}
              className={`outfit-regular text-md tertiary-color relative transition-all hover:text-[#30c1bd] ${
                selectedLink === "/pages/methodology"
                  ? "after:content-[''] after:absolute after:left-0 after:mx-auto after:bottom-[-4px] after:w-[75%] after:border-b-3 after:border-[#30c1bd] after:rounded-full"
                  : ""
              }`}
            >
              Méthodologie
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/pages/products"
              onClick={() => {
                setSelectedLink("/pages/products");
              }}
              className={`outfit-regular text-md tertiary-color relative transition-all hover:text-[#30c1bd] ${
                selectedLink === "/pages/products"
                  ? "after:content-[''] after:absolute after:left-0 after:mx-auto after:bottom-[-4px] after:w-[75%] after:border-b-3 after:border-[#30c1bd] after:rounded-full"
                  : ""
              }`}
            >
              Produits
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/pages/users"
              onClick={() => {
                setSelectedLink("/pages/users");
              }}
              className={`outfit-regular text-md tertiary-color relative transition-all hover:text-[#30c1bd] ${
                selectedLink === "/pages/users"
                  ? "after:content-[''] after:absolute after:left-0 after:mx-auto after:bottom-[-4px] after:w-[75%] after:border-b-3 after:border-[#30c1bd] after:rounded-full"
                  : ""
              }`}
            >
              Utilisateurs
            </Link>
          )}

          <Link
            href="https://www.moduloop.com/contact/"
            onClick={(e) => {
              e.preventDefault();
              const newWindow = window.open(
                "https://www.moduloop.com/contact/",
                "_blank"
              );
              if (newWindow) newWindow.opener = null;
            }}
            className={`outfit-regular text-md tertiary-color relative transition-all hover:text-[#30c1bd]`}
          >
            Contact
          </Link>

          <Link
            href="/"
            onClick={() => {
              handleLogout();
            }}
            className={`outfit-regular text-md tertiary-color relative transition-all hover:text-[#30c1bd]`}
          >
            Déconnexion
          </Link>
        </div>

        <Link
          href="/pages/projects/create"
          className="text-md rounded-full outfit-regular px-[2%] bg-secondary shadow-lg text-white py-3 flex items-center justify-center hover:bg-opacity-90 transition-all w-full lg:max-w-[200px]"
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Simule l'ombre du thème
          }}
        >
          Créer mon projet
        </Link>
      </div>

      {/* Mobile View */}
      <div className="flex grow items-center justify-end lg:hidden">
        <button
          className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400
            hover:bg-gray-100 hover/text-gray-500 focus:outline-none focus:ring-inset focus:ring-indigo-500"
          onClick={handleMenuClick}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {isMenuOpen && <div className="fixed inset-0 bg-black opacity-30" />}
      {isMenuOpen && (
        <div className="absolute z-50 items-center justify-center inset-x-0 top-0 transform p-2 transition-all lg:hidden rounded-xl mobile-menu w-full">
          <div className="rounder-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50 mobile-menu">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <LogoIcon />
                <div className="">
                  <button
                    className="inline-flex items-center justify-center rounded-md bg-white p-2
                      text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset
                      focus:ring-indigo-500"
                    onClick={handleMenuClick}
                  >
                    <span className="sr-only">Fermer</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6 ml-3">
                <nav className="grid gap-y-6">
                  <a href="/" className="">
                    <p className="text-lg outfit-regular tertiary-color">
                      Accueil
                    </p>
                  </a>
                  <a href="/pages/projects" className="">
                    <p className="text-lg outfit-regular tertiary-color">
                      Projets
                    </p>
                  </a>
                  <a href="/pages/methodology" className="">
                    <p className="text-lg outfit-regular tertiary-color">
                      Méthodologie
                    </p>
                  </a>
                  {isAdmin && (
                    <a
                      href="/pages/products"
                      className="text-lg outfit-regular tertiary-color"
                    >
                      Produits
                    </a>
                  )}
                  {isAdmin && (
                    <a
                      href="/pages/users"
                      className="text-lg outfit-regular tertiary-color"
                    >
                      Utilisateurs
                    </a>
                  )}
                  <a
                    href="https://www.moduloop.com/contact/"
                    onClick={(e) => {
                      e.preventDefault();
                      const newWindow = window.open(
                        "https://www.moduloop.com/contact/",
                        "_blank"
                      );
                      if (newWindow) newWindow.opener = null;
                    }}
                  >
                    <p className="text-lg outfit-regular tertiary-color">
                      Contact
                    </p>
                  </a>
                  <a
                    href=""
                    onClick={() => {
                      // setSelectedLink("/pages/users");
                      handleLogout();
                    }}
                    className="text-lg outfit-regular tertiary-color"
                  >
                    Déconnexion
                  </a>
                  <Link
                    href="/pages/projects/create"
                    className="text-md rounded-full outfit-regular px-[2%] bg-secondary shadow-lg text-white py-3 flex items-center justify-center hover:bg-opacity-90 transition-all w-full lg:max-w-[200px]"
                    style={{
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Simule l'ombre du thème
                    }}
                  >
                    Créer mon projet
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center justify-between h-24 w-full px-7 py-2">
      <Logo />
      <LoginButton />
    </div>
  );
};

export default Header;
