
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
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
                        <img src="https://i.ibb.co/Zhjv213/JRk-XIMV6dm-HE4-Hk-Ms-HYnb-FQDgwpn3l-CWWDRw-Giy4-1.png" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/Zhjv213/JRk-XIMV6dm-HE4-Hk-Ms-HYnb-FQDgwpn3l-CWWDRw-Giy4-1.png" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/Zhjv213/JRk-XIMV6dm-HE4-Hk-Ms-HYnb-FQDgwpn3l-CWWDRw-Giy4-1.png" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default BannerSlider;