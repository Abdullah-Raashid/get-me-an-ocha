import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-purple-950 text-white flex items-center justify-center px-4 h-15">
      <p className="text-center">
        Copyright &copy; {currentYear} Get me an ocha - All rights reserved!
      </p>
    </footer>
  );
};

export default Footer;
