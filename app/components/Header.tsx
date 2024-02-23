"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";

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
      <div>Connected</div>
    ) : (
      <div>Not connected</div>
    )
  );
};

export default Header;