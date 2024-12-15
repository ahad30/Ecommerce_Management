"use client";
import { LanguageContext } from "@/context/LanguageContext";
import React, { useContext } from "react";


const SaveAndCloseButton = ({ title, isLoading, closeModal }) => {
  const { currentLanguage } = useContext(LanguageContext) || {
    currentLanguage: "en",
  };

  // Map English titles to Bengali equivalents
  const bnTitleMap = {
    Login: "লগইন",
    Create: "জমা দিন",
    Update: "আপডেট",
    Close: "বন্ধ করুন",
    Submit: "জমা দিন",
    Processing: "প্রক্রিয়াকরণ চলছে...",
  };

  // Get the translated title based on the current language
  const translatedTitle =
    currentLanguage === "bn" ? bnTitleMap[title] || title : title;

  return (
    <div className="flex items-center gap-x-3 justify-end">
      {closeModal && (
        <button
          disabled={isLoading}
          onClick={() => closeModal()}
          type="button"
          className="bg-gray-200 disabled:cursor-not-allowed text-center text-gray-600 w-full lg:w-[200px] h-[45px] rounded-md"
        >
          {currentLanguage === "bn" ? bnTitleMap["Close"] : "Close"}
        </button>
      )}
      <button
        disabled={isLoading}
        type="submit"
        className={`${
          title === "Login"
            ? "lg:w-[88px] h-[35px]"
            : "w-full lg:w-[200px] h-[45px]"
        } bg-[#24354C] disabled:bg-[#4f5a67] disabled:cursor-not-allowed text-center text-white rounded-md`}
      >
        {isLoading
          ? currentLanguage === "bn"
            ? bnTitleMap["Processing"]
            : "Processing..."
          : translatedTitle}
      </button>
    </div>
  );
};

export default SaveAndCloseButton;
