import React, { useEffect, useState } from "react";
import { getAllProducts } from "../Api";
import { IProducts } from "../models/IProducts";
import ProductItem from "../components/ProductItem";
import Navbar from "../components/Navbar";

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
    <Navbar/>
    <div className="row"  >
      {proObj &&
        proObj.products.map((item, index) => (
         <ProductItem item={item} index={index} key={index}/>
        ))}
        </div>
    </>
  );
}

export default Home;

