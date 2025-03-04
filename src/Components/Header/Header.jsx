import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";

function Header() {
  return (
    <>
      <div className={style.header_container}>
        <div className={style.logo_container}>
          <Link to="/">
            <img src="/amazon_logo_white.png" alt="Amazon Logo" />
          </Link>
          <div className={style.delivery}>
            <span>
              <SlLocationPin size={15} />
            </span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={style.search}>
          <select name="category" id="category">
            <option value="">ALL</option>
            <option value="computer">Computer</option>
            <option value="book">Book</option>
            <option value="electronics">Electronics</option>
          </select>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Amazon"
          />
          <BsSearch size={30} /> {/* Increased size for wider icon */}
        </div>

        <div className={style.order_container}>
          <Link href="/" className={style.language}>
            <div className={style.lang2}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="US Flag"
              />
              <select name="language" id="language">
                <option value="en">EN</option>
                <option value="am">አማ</option>
              </select>
            </div>
          </Link>
          <Link to="">
            <div>
              <p>Hello, sign in</p>
              <span>Account & Lists</span>
            </div>
          </Link>
          <Link to="/Orders" className={style.returns}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/Cart" className={style.cart}>
            <BiCart size={35} />
            <span>0</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </>
  );
}

export default Header;
