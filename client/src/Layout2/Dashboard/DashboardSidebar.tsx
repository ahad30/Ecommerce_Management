import { useState } from "react";
const DashboardSidebar = () => {
  const [items, setSItems] = useState([
    {
      key: "content",
      label: "Content",
      dropdown: false,
      children: [{ key: "content_child1", label: "Content Child 1" }],
    },
    {
      key: "media",
      label: "Media",
      dropdown: false,
    },
    {
      key: "settings",
      label: "Settings",
      dropdown: false,
      children: [{ key: "settings_child1", label: "Settings Child 1" }],
    },
    {
      key: "profile",
      label: "Profile",
      dropdown: false,
    },
    {
      key: "dashboard",
      label: "Dashboard",
      dropdown: false,
      children: [{ key: "dashboard_child1", label: "Dashboard Child 1" }],
    },
  ]);

  const dropdownHandler = (key: string) => {
    const findTheItems = items.find((item) => item.key === key);
    if (findTheItems?.dropdown) {
      findTheItems!.dropdown = false;
    } else {
      findTheItems!.dropdown = true;
    }
    setSItems([...items]);
  };
  return (
    <div className="border border-red-400 w-[200px]">
      {items?.map((item) => (
        <div key={item.key} className="">
          <div
            onClick={() => dropdownHandler(item.key)}
            className="flex items-center justify-between"
          >
            <p className="">{item.label}</p>
            {item?.children &&
              (item.dropdown ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              ))}
          </div>
          <div className={`ml-2 ${item.dropdown ? "duration-500" : "hidden"}`}>
            {item.children?.map((subitem) => (
              <p
                key={subitem.key}
                
              >
                {subitem.label}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSidebar;
