import React, { useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { useAppSelector, useAppDispatch } from "../../redux/Hook/Hook";
import { removeFromCart, updateQuantity } from "../../redux/Cart/cartSlice";
import { toast } from "sonner";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const Cart = ({ visibleRight, setVisibleRight }) => {
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const cartLength = cartItems.length === 0;

  useEffect(() => {
    if (location.pathname === "/checkout") {
      setVisibleRight(false);
    }
  }, [location, setVisibleRight]);

  // Function to handle item deletion
  const handleDeleteItem = (item) => {
    dispatch(
      removeFromCart({
        id: item.id,
        selectedAttributes: item.selectedAttributes,
      })
    );
    toast.success("Removed from cart successfully");
  };

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ 
      id: item.id, 
      selectedAttributes: item.selectedAttributes, 
      quantity: item.quantity + 1 
    }));
  };
  
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        id: item.id, 
        selectedAttributes: item.selectedAttributes, 
        quantity: item.quantity - 1 
      }));
    }
  };


/**
 * Calculate the price based on quantity and price tiers.
 * @param {number} quantity - The selected quantity.
 * @param {number} basePrice - The default/base price of the product or variant.
 * @param {Array} priceTiers - The price tiers array (e.g., [{ minQty, maxQty, price }]).
 * @returns {number} - The calculated price.
 */
const calculatePrice = (quantity, basePrice, priceTiers) => {
  // If no price tiers are provided, return the base price
  if (!priceTiers || priceTiers.length === 0) {
    return basePrice;
  }

  // Find the applicable price tier
  const applicableTier = priceTiers.find(
    (tier) => quantity >= tier.minQty && quantity <= tier.maxQty
  );

  // If an applicable tier is found, return its price
  if (applicableTier) {
    return parseFloat(applicableTier.price); // Convert price to a number
  }

  // If quantity is >= 100, look for a tier with maxQty >= 100
  if (quantity >= 100) {
    const tierForLargeQuantity = priceTiers.find(
      (tier) => tier.maxQty >= 100
    );

    // If a tier for large quantities exists, return its price
    if (tierForLargeQuantity) {
      return parseFloat(tierForLargeQuantity.price);
    }
  }

  // If no applicable tier is found, return the base price
  return basePrice;
};

  // Calculate total price with discounts
  const totalPrice = cartItems
    .reduce((total, item) => {
      const basePrice = parseFloat(item.price); // Base price of the item
      const priceTiers = item.priceTiers || []; // Price tiers (if available)
      const quantity = item.quantity; // Selected quantity

      // Calculate the price for this item
      const itemPrice = calculatePrice(quantity, basePrice, priceTiers);

      // Add to the total price
      return total + itemPrice * quantity;
    }, 0)
    .toFixed(2);

  // Function to render selected attributes
  const renderSelectedAttributes = (selectedAttributes) => {
    return Object.entries(selectedAttributes).map(([key, value]) => (
      <div key={key} className="text-xs text-gray-600">
        <span className="capitalize">{key}:</span> {value}
      </div>
    ));
  };

  return (
    <div>
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        className="w-[500px]"
      >
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

        {/* Cart Items Table */}
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product Name</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Unit Price</th>
              <th className="text-left py-2">Total</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                const basePrice = parseFloat(item.price); // Base price of the item
                const priceTiers = item.priceTiers || []; // Price tiers (if available)
                const quantity = item.quantity; // Selected quantity

                // Calculate the price for this item
                const itemPrice = calculatePrice(quantity, basePrice, priceTiers);
                const totalItemPrice = (itemPrice * quantity).toFixed(2);

                return (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-sm">
                      <div>{item.name}</div>
                      {item.selectedAttributes && (
                        <div className="mt-1">
                          {renderSelectedAttributes(item.selectedAttributes)}
                        </div>
                      )}
                    </td>
                    <td className="py-2 text-sm text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="py-2 text-sm text-center">${itemPrice.toFixed(2)}</td>
                    <td className="py-2 text-sm">${totalItemPrice}</td>
                    <td className="py-2 text-sm text-center">
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiFillDelete className="text-red-500" size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="text-center font-bold text-red-400">
                    No items found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Subtotal, Delivery Charge, and Total */}
        <div className="mt-6">
          <div className="flex justify-between">
            <span className="font-medium">Sub-Total:</span>
            <span className="font-medium">${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Delivery Charge:</span>
            <span className="font-medium">(will be added)</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${totalPrice}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Link to={`/checkout`}>
          <div className="mt-6">
            <button
              disabled={cartLength}
              className={`w-full bg-green-500 text-white py-2 rounded transition-all ${
                cartLength ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </Link>
      </Sidebar>
    </div>
  );
};

export default Cart;