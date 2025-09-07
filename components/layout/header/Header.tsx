"use client";
import Link from "next/link";
import { useState, useEffect } from "react";


const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""

export default function Header({ scroll }: any) {
  const [isSearch, setIsSearch] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const handleSearch = (key: number) => {
    setIsSearch((prevState) => (prevState === key ? null : key));
  };

  // Dark/Light
  const [isDark, setDark] = useState<boolean>(false);
  const handleDark = (): void => {
    setDark(!isDark);
    !isDark ? document.body.classList.add("dark-mode") : document.body.classList.remove("dark-mode");
  };

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
      <header id="header" className="d-lg-block d-none">
        <div className="container">
          <div className="align-items-center w-100">
            <h1 className="logo float-start navbar-brand">
              <Link href="/" className="logo">
                The Ascent of The Millions
              </Link>
            </h1>
            <div className="header-right float-end w-50">
              <div className="d-inline-flex float-end text-end align-items-center">
                <Link href="#" className="dark-light-toggle" onClick={handleDark}>
                  <i className="icon-adjust" />
                </Link>
                <ul className="social-network heading navbar-nav d-lg-flex align-items-center">
                  <li>
                    <Link href="#">
                      <svg
                        style={{
                          width: 10,
                          height: 10,
                          color: "rgba(0, 0, 0, .54)",
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
                <ul className="top-menu heading navbar-nav w-100 d-lg-flex align-items-center">
                  <li>
                    <Link href="/contact" className="btn">
                      Contact
                    </Link>
                  </li>
                </ul>
                {/* <Link className="author-avatar" href="/author">
                  <Image
                    src="/assets/images/author-avata-1.jpg"
                    alt="author"
                    width={50}
                    height={50}
                  />
                </Link> */}
              </div>
              <form action="/search" method="get" className={`search-form d-lg-flex float-end ${isSearch == 1 ? "open-search" : ""}`}>
                <a href="#" className="searh-toggle" onClick={() => handleSearch(1)}>
                  <i className="icon-search" />
                </a>
                <input type="text" className="search_field" placeholder="Search..." name="q" />
              </form>
            </div>
          </div>
          <div className="clearfix" />
        </div>
        <nav id="main-menu" className={`stick d-lg-block d-none ${scroll ? "scroll-to-fixed-fixed top-0 position-fixed w-100" : ""}`}>
          <div className="container">
            <div className="menu-primary">
              <ul className="d-flex justify-content-between">
                <li className="current-menu-item">
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/article">Articles</Link>
                </li>
                <li className="menu-item-has-children">
                  <Link href="#">Categories</Link>
                  <ul className="sub-menu">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link href={`/categories/${category.slug}`}>{category.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li className="menu-item-has-children">
                  <Link href="#">More...</Link>
                </li>
                
              </ul>
              <span />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
