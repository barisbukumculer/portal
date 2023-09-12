import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Bilgiler } from "../models/IContent";

function ContentDetail() {
  const { id } = useParams();
const [item, setItem] = useState<Bilgiler>()
  useEffect(() => {
    if (id) {
      const url = "https://jsonbulut.com/json/contentShow.php";
      const sendObj = {
        ref: "1fb75fa2eef1d2cc11c3e21b6fe18613",
        contentId: id,
        random: Math.random
      };
      axios.get(url, { params: sendObj }).then((res) => {
        const dt = res.data;
        if (dt) {
          const bilgiler = dt.contents[0].bilgiler as Bilgiler;
          setItem(bilgiler)
        }
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" name="description" content="content" />
        <title>Title</title>
      </Helmet>
      <Header />
      {item && 
      <>
      <h2>{item.title}</h2>
      <p className="text-danger fs-6">{item.date.toString()}</p>
      <p>{item.summary}</p>
      <div dangerouslySetInnerHTML={{__html: item.details}} ></div>
      </>
      }
    </>
  );
}

export default ContentDetail;
