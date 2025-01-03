import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Image } from "antd";

export default function ProductImageSlider({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section>
      {/* Ant Design Preview Group for all images */}
      <Image.PreviewGroup>
        {/* Main Slider */}
        <Swiper
          style={{
            "--swiper-navigation-color": "#000",
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-full h-auto object-cover"
                preview={{
                  src: image, // Include in Ant Design preview
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Slider */}
        <div className="mt-4 hidden lg:block">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="w-full mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Image.PreviewGroup>
    </section>
  );
}
