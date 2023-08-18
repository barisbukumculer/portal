import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../Api";
import { Product } from "../models/IProducts";
import Navbar from "../components/Navbar";
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import StarRatings from "react-star-ratings";

function Detail() {
  const [item, setItem] = useState<Product>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const idNum = Number(id);
    if (Number.isNaN(idNum) || idNum < 1) {
      console.log("değer numerik degil");
      navigate("/");
    } else {
      //servis ziyaretinde bulun
      getSingleProduct(idNum)
        .then((res) => {
          //işlem başarılı, datalar geldi.
          const dt = res.data;
          setItem(dt);
          console.log(dt);
        })
        .catch((err) => {
          //işlem başarısız
          alert("Servis Hatası Oluştu");
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="row">
        {item && (
          <>
            <div className="mb-2 col-sx-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <h4 >    {item.title}</h4>
              <h5> Kategori: {item.category}</h5>
              <h5> Stok adedi: {item.stock}</h5>
              <h5> Marka: {item.brand}</h5>
              <h5> Fiyat: {item.price}$</h5>
              <StarRatings starRatedColor="gold" starEmptyColor="gray" starDimension="25" rating={item.rating}/>
            </div>
            <div className="mb-2 col-sx-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
       
             <Gallery
                 items={item.images.map((image) => ({
                  original: image,
                  thumbnail: image,
                  originalHeight: 300,
                  originalWidth:300,
                  
                }))}
                showFullscreenButton={true}
                showPlayButton={true}
                showNav={true}
                
             
             ></Gallery>
         </div>
             
          </>
        )}
      </div>
    </>
  );
}

export default Detail;
