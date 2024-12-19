import {
    FaTshirt,
    FaHeartbeat,
    FaBook,
    FaFootballBall,
    FaPuzzlePiece,
    FaGem,
    FaCouch,
    FaPlane,
    FaMobileAlt,
    FaBookReader,
    FaTicketAlt,
} from "react-icons/fa";
import { PiDevicesFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { useAppSelector } from "../../../redux/Hook/Hook";


const HomeLeftSidebar = () => {
    const categories = [
        { id: 1, name: "Electronics", icon: <PiDevicesFill /> },
        { id: 2, name: "Clothes and Fashion", icon: <FaTshirt /> },
        { id: 3, name: "Health and Beauty", icon: <FaHeartbeat /> },
        { id: 4, name: "Books and Stationery", icon: <FaBook /> },
        { id: 5, name: "Sports and Fitness", icon: <FaFootballBall /> },
        { id: 6, name: "Toys and Games", icon: <FaPuzzlePiece /> },
        { id: 7, name: "Jewelry and Accessories", icon: <FaGem /> },
        { id: 8, name: "Home and Furniture", icon: <FaCouch /> },
        { id: 9, name: "Travel and Accessories", icon: <FaPlane /> },
        { id: 10, name: "E-Goods", icon: <FaMobileAlt /> },
        { id: 11, name: "Travel and Accessories", icon: <FaPlane /> },
        { id: 12, name: "E-Books", icon: <FaBookReader /> },
        { id: 13, name: "Gift Cards and Tickets", icon: <FaTicketAlt /> },
    ];
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };

    const { isHomeCategorySidebarOpen } = useAppSelector(
        (state) => state.modal
    );

    return (
        <div className="md:px-4 bg-white">

            <div
                className={`${isHomeCategorySidebarOpen ? "block" : "hidden"} lg:block`}
            >
                {categories.slice(0, 11).map((category, idx) => (
                    <Link to="/all-categories" className="" key={idx}>
                        <div className="flex justify-between items-center transition-all duration-200 ease-in-out hover:px-2 h-8 hover:bg-[#edeeef]">
                            <div className="flex gap-3">
                                <span className="text-xl font-medium text-[#092635]">
                                    {category.icon}
                                </span>
                                <h1 className="text-sm">{category.name}</h1>
                            </div>
                        </div>
                        <div className="border-t-[1px] border-gray-300 mb-[2px]"></div>
                    </Link>
                ))}
                {categories.length > 11 && (
                    <div className="">
                        <Link
                            to="/"
                            className="text-blue-500 hover:bg-[#edeeef] transition-all duration-200 ease-in-out hover:px-2 flex justify-between items-center gap-2 py-1"
                        >
                            <span>View All</span>
                            <div className="border-[#092635] p-1 rounded-full bg-[#edeeef]">
                                {" "}
                                <MdArrowForwardIos />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeLeftSidebar;
