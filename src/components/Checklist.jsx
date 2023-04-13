import React, { useState } from "react";
import { Menu, ConfigProvider } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import Button from "./Button";
import ModalChecklist from "./ModalChecklist";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Checklist = () => {
  const [openModal, setOpenModal] = useState(false);
  const trialURAArray = [
    { header: "2.1", content: "URA is so pro", url: "www.google.com" },
    { header: "2.1", content: "URA is so pro", url: "www.google.com" },
  ];

  const items = [
    getItem(
      "URA",
      "sub1",
      <WarningOutlined />,
      trialURAArray?.map((code, index) =>
        getItem(`${code.header} ${code.content}`, index),
      ),
    ),
    getItem("BCA", "sub2", <WarningOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
    getItem("SCDF", "sub3", <WarningOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const completedItems = [
    getItem(
      "URA - Completed",
      "sub1",
      <CheckCircleOutlined />,
      trialURAArray?.map((code, index) =>
        getItem(`${code.header} ${code.content}`, index),
      ),
    ),
    getItem("BCA - Completed", "sub2", <CheckCircleOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
    getItem("SCDF - Completed", "sub3", <CheckCircleOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const onClick = (e) => {};

  return (
    <div>
      <div className="text-base m-2 border-1 rounded-full border-lightgreen">
        Checklist
      </div>
      <div className="text-left text-sm ml-4 my-2 text-[#F1959B]">
        Pending Items
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#F1959B",
          },
        }}
      >
        <Menu
          onClick={onClick}
          className="focus: ring-[#ff0000] text-[#F1959B] text-left px-4 rounded-xl mx-auto overflow-auto h-[145px] font-base text-xs drop-shadow-md w-11/12 border-1"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </ConfigProvider>
      <div className="text-left text-sm ml-4 my-2 text-lightgreen">
        Completed Items
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#698c85",
          },
        }}
      >
        <Menu
          onClick={onClick}
          className="focus: ring-[#d2dcda] text-darkgreen text-left px-4 rounded-xl mx-auto overflow-auto h-[145px] font-light text-xs drop-shadow-md w-11/12 border-1"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={completedItems}
        />
      </ConfigProvider>
      <Button onClick={() => setOpenModal(true)}>Expand</Button>
      <ModalChecklist openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Checklist;
