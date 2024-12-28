import { Link, useLoaderData, useParams } from "react-router-dom";
import ProductImageSlider from "./ProductImageSlider";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { FaGreaterThan, FaHome } from "react-icons/fa";

const ProductDetails = () => {
  const allProduct = useLoaderData();
  const { id } = useParams();
  const singleProduct = allProduct.find(product => product.id === id);
 console.log(singleProduct)
  return (
    <section className="py-5">
      <nav className="flex justify-start space-x-3 py-8 px-5">
            
              <Link
                to="/"
                className="text-lg font-medium hover:text-gray-300 transition-all duration-200"
              >
                <FaHome className='text-blue-500' size={20}/>
              </Link>
              <span className="text-lg text-gray-300 mt-1"><FaGreaterThan size={15}/></span>
              <Link
                to="/shop"
                className="text-base font-medium hover:text-gray-300 transition-all duration-200 text-blue-500"
              >
                Shop
              </Link>
              <span className="text-lg text-gray-300 mt-1"><FaGreaterThan size={15}/></span>
              <Link
                to="/contact"
                className="text-base font-medium hover:text-gray-300 transition-all duration-200"
              >
               {singleProduct.name}
              </Link>
            </nav>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 ">
        {/* Slider Section */}
        <div>
          <ProductImageSlider images={singleProduct.variants.map(variant => variant.imageUrl)} />
        </div>

        {/* Product Details Section */}
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold">{singleProduct.name}</h1>
          {/* <p className="text-sm text-gray-500">{singleProduct.description}</p> */}
          <p className="text-green-500 font-medium">
            Availability:{" "}
            {singleProduct.variants.reduce((totalStock, variant) => totalStock + variant.stock, 0)}
          </p>
          {/* <p className="font-medium">SKU: {singleProduct.variants[0].sku}</p> */}
          <p className="font-medium"><span className="font-bold">Category : </span>   T Shirt</p>
          <div className="text-xl font-bold text-blue-500">Price: ${singleProduct.price}</div>

          {/* Size Selector */}
          <div className="mt-4">
            <span className="font-medium">Size:</span>
            <div className="flex gap-2 mt-2">
              {singleProduct.variants.map(variant => (
                <button
                  key={variant.id}
                  className="border border-gray-300 px-4 py-2 rounded hover:border-blue-500"
                >
                  {variant.attributes.size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="mt-4">
            <span className="font-medium">Color:</span>
            <div className="flex gap-2 mt-2">
              {singleProduct.variants.map(variant => (
                <button
                  key={variant.id}
                  className="w-8 h-8 border border-gray-300 rounded-full"
                  style={{ backgroundColor: variant.attributes.color.toLowerCase() }}
                ></button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center gap-2 mt-2">
              <button className="px-4 py-2 border">-</button>
              <input
                type="text"
                value={1}
                readOnly
                className="w-12 text-center border py-2"
              />
              <button className="px-4 py-2 border">+</button>
            </div>
          </div>

          {/* Price Tiers */}
          {/* <div className="mt-4">
            <span className="font-medium">Price Tiers:</span>
            <ul className="mt-2 text-sm">
              {singleProduct.variants[0].priceTiers.map((tier, index) => (
                <li key={index}>
                  {tier.minQty ? `Min: ${tier.minQty}` : "Min: 1"} -{" "}
                  {tier.maxQty ? `Max: ${tier.maxQty}` : "No Max"}: ${tier.price}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
