"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeSwitch from "@/components/ThemeSwitch";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-white border-b dark:bg-black'>
      <div className='text-xl font-bold'>AI Quiz</div>
      <div className='flex items-center gap-4'>
        <ThemeSwitch />

        <Link href='/'>
          <Button
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              pathname === "/"
                ? "bg-primary text-white dark:text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Home
          </Button>
        </Link>

        <Link href='/about'>
          <Button
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              pathname === "/about"
                ? "bg-primary text-white dark:text-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            About
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
