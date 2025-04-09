"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  // const { data: session } = useSession();
  const session = useSession();

  return (
    <header className="w-full bg-black shadow-md top-0 px-3 py-6 fixed z-50 ">
      <nav className="max-w-7xl flex justify-between items-center mx-auto">
        <h1>Hello I am Pratyush</h1>

        {!session.data?.user && (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
        {session.data?.user && (
          <Button onClick={() => signOut()}>Sign OUt</Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
