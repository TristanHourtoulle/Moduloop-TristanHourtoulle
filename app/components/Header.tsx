"use client";

import { SessionType } from "@models/Session";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Logo } from "./header/Logo";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { getSession, logout } from "@lib/session";

const Header = () => {
  const navigation = usePathname();
  const [selectedLink, setSelectedLink] = useState("/");
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
      toast.success("Déconnexion réussie");
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
    <div className="flex items-center justify-between h-24 w-full px-4 py-2">
      <Logo />

      {/* Desktop View */}
      <div className="hidden sm:flex">
        <div className="flex items-center gap-7">
          <a
            href="/"
            onClick={() => {
              setSelectedLink("/");
            }}
            className={`nav-link ${
              selectedLink === "/" ? "nav-link-selected" : "link-to-scale"
            }`}
          >
            Accueil
          </a>
          {session && session.user && (
            <a
              href="/pages/projects"
              onClick={() => {
                setSelectedLink("/pages/projects");
              }}
              className={`nav-link ${
                selectedLink === "/pages/projects"
                  ? "nav-link-selected"
                  : "link-to-scale"
              }`}
            >
              Projets
            </a>
          )}
          {isAdmin && (
            <a
              href="/pages/products"
              onClick={() => {
                setSelectedLink("/pages/products");
              }}
              className={`nav-link ${
                selectedLink === "/pages/products"
                  ? "nav-link-selected"
                  : "link-to-scale"
              }`}
            >
              Produits
            </a>
          )}
          {isAdmin && (
            <a
              href="/pages/users"
              onClick={() => {
                setSelectedLink("/pages/users");
              }}
              className={`nav-link ${
                selectedLink === "/pages/users"
                  ? "nav-link-selected"
                  : "link-to-scale"
              }`}
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
              window.location.href = "/";
            }}
          >
            <p className="nav-link">Contact</p>
          </a>

          <a
            href=""
            onClick={() => {
              // setSelectedLink("/pages/users");
              handleLogout();
            }}
            className={`nav-link ${
              selectedLink === "/pages/users"
                ? "nav-link-selected"
                : "link-to-scale"
            }`}
          >
            Déconnexion
          </a>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex grow items-center justify-end sm:hidden mr-3">
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
        <div className="absolute inset-x-0 top-0 transform p-2 transition md:hidden rounded-xl mobile-menu">
          <div className="rounder-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50 mobile-menu">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <Logo />
                <div className="-mr-2">
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
                <nav className="grid gap-y-8">
                  <a href="/" className="">
                    <p className="text">Accueil</p>
                  </a>
                  <a href="/pages/projects" className="">
                    <p className="text">Projets</p>
                  </a>
                  {isAdmin && (
                    <a href="/pages/products" className="">
                      Produits
                    </a>
                  )}
                  {isAdmin && (
                    <a href="/pages/users" className="">
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
                      window.location.href = "/";
                    }}
                  >
                    <p className="">Contact</p>
                  </a>
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
    </div>
  );
};

export default Header;
