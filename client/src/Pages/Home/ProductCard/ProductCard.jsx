import SectionTitle from "../SectionTitle/SectionTitle";


const ProductCard = () => {
   
    const newArrival = [
        {
          "category": "New Arrival",
          "title": "Wireless Earbuds",
          "description": "Latest model with noise cancellation",
          "price": 59.99,
          "rating": 4.5,
          "img": "https://i.ibb.co/mHgkb5r/product-03.png"
        },
        {
          "category": "New Arrival",
          "title": "Smartwatch Series 6",
          "description": "Advanced health tracking features",
          "price": 199.99,
          "rating": 4.8,
          "img": "https://i.ibb.co/Z6FBgn3/product-04.png"
        },
        {
          "category": "New Arrival",
          "title": "Gaming Laptop",
          "description": "High performance for the ultimate gaming experience",
          "price": 1499.99,
          "rating": 4.7,
          "img": "https://i.ibb.co/FsW0xXc/product-05.png"
        },
        {
          "category": "New Arrival",
          "title": "Smart Home Hub",
          "description": "Control your smart home devices with ease",
          "price": 129.99,
          "rating": 4.6,
          "img": "https://i.ibb.co/pRCB25n/product-06.png"
        },
        {
          "category": "New Arrival",
          "title": "Noise Cancelling Headphones",
          "description": "Immersive sound with active noise cancellation",
          "price": 299.99,
          "rating": 4.8,
          "img": "https://i.ibb.co/7zncW9K/product-09.png"
        },
        {
          "category": "New Arrival",
          "title": "Electric Scooter",
          "description": "Eco-friendly and efficient transportation",
          "price": 499.99,
          "rating": 4.4,
          "img": "https://i.ibb.co/wrFGQHt/product-10.png"
        }
    ];

    const topSellProducts = [
        {
            "category": "Top Sell",
            "title": "4K Smart TV",
            "description": "Ultra HD resolution with smart features",
            "price": 799.99,
            "rating": 4.9,
            "img": "https://i.ibb.co/mHgkb5r/product-03.png"
        },
        {
            "category": "Top Sell",
            "title": "Digital Camera",
            "description": "High-quality photos and 4K video recording",
            "price": 899.99,
            "rating": 4.7,
            "img": "https://i.ibb.co/Z6FBgn3/product-04.png"
        },
        {
            "category": "Top Sell",
            "title": "Laptop",
            "description": "Powerful performance for work and entertainment",
            "price": 1299.99,
            "rating": 4.6,
             "img": "https://i.ibb.co/Z6FBgn3/product-04.png"
        },
        {
            "category": "Top Sell",
            "title": "Portable Bluetooth Speaker",
            "description": "Wireless audio with long battery life",
            "price": 99.99,
            "rating": 4.5,
            "img": "https://i.ibb.co/Z6FBgn3/product-04.png"
        },
        {
            "category": "Top Sell",
            "title": "Tablet",
            "description": "Large screen for productivity and entertainment",
            "price": 399.99,
            "rating": 4.7,
            "img": "https://i.ibb.co/7zncW9K/product-09.png"
        },
        {
            "category": "Top Sell",
            "title": "Robot Vacuum Cleaner",
            "description": "Automated cleaning for convenience",
            "price": 299.99,
            "rating": 4.8,
            "img": "https://i.ibb.co/wrFGQHt/product-10.png"
        }
    ];

    return (
        <div className="p-4">
            <SectionTitle title="TOP PRODUCTS" subTitle="Our Best-Selling and Most Popular Items" />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {newArrival && newArrival.map((item, idx) => (
                    <div key={idx} className="border border-gray-300 rounded p-4">
                        <img src={item.img} alt={item.title} className="mx-auto mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
                        <p className="font-bold">{item.title}</p>
                        <p>{item.description}</p>
                        <p className="text-green-500">${item.price}</p>
                        <p>{item.rating} stars</p>
                    </div>
                ))}
                {
                    topSellProducts && topSellProducts.map((item, idx) => (
                        <div key={idx} className="border border-gray-300 rounded p-4">
                            <img src={item.img} alt={item.title} className="mx-auto mb-4" style={{ maxWidth: '100%', height: 'auto' }} />
                            <p className="font-bold">{item.title}</p>
                            <p>{item.description}</p>
                            <p className="text-green-500">${item.price}</p>
                            <p>{item.rating} stars</p>
                        </div>
                    ))
                }
            </div>
            <h1 className="text-red-500 text-center mt-4">Top Sell</h1>
            <h1 className="text-purple-500 text-center mt-4">Featured Products</h1>
        </div>
    );
};

export default ProductCard;
