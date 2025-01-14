import React from "react";
import { useAppSelector } from "../../../redux/Hook/Hook";

const LeftSidebar = () => {
    const { isHomeCategorySidebarOpen } = useAppSelector((state) => state.modal);

    return (
        <div className="md:px-4 bg-white">
            <div className={`${isHomeCategorySidebarOpen ? "block" : "hidden"} lg:block w-[250px]`}>
                {/* Categories Section */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-lg">CATEGORIES</h3>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="bedroom" className="mr-2" />
                            <label htmlFor="bedroom">Bedroom (15)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="sofa" className="mr-2" />
                            <label htmlFor="sofa">Sofa (0)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="office" className="mr-2" />
                            <label htmlFor="office">Office (21)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="outdoor" className="mr-2" />
                            <label htmlFor="outdoor">Outdoor (10)</label>
                        </div>
                    </div>
                </div>

                {/* Brands Section */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-lg">BRANDS</h3>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="cookingColor" className="mr-2" />
                            <label htmlFor="cookingColor">Cooking Color (15)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="magniflex" className="mr-2" />
                            <label htmlFor="magniflex">Magniflex (9)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="ashley" className="mr-2" />
                            <label htmlFor="ashley">Ashley (21)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="m&d" className="mr-2" />
                            <label htmlFor="m&d">M&D (10)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="olympic" className="mr-2" />
                            <label htmlFor="olympic">Olympic (10)</label>
                        </div>
                    </div>
                </div>

                {/* Price Range Section */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-lg">PRICE</h3>
                    <div className="flex items-center space-x-2">
                        <input type="text" placeholder="min" className="w-20 p-1 border rounded" />
                        <span>-</span>
                        <input type="text" placeholder="max" className="w-20 p-1 border rounded" />
                    </div>
                </div>

                {/* Size Section */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-lg">SIZE</h3>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">XS</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">S</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">M</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">L</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-100">XL</button>
                    </div>
                </div>

                {/* Color Section */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-lg">COLOR</h3>
                    <div className="flex space-x-2">
                        <button className="w-6 h-6 rounded-sm bg-red-500"></button>
                        <button className="w-6 h-6 rounded-sm bg-black"></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;
