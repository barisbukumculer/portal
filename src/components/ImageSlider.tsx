import React from "react";
import SimpleImageSlider from "react-simple-image-slider";

//import images
import img1 from "../assets/1.jpeg"
import img2 from "../assets/2.jpeg"
import img3 from "../assets/3.jpeg"
import img4 from "../assets/4.jpeg"
import img5 from "../assets/5.webp"
import img6 from "../assets/6.jpeg"

function SliderImage() {
   const sliderImages = [
      {
         url:img1
      },
      {
         url:img2
      },
      {
         url:img3
      },
      {
         url:img4
      },
      {
         url:img5
      },
      {
         url:img6
      },
   ];
   return (
      <div>
         <h6>
            {" "}
         </h6>
         <SimpleImageSlider 
            width={1300}
            height={300}
            images={sliderImages}
            showNavs={true}
            showBullets={true}
         />
      </div>
   );
}

export default SliderImage