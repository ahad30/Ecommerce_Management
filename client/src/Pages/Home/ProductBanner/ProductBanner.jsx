

const ProductBanner = () => {
    return (
        <div className="text-white bg-white grid grid-cols-[1fr_1fr_1fr_1fr] gap-1 md:gap-x-3">
            <div className="md:h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-2s" src="https://i.ibb.co/CvPxGX3/pexels-madebymath-90946-removebg-preview.png" alt="" />
            </div>
            <div className="md:h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-3s" src="https://i.ibb.co/B3tdLmF/pexels-pixabay-51383-removebg-preview.png" alt="" />
            </div>
            <div className="md:h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-4s" src="https://i.ibb.co/4SRymy4/pexels-kinkate-205926-removebg-preview.png" alt="" />
            </div>
            <div className="md:h-36 bg-[#edeeef] flex justify-center items-center">
                <img className="object-cover w-full h-full animate-zoom animate-zoom-5s" src="https://i.ibb.co/cb5X6Wf/pexels-stasknop-1298601-removebg-preview.png" alt="" />
            </div>
        </div>
    );
};

export default ProductBanner;
