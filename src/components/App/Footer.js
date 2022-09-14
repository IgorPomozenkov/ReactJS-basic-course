import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="appFooter">
      <p>&copy; {currentYear} All Rights Reserved</p>
    </footer>
  );
};
