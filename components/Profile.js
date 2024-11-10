"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [router, session]);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-center text-white my-5 text-3xl font-bold">
        Welcome to your profile
      </h1>

      <form className="max-w-2xl mx-auto">
        <div className="my-2">
          <label>htmlFor="name"</label>
        </div>
      </form>
    </div>
  );
};

export default Profile;
