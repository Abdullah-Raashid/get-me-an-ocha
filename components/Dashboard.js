"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  useEffect(() => {
    console.log(session);

    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, []);

  const getData = async () => {
    const u = await fetchuser(session.user.name); // may be null
    if (u) setform(u); // update only if a record exists
    else
      setform({
        // safe defaults prevent crash
        name: "",
        email: session.user.email,
        username: session.user.name, // fall back to GitHub handle
        profilepic: "",
        coverpic: "",
        paypayid: "",
        paypaysecret: "",
      });
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) router.push("/login");
    else {
      getData().finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <p>Loading…</p>;

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await updateProfile(fd, session.user.name);
    toast("Profile Updated", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container mx-auto py-5 px-6 ">
        <h1 className="text-center my-5 text-3xl font-bold">
          Welcome to your Dashboard
        </h1>

        <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              value={form.name ? form.name : ""}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input for email */}
          <div className="my-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              value={form.email ? form.email : ""}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input forusername */}
          <div className="my-2">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              value={form.username ? form.username : ""}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input for profile picture of input type text */}
          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Picture
            </label>
            <input
              value={form.profilepic ? form.profilepic : ""}
              onChange={handleChange}
              type="text"
              name="profilepic"
              id="profilepic"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* input for cover pic  */}
          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cover Picture
            </label>
            <input
              value={form.coverpic ? form.coverpic : ""}
              onChange={handleChange}
              type="text"
              name="coverpic"
              id="coverpic"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input paypay id */}
          <div className="my-2">
            <label
              htmlFor="paypayid"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Paypay Id
            </label>
            <input
              value={form.paypayid ? form.paypayid : ""}
              onChange={handleChange}
              type="text"
              name="paypayid"
              id="paypayid"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* input paypay secret */}
          <div className="my-2">
            <label
              htmlFor="paypaysecret"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Paypay Secret
            </label>
            <input
              value={form.paypaysecret ? form.paypaysecret : ""}
              onChange={handleChange}
              type="text"
              name="paypaysecret"
              id="paypaysecret"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Submit Button  */}
          <div className="my-6">
            <button
              type="submit"
              className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
