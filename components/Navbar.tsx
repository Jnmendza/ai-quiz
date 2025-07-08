"use client";
import React from "react";
import ThemeSwitch from "@/components/ThemeSwitch";

import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-black'>
      <div className='text-xl font-bold'>AI Quiz</div>
      <div className='flex items-center gap-4'>
        <ThemeSwitch />

        <Button className='px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors dark:text-black'>
          Home
        </Button>
        <Button className='px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors'>
          About
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
