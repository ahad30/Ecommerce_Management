// Cart.js
import React from "react";
import { Sidebar } from "primereact/sidebar";
import { useAppSelector, useAppDispatch } from "../../redux/Hook/Hook";
import { removeFromCart } from "../../redux/Cart/cartSlice";
import { toast } from "sonner";
import { AiFillDelete } from "react-icons/ai";

const Cart = ({ visibleRight, setVisibleRight }) => {
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const dispatch = useAppDispatch();

  // Function to handle item deletion
  const handleDeleteItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    toast.success("Removed from cart successfully");
  };

  // Calculate total price
  const totalPrice = cartItems
  .reduce((total, item) => total + item.price * item.quantity, 0)
  .toFixed(2); // Round to 2 decimal places

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
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 text-sm">
                  <div>{item.name}</div>
                  {item.selectedAttributes && (
                    <div className="mt-1">
                      {renderSelectedAttributes(item.selectedAttributes)}
                    </div>
                  )}
                </td>
                <td className="py-2 text-sm text-center">{item.quantity}</td>
                <td className="py-2 text-sm text-center">${item.price}</td>
                <td className="py-2 text-sm">${item.price * item.quantity}</td>
                <td className="py-2 text-sm text-center">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiFillDelete className="text-red-500" size={20} />
                  </button>
                </td>
              </tr>
            ))}
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
        <div className="mt-6">
          <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-blue-600 transition-all">
            Proceed to Checkout
          </button>
        </div>
      </Sidebar>
    </div>
  );
};

export default Cart;