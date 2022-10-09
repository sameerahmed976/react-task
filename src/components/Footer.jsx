import React from "react";

const Footer = ({ items }) => {
  return (
    <footer className="footer">
      <p className="count">
        {items.length}
        {items.length === 1 ? "  item" : "   items"}
      </p>

      <p>copyright © {new Date().getFullYear()}. All rights reversed. </p>
    </footer>
  );
};

export default Footer;
