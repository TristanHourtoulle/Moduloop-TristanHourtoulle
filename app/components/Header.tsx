"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { Logo } from "./header/Logo";

const Header = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("data get: ", data)
      setSession(data.session);
    };

    fetchSession();
  }, []);

  return (
    session ? (
      <div className="container flex items-center justify-between h-24">
          <Logo />
      </div>
    ) : (
      <div>Not connected</div>
    )
  );
};

export default Header;