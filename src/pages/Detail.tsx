import React, { Component, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCart, get4RandomProducts, getSingleProduct } from "../Api";
import { IProducts, Product } from "../models/IProducts";
import Navbar from "../components/Navbar";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import { getCustomer } from "../util";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { Animate } from "react-simple-animate";

function Detail() {
  const [item, setItem] = useState<Product>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState<any[]>();
  const [isload, setIsload] = useState(false)

  useEffect(() => {
    const idNum = Number(id);
    if (Number.isNaN(idNum) || idNum < 1) {
      console.log("değer numerik degil");
      navigate("/");
    } else {
      //servis ziyaretinde bulun
      toast(" Yükleniyor!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getSingleProduct(idNum)
        .then((res) => {
          //işlem başarılı, datalar geldi.
          const dt = res.data;
          setItem(dt);
          // console.log(dt);
          const arr = [];
          for (let i = 0; i < dt.images.length; i++) {
            const item = dt.images[i];
            const image = {
              original: item,
              thumbnail: item,
            };
            arr.push(image);
          }
          setImages(arr);
          toast.dismiss();
          setTimeout(()=>{
            setIsload(true)
          },300);
          
        })
        .catch((err) => {
          //işlem başarısız
          toast.dismiss();
          toast.error("Servis Hatası");
          setIsload(false)
        })
        .finally(() => {});
    }
  }, []);
  const [proObj, setProObj] = useState<IProducts>();
  useEffect(() => {
    const skip = Math.floor(Math.random() * 96);
    get4RandomProducts(4, skip).then((res) => {
      const dt = res.data;
      setProObj(dt);
    });
  }, []);

  const addBasket = () => {
    const customer = getCustomer();
    if (customer === null) {
      navigate("/login");
    } else {
      addCart(customer!.id, item!.id)
        .then((res) => {
          const dt = res.data;
          if (dt) {
            toast.success("Add Basket Success");
          }
        })
        .catch((err) => {
          toast.error("Add Basket Fail");
        });
    }
  };

  return (
    <>
      <div className="mb-3">
        {" "}
        <Header />
      </div>
      <Helmet>
        <meta charSet="utf-8" name="description" content={item?.description} />
        <title>{item?.title}</title>
      </Helmet>
      <div className="row">
        {item && (
          <>
            <div className="mb-2 col-sx-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <Animate
                play={isload}
                start={{
                  transform: "translateX(40px)",
                  opacity: 0,
                  filter: "blur(5px)",
                }}
                end={{
                  transform: "translateX(0px)",
                  opacity: 1,
                  filter: "blur(0px)",
                }}
              >
                <h2>{item.title}</h2>
              </Animate>

              <div className="card">
                <div className="card-body">{item.description}</div>
              </div>
              <span
                className="badge text-bg-success fs-6 p-2 mb-2 mt-2"
                style={{ marginRight: "1rem" }}
              >
                {item.price}$
              </span>
              <span
                className="badge text-bg-light fs-6 p-2 "
                style={{ marginRight: "1rem" }}
              >
                -%{item.discountPercentage}
              </span>
              <span
                className="badge text-bg-light fs-6 p-2 "
                style={{ marginRight: "1rem" }}
              >
                Stok: {item.stock}
              </span>
              <span
                className="badge text-bg-light fs-6 p-2 "
                style={{ marginRight: "1rem" }}
              >
                {item.category}
              </span>
              <span className="float-end mb-2 mt-2">
                <StarRatings
                  starRatedColor="gold"
                  starEmptyColor="gray"
                  starDimension="25"
                  rating={item.rating}
                />
              </span>
              <div>
                <button onClick={addBasket} className="btn btn-primary">
                  <i className="bi bi-cart-plus"></i> Add Basket
                </button>
              </div>
            </div>

            <div className="mb-2 col-sx-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              {images && (
                <Gallery
                  items={item.images.map((image) => ({
                    original: image,
                    thumbnail: image,
                  }))}
                  showFullscreenButton={true}
                  showPlayButton={true}
                  showNav={true}
                  autoPlay={true}
                  useBrowserFullscreen={false}
                ></Gallery>
              )}
            </div>
          </>
        )}
      </div>

      <h3>Sizin için Seçtiklerimiz</h3>
      <hr></hr>
      <div className="row mt-2">
        {proObj &&
          proObj.products.map((item, index) => (
            <ProductItem item={item} key={index} />
          ))}
      </div>
    </>
  );
}

export default Detail;
