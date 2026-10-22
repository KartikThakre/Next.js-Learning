'use client';

//? Reusability: Write UI code once (like a button, navbar, or product card) and use it across multiple pages.
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

const NavLink = ({ href, children }) => {
    //? why we have use Pathname here? because we want to know the current path of the page. so that we can apply active class to the link if the current path is same as the href of the link. so that we can highlight the active link in the navigation bar.
  const path = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>
      {children}
    </Link>
  );
};

export default NavLink;
