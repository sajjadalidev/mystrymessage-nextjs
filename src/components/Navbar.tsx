"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4">
      <div className="text-white text-lg font-bold">
        <Link href="/">MystryMessage</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-white hover:text-gray-300">
            About
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/profile" className="text-white hover:text-gray-300">
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/api/auth/signout"
                className="text-white hover:text-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  signOut({ callbackUrl: "/sign-in" });
                }}
              >
                Sign Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/sign-in" className="text-white hover:text-gray-300">
                Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
