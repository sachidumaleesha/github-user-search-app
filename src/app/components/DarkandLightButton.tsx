"use client";
import { useTheme } from "next-themes";
import React from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

type Props = {};

export default function DarkandLightButton({}: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleDark(){
    if(resolvedTheme == 'light') setTheme("dark")
    if(resolvedTheme == 'dark') setTheme("light")
  }

  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm">{resolvedTheme === "light" ? "DARK" : "LIGHT"}</p>

      <button onClick={toggleDark} className="text-2xl">
        {resolvedTheme === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
      </button>
    </div>
  );
}
