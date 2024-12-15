
"use client"
import { Card } from "@material-tailwind/react";
import { useEffect } from "react";

const DashboardTitle = ({ text, children, windowTitle }) => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = `${windowTitle ? windowTitle : ""} | অভিযোগ প্রতিকার ব্যবস্থা`;
    }
  }, [windowTitle]);

  return (
    // <Card className="p-3">
      <h2 className="text-xl font-Poppins">
        {text} {children}
      </h2>
    // </Card>
  );
};

export default DashboardTitle;
