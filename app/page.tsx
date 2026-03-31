"use client";
import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const getServerSession = async () => {
      const session = await getSession();
      if (!session) redirect("/api/auth/signin");
      setSession(session);
    };
    getServerSession();
  }, []);

  return (
    <div className="flex flex-col column items-center align-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
      <p>Hello {session?.user?.name}</p>
      {session?.user?.image && (
        <Image
          src={session?.user?.image}
          width={40}
          height={40}
          alt="profile image"
          className="rounded-full"
        />
      )}
      <p>{session?.user?.email}</p>
      <button
        className="rounded-lg border border-slate-300 hover:border-slate-400 px-2 py-1"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
