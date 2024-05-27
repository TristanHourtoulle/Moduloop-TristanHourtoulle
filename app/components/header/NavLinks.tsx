import React from "react";
import Link from "next/link";

export const NavLinks = () => {
  return (
    <div className="hidden sm:flex items-center justify-center gap-7">
      <Link href="/">
        <p className="nav-link link-to-scale">Accueil</p>
      </Link>
      <Link href="/pages/projects">
        <p className="nav-link link-to-scale">Projets</p>
      </Link>
      <Link href="/products">
        <p className="nav-link link-to-scale">Produits</p>
      </Link>
      <Link href="/users">
        <p className="nav-link link-to-scale">Users</p>
      </Link>
      <Link
        href="https://www.moduloop.com/contact/"
        onClick={(e) => {
          e.preventDefault();
          const newWindow = window.open(
            "https://www.moduloop.com/contact/",
            "_blank"
          );
          if (newWindow) newWindow.opener = null; // Pour empêcher le nouvel onglet d'avoir une référence à l'onglet actuel
          window.location.href = "/";
        }}
      >
        <p className="nav-link nav-link-to-scale">Contact</p>
      </Link>
    </div>
  );
};
