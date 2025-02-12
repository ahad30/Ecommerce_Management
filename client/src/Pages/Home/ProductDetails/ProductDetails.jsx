import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ProductImageSlider from "./ProductImageSlider";
import { FaGreaterThan, FaHome } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../../redux/Hook/Hook";
import { addToCart } from "../../../redux/Cart/cartSlice";
import { toast } from "sonner";
import { Alert } from "antd";

const ProductDetails = () => {
  const singleProduct = useLoaderData();
  const dispatch = useAppDispatch();
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(singleProduct?.variants[0]?.price || 0);
  const [isAdded, setIsAdded] = useState(false);
  const cartItems = useAppSelector((state) => state.cart?.items);
  const selectedVariant = singleProduct.variants.find((variant) =>
    Object.keys(selectedAttributes).every(
      (key) => variant.attributes[key] === selectedAttributes[key]
    )
  );
  // console.log(singleProduct)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const isProductInCart = cartItems.some(
      (item) =>
        item.id === singleProduct.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(selectedAttributes)
    );
    setIsAdded(isProductInCart);
  }, [cartItems, singleProduct.id, selectedAttributes]); // Added selectedAttributes as a dependency

  // Function to group attribute values by key across all variants
  const groupAttributesByKey = () => {
    const attributeMap = {};
    singleProduct.variants.forEach((variant) => {
      Object.keys(variant.attributes).forEach((key) => {
        if (!attributeMap[key]) {
          attributeMap[key] = new Set(); // Use a Set to avoid duplicate values
        }
        attributeMap[key].add(variant.attributes[key]);
      });
    });

    return attributeMap;
  };

  // Function to handle attribute selection
  const handleAttributeSelection = (key, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [key]: value }));
    updatePriceBasedOnAttributes({ ...selectedAttributes, [key]: value });
  };

  // Function to update price based on selected attributes
  const updatePriceBasedOnAttributes = (attributes) => {
    const selectedVariant = singleProduct.variants.find((variant) =>
      Object.keys(attributes).every(
        (key) => variant.attributes[key] === attributes[key]
      )
    );
    if (selectedVariant) {
      setPrice(selectedVariant.price);
    }
  };

  // Function to render attributes dynamically
  const renderAttributes = () => {
    const attributeMap = groupAttributesByKey();

    return Object.keys(attributeMap).map((key) => {
      const values = Array.from(attributeMap[key]); // Convert Set to Array

      return (
        <div key={key} className="mt-4">
          <span className="font-medium capitalize">{key}:</span>
          <div className="flex gap-2 mt-2">
            {values.map((value, index) => (
              <button
                key={index}
                onClick={() => handleAttributeSelection(key, value)}
                className={`border border-gray-300 px-4 py-2 rounded hover:border-blue-500 
                  ${
                    selectedAttributes[key] === value
                      ? " border-2 border-blue-500 shadow-md"
                      : "hover:bg-gray-100"
                  }`}
                style={{
                  backgroundColor:
                    key === "color" ? value.toLowerCase() : "transparent",
                  borderWidth:
                    selectedAttributes[key] === value ? "5px" : "1px",
                  color: selectedAttributes[key] === value ? "blueviolet" : "",
                  borderColor: selectedAttributes[key] === value ? "blue" : "",
                }}
              >
                {key !== "color" && value}
              </button>
            ))}
          </div>
        </div>
      );
    });
  };

  // Function to handle quantity change
  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Function to handle adding to cart
  const handleAddToCart = () => {
    if (
      Object.keys(selectedAttributes).length !==
      Object.keys(groupAttributesByKey()).length
    ) {
      toast.error("Please select all attributes before adding to cart!");
      return;
    }

    // Find the selected variant based on attributes
    const selectedVariant = singleProduct.variants.find((variant) =>
      Object.keys(selectedAttributes).every(
        (key) => variant.attributes[key] === selectedAttributes[key]
      )
    );

    // console.log("Selected Variant:", selectedVariant);

    if (!selectedVariant) {
      toast.error("Invalid selection! No matching variant found.");
      return;
    }

    const existingItem = cartItems.find(
      (item) =>
        item.id === singleProduct.id &&
        item.variantId === selectedVariant.id &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(selectedAttributes)
    );

    if (existingItem) {
      toast.error("Product already added to cart!");
      return;
    }

    const item = {
      ...singleProduct,
      variantId: selectedVariant.id,
      selectedAttributes,
      quantity,
      price: selectedVariant.price.toFixed(2),
      priceTiers: selectedVariant.priceTiers || [],
    };

    dispatch(addToCart(item));
    toast.success("Added to cart successfully!");
  };

  // const handleAddToCart = () => {
  //   // Find the selected variant based on attributes
  //   const selectedVariant = singleProduct.variants.find((variant) =>
  //     Object.keys(selectedAttributes).every(
  //       (key) => variant.attributes[key] === selectedAttributes[key]
  //     )
  //   );
  //  console.log(selectedVariant)
  //   if (!selectedVariant) {
  //     toast.error("Please select all attributes before adding to cart!");
  //     return;
  //   }

  //   const existingItem = cartItems.find(
  //     (item) =>
  //       item.id === singleProduct.id &&
  //       item.variantId === selectedVariant.id &&  // Compare variant ID as well
  //       JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
  //   );

  //   if (existingItem) {
  //     toast.error("Product already added to cart!");
  //     return;
  //   }

  //   const item = {
  //     ...singleProduct,
  //     variantId: selectedVariant.id, // Include the selected variant ID
  //     selectedAttributes,
  //     quantity,
  //     price: selectedVariant.price.toFixed(2), // Use the correct variant's price
  //   };

  //   dispatch(addToCart(item));
  //   toast.success("Added to cart successfully!");
  // };

  // Check if all required attributes are selected
  const areAllAttributesSelected = Object.keys(groupAttributesByKey()).every(
    (key) => selectedAttributes[key]
  );

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
        <Link className="text-base font-medium hover:text-gray-300 transition-all duration-200">
          {singleProduct.name}
        </Link>
      </nav>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Slider Section */}
        <div>
          <ProductImageSlider
            images={singleProduct.variants.map(
              (variant) => variant?.imageUrl[0]
            )}
          />
        </div>

        {/* Product Details Section */}
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold">{singleProduct.name}</h1>
          <p className="font-bold">
            Availability:
            <span className="text-green-500 font-medium ms-2">
              {singleProduct.availability === true
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </p>
          <p className="font-medium">
            <span className="font-bold me-2">Category:</span>{" "}
            {singleProduct?.category?.categoryName}
          </p>
          <p className="font-medium">
            <span className="font-bold me-2">Brand:</span>{" "}
            {singleProduct?.brand?.brandName}
          </p>
          <div className="text-xl font-bold text-blue-500">Price: ${price}</div>
          <p className="text-xl text-gray-500">
            {singleProduct?.productSubtitle}
          </p>

          {/* Render Attributes Dynamically */}
          {renderAttributes()}

          {/* Price Tiers */}
<div className="mt-4">
  <span className="font-medium">
    Per Unit Price discount (according to quantity):
  </span>

  {selectedVariant?.priceTiers?.length === 0 ||
  selectedVariant?.priceTiers?.every(
    (tier) => !tier.minQty && !tier.maxQty && !tier.price
  ) ? (
    <p className="text-sm text-red-500">No price tiers available</p>
  ) : (
    <ul className="mt-1 text-sm list-none pl-0 flex gap-4">
      {selectedVariant?.priceTiers?.map((tier, index) => (
        <li className="mb-5" key={index}>
          <Alert
            message={`${tier.minQty ? `${tier.minQty} pc -` : "≥"}  ${
              tier.maxQty || "No Max"
            } pc Price: $${tier.price || "Not available"}`}
          />
        </li>
      ))}
    </ul>
  )}
</div>
          {/* Quantity Selector */}
          <div className="mt-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="px-4 py-2 border"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border py-2"
              />
              <button
                onClick={() => handleQuantityChange("increase")}
                className="px-4 py-2 border"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart and Buy Now */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={!areAllAttributesSelected || isAdded}
              className="bg-blue-500 text-white px-7 py-2 rounded hover:bg-white hover:text-blue-500 transition-all border border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="flex items-center justify-center">
                <CiShoppingCart className="me-2" size={30} />
                {isAdded ? "Added" : "Add to cart"}
              </p>
            </button>
            <Link to={`/checkout`}>
              <button
                onClick={handleAddToCart}
                disabled={!areAllAttributesSelected || isAdded}
                className="border border-gray-300 px-6 py-2 rounded hover:border-blue-500 hover:bg-green-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="flex items-center justify-center">
                  <HiOutlineShoppingBag className="me-2" size={24} />
                  Buy Now
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container break-words mx-auto lg:mt-[50px] mb-16">
        <div className="">
          <ul className="flex justify-center space-x-8 text-2xl font-medium">
            <li className="text-blue-500 border-b-2 border-blue-500">
              Product Description
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          <p className="text-lg text-gray-500">{singleProduct?.description}</p>
          <table className="mt-6 w-[50%] mx-auto border border-gray-300 text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Feature</th>
                <th className="px-4 py-2 border border-gray-300">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Weight</td>
                <td className="px-4 py-2 border border-gray-300">
                  {singleProduct.weight}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Material</td>
                <td className="px-4 py-2 border border-gray-300">
                  {singleProduct.material}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">Thickness</td>
                <td className="px-4 py-2 border border-gray-300">
                  {singleProduct.thickness}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
