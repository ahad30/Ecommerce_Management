import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useGetSlidersQuery } from "../../../redux/Feature/Admin/slider/sliderApi";
import { Spin } from "antd";


const BannerSlider = () => {
  const { data, error, isLoading: sliderIsLoading } = useGetSlidersQuery();

  // If data is loading or there's an error, show a loading message or error message
  if (sliderIsLoading) {
    return <div> <Spin size="large"/></div>;
  }

  if (error) {
    return <div>Error loading sliders: {error.message}</div>;
  }

  // Ensure data?.data is an array before mapping
  const sliders = data?.data || [];

  // Format the sliders data for react-image-gallery
  const galleryImages = sliders.map((slider) => ({
    original: slider.imageUrl,
    thumbnail: slider.imageUrl, // Optional: Add thumbnails if needed
    originalAlt: slider.title || "Banner",
    thumbnailAlt: slider.title || "Banner Thumbnail",
  }));

  return (
    <div className="">
      <ImageGallery
        items={galleryImages}
        autoPlay={true}
        slideInterval={5000}
        showThumbnails={false} // Hide thumbnails if not needed
        showFullscreenButton={true} // Hide fullscreen button
        showPlayButton={false} // Hide play/pause button
        showNav={true} // Show navigation arrows
        infinite={true} // Enable infinite loop
        lazyLoad={true} // Enable lazy loading for images
      />
    </div>
  );
};

export default BannerSlider;