
import { LanguageContext } from "@/context/LanguageContext";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import Link from "next/link";
import { useContext } from "react";
import { FaBackward, FaPlus } from "react-icons/fa";
const ButtonWithModal = ({
  title,
  path,
  back
}) => {
  const { currentLanguage } = useContext(LanguageContext) || {
    currentLanguage: "en",
  };

  // Map English titles to Bengali equivalents
  const bnTitleMap = {
    Back: "ব্যাক",

  };

  // Get the translated title based on the current language
  const translatedTitle =
    currentLanguage === "bn" ? bnTitleMap[title] || title : title;




  const dispatch = useAppDispatch();
  return path ? (
    <Link href={`${path}`}>
      <button className="bg-[#24354C] flex justify-center items-center gap-2  text-center text-white w-full px-2 lg:px-0 py-2 lg:py-0 lg:w-[200px] lg:h-[45px] rounded-md">
        
      {
     back ? (
    <>
      <FaBackward /> {translatedTitle}
    </>
  ) : (
    <>
      <FaPlus /> {translatedTitle}
    </>
  )
}

      </button>
    </Link>
  ) : (
    <button
      onClick={() => dispatch(setIsAddModalOpen())}
      className="bg-[#24354C] flex justify-center  items-center gap-2  text-center text-white w-full px-2 lg:px-0 py-2 lg:py-0 lg:w-[200px] lg:h-[45px] rounded-md"
    >
      <FaPlus /> {translatedTitle}
    </button>
  );
};

export default ButtonWithModal;
