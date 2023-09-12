import React, { useEffect, useState } from "react";
import { getAllProducts } from "../Api";
import { IProducts } from "../models/IProducts";
import ProductItem from "../components/ProductItem";
import SliderImages from "../components/ImageSlider";
import Header from "../components/Header";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <meta name="description" content="Portal E-Commerce Site" charSet="utf-8" />
        <title>Portal E-Commerce</title>
      </Helmet>
      <Header />
      <div className="slider-container" style={{ position: "relative" }}>
        <SliderImages />
      </div>
      <div className="row mt-2">
        {proObj &&
          proObj.products.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
      </div>
    </>
  );
}

export default Home;
