import { Link, useLoaderData, useParams } from "react-router-dom";
import ProductImageSlider from "./ProductImageSlider";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { FaGreaterThan, FaHome } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const ProductDetails = () => {
  const allProduct = useLoaderData();
  const { id } = useParams();
  const singleProduct = allProduct.find((product) => product.id === id);
  console.log(singleProduct);
  return (
    <section className="py-5">
      <nav className="flex justify-start space-x-3 py-8 px-5">
        <Link
          to="/"
          className="text-lg font-medium hover:text-gray-300 transition-all duration-200"
        >
          <FaHome className="text-blue-500" size={20} />
        </Link>
        <span className="text-lg text-gray-300 mt-1">
          <FaGreaterThan size={15} />
        </span>
        <Link
          to="/shop"
          className="text-base font-medium hover:text-gray-300 transition-all duration-200 text-blue-500"
        >
          Shop
        </Link>
        <span className="text-lg text-gray-300 mt-1">
          <FaGreaterThan size={15} />
        </span>
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
          <ProductImageSlider
            images={singleProduct.variants.map((variant) => variant.imageUrl)}
          />
        </div>

        {/* Product Details Section */}
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold">{singleProduct.name}</h1>
          {/* <p className="text-sm text-gray-500">{singleProduct.description}</p> */}
          <p className="font-bold">
            Availability :
            <span className="text-green-500 font-medium ms-2">
            {/* {singleProduct.variants.reduce(
              (totalStock, variant) => totalStock + variant.stock,
              0
            )} */}
            {singleProduct.availability === true ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          {/* <p className="font-medium">SKU: {singleProduct.variants[0].sku}</p> */}
          <p className="font-medium">
            <span className="font-bold me-2">Category : </span> T Shirt
          </p>
          <p className="font-medium">
            <span className="font-bold me-2">Brand : </span> Raymond
          </p>
          <div className="text-xl font-bold text-blue-500">
            Price: ${singleProduct.price}
          </div>
          <p className="text-xl text-gray-500">"Elegance Redefined: The Perfect Blend of Style and Comfort"</p>

          {/* Size Selector */}
          <div className="mt-4">
            <span className="font-medium">Size:</span>
            <div className="flex gap-2 mt-2">
              {singleProduct.variants.map((variant) => (
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
              {singleProduct.variants.map((variant) => (
                <button
                  key={variant.id}
                  className="w-8 h-8 border border-gray-300 rounded-full"
                  style={{
                    backgroundColor: variant.attributes.color.toLowerCase(),
                  }}
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
          {/* Add to Cart and Wishlist */}
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-7 py-2 rounded hover:bg-white hover:text-blue-500 transition-all border border-blue-500">
            <p className="flex items-center justify-center">
                   <CiShoppingCart className="me-2" size={30}/>
                   Add to Cart
                   </p>
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded hover:border-blue-500 hover:bg-green-500 hover:text-white transition-all">
            <p className="flex items-center justify-center">
                   <HiOutlineShoppingBag className="me-2" size={24}/>
                   Buy Now
                   </p>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto lg:-mt-[120px] mb-16">
        <div className="">
          <ul className="flex justify-center space-x-8 text-2xl font-medium">
            <li className="text-blue-500 border-b-2 border-blue-500">
              Product Description
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est nec
            condimentum lorem lacus. Lectus libero in vulputate quis massa nisl
            risus, libero ut. Morbi praesent ipsum sed morbi turpis sed. Amet
            sed fames fermentum, augue dignissim. Montes, velit velit eu gravida
            nibh in feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Est nec condimentum lorem lacus. Lectus libero in vulputate
            quis massa nisl risus, libero ut. Morbi praesent ipsum sed morbi
            turpis sed. Amet sed fames fermentum, augue dignissim. Montes, velit
            velit eu gravida nibh in feugiat.
          </p>
          <table className="mt-6 w-[50%] mx-auto border border-gray-300 text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Feature</th>
                <th className="px-4 py-2 border border-gray-300">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Color</td>
                <td className="px-4 py-2 border border-gray-300">
                  Black, Brown, Red
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Material</td>
                <td className="px-4 py-2 border border-gray-300">
                  Artificial Leather
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Weight</td>
                <td className="px-4 py-2 border border-gray-300">0.5kg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
