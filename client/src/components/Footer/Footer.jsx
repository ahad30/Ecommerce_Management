import { LanguageContext } from "@/context/LanguageContext";
import { useGetFooterQuery } from "@/redux/Feature/Admin/footer/footerApi";
import {
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import { useContext } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import labels from "../../translationData/HomePage.json";
import getTranslation from '@/context/getTranslationUtility';


const footer = labels.footer;


export default function Footer() {
  const { data, isLoading, isError } = useGetFooterQuery();
  const { currentLanguage } = useContext(LanguageContext) || { currentLanguage: "en" };

  const toLink = getTranslation("toLink", currentLanguage, footer);
  const media = getTranslation("media", currentLanguage, footer);
  const touch = getTranslation("touch", currentLanguage, footer);

  
  if (isLoading) return <p>Loading...</p>;

  if (isError || !data?.data?.[0]) return <p>Error loading footer data.</p>;

  const footerData = data?.data?.[0];
  const socialLinks = JSON.parse(footerData.socialMediaLinks || "[]");
  const quickLinks = JSON.parse(footerData.quickLinks || "[]");

  return (
    <footer className="bg-[#203990] text-white py-10">
      <div className="mx-auto max-w-[90%]">
        {/* Upper Section */}
        <div className="flex lg:flex-row flex-col gap-5 justify-between">
          {/* Left Section: Logo and About */}
          <div className="w-full lg:w-1/4">
            <div className="flex-col items-center space-x-2 mb-5">
              <Image
                src="/MpUN8FGwxrTcxR5VTjINTuXxuf4HMKB4b2rxDACf.png"
                alt="Logo"
                width={157}
                height={100}
                className="mb-3"
              />
              <Typography className="cursor-pointer py-1.5 font-medium">
                {currentLanguage === "en" ? footerData.aboutTextEnglish : footerData.aboutTextBangla}
              </Typography>
            </div>
          </div>

          {/* Middle Section: Quick Links */}
          <div className="w-full sm:w-1/2 lg:w-1/5">
            <Typography variant="h6" className="mb-4 font-bold text-[21px]">
             {toLink}
            </Typography>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.value}>
                    {
                      currentLanguage == 'en' ? link?.labelEn : link?.labelBn
                    }
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Section: Social Media */}
          <div className="w-full sm:w-1/2 lg:w-1/5">
  <Typography variant="h6" className="mb-4 font-bold text-[21px]">
   {media}
  </Typography>
  <ul className="space-y-2">
    {socialLinks.map((link, index) => (
      <li key={index}>
        <a
          href={link.url}
          className="text-white hover:text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
         {
                      currentLanguage == 'en' ? link.name : link.bangla
                    }
        </a>
      </li>
    ))}
  </ul>
</div>


          {/* Right Section: Contact Information */}
          <div className="w-full lg:w-1/4">
            <Typography variant="h6" className="mb-4 font-bold text-[21px]">
        {touch}
            </Typography>
            <ul className="space-y-4">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-white" />
                <span>{currentLanguage === "en" ? footerData.addressEnglish : footerData.addressBangla}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-white" />
                <span>
  <a href={`tel:${footerData.contactPhone}`}>
    {footerData.contactPhone}
  </a>
</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-white" />
                <span>{footerData.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-10 border-t border-white pt-4 flex flex-wrap justify-between items-center">
        <div>
        <Typography className="text-sm text-white">
            {currentLanguage === "en"
              ? footerData?.copyrightTextEnglish
              : footerData?.copyrightTextBangla
            }
          
          </Typography>
        </div>
          <div>
          <a
              className=" ms-3"
              target="_blank"
              href="https://www.smartframeworkbd.com/"
            >
            {currentLanguage === "en" ?
              "Develope By Smart Framework"
              : "কারিগরি সহায়তা স্মার্ট ফ্রেমওয়ার্ক"
            }
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
