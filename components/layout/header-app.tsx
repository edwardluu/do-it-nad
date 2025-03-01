"use client";

import Image from "next/image";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

function Header() {
  return (
    <header className="w-full container h-16 border-2 flex justify-around items-center mt-4 px-6 rounded-4xl border-[#b18597]">
      <Link href="/" className="w-full h-full flex items-center">
        <Image src="/logo.gif" alt="logo" width={52} height={52} />
      </Link>
      <Link
        href="/leader-board"
        className="lg:flex hidden w-full text-3xl font-bold text-[#b18597] uppercase items-end gap-4"
      >
        <Image
          src="/leader-board.png"
          width={50}
          height={50}
          unoptimized
          alt="rank"
        />
        <span>LeaderBoard</span>
      </Link>
      <ConnectKitButton theme="retro" />
    </header>
  );
}

export default Header;
