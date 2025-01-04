
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/banner/JRkXIMV6dmHE4HkMsHYnbFQDgwpn3lCWWDRwGiy4 1.png"
import img2 from "../../../assets/banner/Rectangle 4516.png"
import img3 from "../../../assets/banner/canva-black-and-white-simple-pro 1.png"
const BannerSlider = () => {
    return (
        <div className=''>
            <div>
                <Carousel
                    autoPlay
                    interval={3000}
                    infiniteLoop
                >
                    <div>
                        <img src={img1} />
                    </div>
                    <div>
                        <img src={img1} />
                    </div>
                    <div>
                        <img src={img1}/>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default BannerSlider;