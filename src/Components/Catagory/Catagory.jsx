import React from "react";
import { catagoryinfo } from "./catagoryinfo"; // Ensure this file exists and has the correct data
import CatagoryCard from "./CatagoryCard";
import style from "./catagory.module.css";

function Catagory() {
  return (
    <section className={style.catagory_container}>
      {catagoryinfo?.map((singleproduct, i) => {
        return <CatagoryCard key={i} data={singleproduct} />;
      })}
    </section>
  );
}

export default Catagory;
