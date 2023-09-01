import React, { useEffect, useState } from "react";
import { getAllProducts } from "../Api";
import { IProducts } from "../models/IProducts";
import ProductItem from "../components/ProductItem";
import Navbar from "../components/Navbar";
import SliderImages from "../components/ImageSlider";
import { relative } from "path";
import Header from "../components/Header";

function Home() {
  const [proObj, setProObj] = useState<IProducts>();

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        //işlem başarılı, datalar geldi.
        const dt = res.data;
        setProObj(dt);
      })
      .catch((err) => {
        //işlem başarısız
        alert("Servis Hatası Oluştu");
      });
  }, []);

  return (
    <>
    <Header/>
   <div className="slider-container" style={{position:'relative'}} >
    <SliderImages/>
    </div>   
    <div className="row mt-2"  >
      {proObj &&
        proObj.products.map((item, index) => (
         <ProductItem item={item} index={index} key={index}/>
        ))}
        </div>
    </>
  );
}

export default Home;

