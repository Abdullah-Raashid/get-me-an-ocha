import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white flex justify-between items-center px-4 h-15">
      <div className="logo font-bold text-lg flex justify-center items-center">
        <img src="\tea.gif" width={22} alt="" />
        <span>GetMeAnOcha!</span>
      </div>

      <ul className="flex justify-between gap-4">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign up</li>
        <li>Login</li>
      </ul>

      {/* <div>
        <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          Login
        </button> 
      </div>*/}
    </nav>
  );
};

export default Navbar;
