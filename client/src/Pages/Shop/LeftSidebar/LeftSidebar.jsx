import React, { useState } from "react";
import { useAppSelector } from "../../../redux/Hook/Hook";
import { Slider } from "antd";

const LeftSidebar = () => {
    const { isHomeCategorySidebarOpen } = useAppSelector((state) => state.modal);
    const [priceRange, setPriceRange] = useState([2.59, 18.59]);

    const handleSliderChange = (value) => {
        setPriceRange(value);
    };

    const handleInputChange = (index, value) => {
        const newValue = parseFloat(value);
        if (!isNaN(newValue)) {
            const newRange = [...priceRange];
            newRange[index] = newValue;
            if (newRange[0] <= newRange[1]) {
                setPriceRange(newRange);
            }
        }
    };

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
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold mb-3 text-lg">PRICE</h3>
                        <span className="bg-black text-white text-sm px-2 py-1 rounded">
                            {priceRange[0].toFixed(2)}-{priceRange[1].toFixed(2)}
                        </span>
                    </div>
                    
                    <div className="mt-6 px-2">
                        <Slider
                            range
                            value={priceRange}
                            onChange={handleSliderChange}
                            min={0}
                            max={100}
                            step={0.01}
                            trackStyle={[{ backgroundColor: 'black' }]}
                            handleStyle={[
                                { borderColor: 'black', backgroundColor: 'white' },
                                { borderColor: 'black', backgroundColor: 'white' }
                            ]}
                            railStyle={{ backgroundColor: '#d1d5db' }}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex-1 mr-4">
                            <label className="text-sm text-gray-600">Minimum</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    type="text"
                                    // value={priceRange[0].toFixed(2)}
                                    onChange={(e) => handleInputChange(0, e.target.value)}
                                    className="focus:ring-black focus:border-black block w-full pl-7 pr-2 py-2 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-gray-600">Maximum</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    type="text"
                                    // value={priceRange[1].toFixed(2)}
                                    onChange={(e) => handleInputChange(1, e.target.value)}
                                    className="focus:ring-black focus:border-black block w-full pl-7 pr-2 py-2 sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
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
