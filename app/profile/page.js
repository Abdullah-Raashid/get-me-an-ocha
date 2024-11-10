"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Profile from "@/components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  if (!session) {
    const router = useRouter();
    router.push("/login");
  }
};

export default ProfilePage;
