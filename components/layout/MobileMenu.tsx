"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""


interface MobileMenuProps {
  isMobileMenu: boolean;
  handleMobileMenu: () => void;
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: MobileMenuProps) {
  const [isAccordion, setIsAccordion] = useState<number | null>(null);
  const pathname = usePathname();
  const [categories, setCategories] = useState<any[]>([]);


  // Dark/Light
  const [isDark, setDark] = useState<boolean>(false);
  const handleDark = (): void => {
    setDark(!isDark);
    !isDark ? document.body.classList.add("dark-mode") : document.body.classList.remove("dark-mode");
  };

  const handleAccordion = (key: number) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  useEffect(() => {
    if (isMobileMenu) {
      handleMobileMenu();
    }
  }, [pathname]);

  // get the categories from the api
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${APP_URL}/blog/categories/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/*Mobile navigation*/}
      <div className="sticky-header fixed d-lg-none d-md-block">
        <div className="text-end">
          <div className="container mobile-menu-fixed pe-5">
            <h1 className="logo-small navbar-brand">
              <Link href="/" className="logo">
                M
              </Link>
            </h1>
            {/* <Link href="#" className="author-avatar">
              <Image
                src="/assets/images/author-avata-1.jpg"
                alt="Author avatar"
                width={50}
                height={50}
              />
            </Link> */}
            <Link href="#" className="dark-light-toggle mt-05" onClick={handleDark}>
              <i className="icon-adjust" />
            </Link>
            <ul className="social-network heading navbar-nav d-lg-flex align-items-center">
              <li>
                <Link href="#">
                  <svg
                    style={{
                      width: 10,
                      height: 10,
                      color: "rgba(0, 0, 0, 0.54)",
                      marginTop: "-3px",
                    }}
                    id="fi_5968958"
                    enableBackground="new 0 0 1226.37 1226.37"
                    viewBox="0 0 1226.37 1226.37"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="icon-facebook" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="icon-instagram" />
                </Link>
              </li>
            </ul>
            <Link href="#" className={`menu-toggle-icon ${isMobileMenu ? "act" : ""}`} onClick={handleMobileMenu}>
              <span className="lines" />
            </Link>
          </div>
        </div>
        <div className={`mobi-menu ${isMobileMenu ? "act" : ""}`}>
          <div className="mobi-menu__logo">
            <h1 className="logo navbar-brand">
              <Link href="/" className="logo">
                TAOTM
              </Link>
            </h1>
          </div>
          <form action="#" method="get" className="menu-search-form d-lg-flex">
            <input type="text" className="search_field" placeholder="Search..." defaultValue="" name="s" />
          </form>
          <nav>
            <ul>
              <li className="current-menu-item">
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/article">Articles</Link>
              </li>
              <li className={`menu-item-has-children ${isAccordion == 1 ? "open-submenu" : ""}`}>
                <Link href="#" onClick={() => handleAccordion(1)}>
                  Categories
                </Link>
                <ul className="sub-menu">
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
                <span className="sub-menu-toggle" onClick={() => handleAccordion(1)}></span>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li className="menu-item-has-children">
                <Link href="#">More...</Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
