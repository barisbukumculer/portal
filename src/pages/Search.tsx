import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { searchProduct } from "../Api";
import { IProducts } from "../models/IProducts";
import ProductItem from "../components/ProductItem";
import load from "../assets/load.gif";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function Search() {
  const { q } = useParams();
  const [proObj, setproObj] = useState<IProducts | null>();

  //infos
  const [skipCount, setSkipCount] = useState(0);
  const [limitCount, setLimitCount] = useState(8);
  const [totalPage, setTotalPage] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const [pageArr, setPageArr] = useState<number[]>([]);

  useEffect(() => {
    gotoData(0);
  }, []);

  const gotoData = (skip: number) => {
    if (q) {
      setIsLoad(true);
      setproObj(null);
      setSkipCount(skip);
      searchProduct(q, limitCount, skip)
        .then((res) => {
          const dt = res.data;
          if (dt) {
            setproObj(dt);
            var pageCount = Math.ceil(dt.total / limitCount);
            const arr = [];
            for (let i = 0; i < pageCount; i++) {
              arr.push(i);
            }
            setPageArr(arr);
          }
        })
        .finally(() => {
          setIsLoad(false);
        });
    }
  };
  return (
    <>
     <Helmet>
    <meta charSet="utf-8"name="description" content={"Search "+ q}  />
    <title>Search: {q}</title>
  </Helmet>
      <Header />
      <h2>Search Results: {q}</h2>
    {isLoad===true &&
      <div className="text-center">
        <img
          className="img-fluid"
          style={{ maxWidth: 300 }}
          src={load}
          alt=""
        />
      </div>
      }
      <div className="row mt-2">
        {proObj &&
          proObj.products.map((item, index) => 
            <ProductItem item={item} key={index} />
        )}
     
      <nav>
        <ul className="pagination justify-content-end">
          {pageArr.map((item, index) => 
            <li
              key={index}
              className={skipCount === item ? "page-item active" : ""}
            >
              <a
                onClick={() => gotoData(item)}
                className="page-link"
                role="button"
              >
                {(item+1)}
              </a>
            </li>
          )}
        </ul>
      </nav>
      </div>
      
    </>
  );
}

export default Search;
