import React, { useState, useContext, useEffect } from "react";
import { Menu, ConfigProvider } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import Button from "./Button";
import ModalChecklist from "./ModalChecklist";
import { UserContext } from "../contexts/UserContext";
import { ChecklistContext } from "../contexts/ChecklistContext";
import axios from "axios";

import { BACKEND_URL } from "../constants";

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
  const {
    allAuthorities,
    gfaCodeChecklist,
    setGfaCodeChecklist,
    planningCodeChecklist,
    setPlanningCodeChecklist,
    accessibilityCodeChecklist,
    setAccessibilityCodeChecklist,
    buildingCodeChecklist,
    setBuildingCodeChecklist,
    fireCodeChecklist,
    setFireCodeChecklist,
    allBuildings,
    setAllBuildings,
    completedGfaCodeCheck,
    setCompletedGfaCodeCheck,
    completedPlanningCodeCheck,
    setCompletedPlanningCodeCheck,
    completedAccessibilityCodeCheck,
    setCompletedAccessibilityCodeCheck,
    completedBuildingCodeCheck,
    setCompletedBuildingCodeCheck,
    completedFireCodeCheck,
    setCompletedFireCodeCheck,
  } = useContext(ChecklistContext);

  const { userData, setUserData } = useContext(UserContext);

  const omit = require("lodash.omit");

  const [openModal, setOpenModal] = useState(false);
  const [pendingGfaCodeCheck, setPendingGfaCodeCheck] = useState([]);
  const [pendingPlanningCodeCheck, setPendingPlanningCodeCheck] = useState([]);
  const [pendingAccessibilityCodeCheck, setPendingAccessibilityCodeCheck] =
    useState([]);
  const [pendingBuildingCodeCheck, setPendingBuildingCodeCheck] = useState([]);
  const [pendingFireCodeCheck, setPendingFireCodeCheck] = useState([]);

  // Use effect for GFA code
  useEffect(() => {
    if (gfaCodeChecklist.length && completedGfaCodeCheck.length) {
      const pendingCodeCheck = gfaCodeChecklist.map((obj) =>
        omit(obj, [`gfa_code_model_buildings`]),
      );
      const filterPendingCodeCheck = pendingCodeCheck.filter((i) => {
        return !completedGfaCodeCheck.find((f) => f.id === i.id);
      });
      setPendingGfaCodeCheck(filterPendingCodeCheck);
    }
  }, [gfaCodeChecklist, completedGfaCodeCheck]);

  // Use effect for Planning code 
  

  const items = [
    getItem("URA", "sub1", <WarningOutlined />, [
      getItem(
        "GFA Handbook",
        "sub2",
        null,
        pendingGfaCodeCheck.map((code, index) =>
          getItem(`${index + 1}. ${code.header} - ${code.content}`, index),
        ),
      ),
      getItem(
        "DC Handbook",
        "sub3",
        null,
        planningCodeChecklist.map((code, index) =>
          getItem(`${index + 1}. ${code.header} - ${code.content}`, index),
        ),
      ),
    ]),
    getItem("BCA", "sub4", <WarningOutlined />, [
      getItem(
        "Code of Accessibility",
        "sub5",
        null,
        accessibilityCodeChecklist.map((code, index) =>
          getItem(
            `${index + 1}. ${code.chapter}.${code.clause_no} - ${code.content}`,
            index,
          ),
        ),
      ),
      getItem(
        "Approved Document",
        "sub6",
        null,
        buildingCodeChecklist.map((code, index) =>
          getItem(
            `${index + 1}. ${code.chapter}.${code.clause_no} - ${code.content}`,
            index,
          ),
        ),
      ),
    ]),
    getItem("SCDF", "sub7", <WarningOutlined />, [
      getItem(
        "Fire Code",
        "sub8",
        null,
        fireCodeChecklist.map((code, index) =>
          getItem(
            `${index + 1}. ${code.chapter}.${code.clause_no} - ${code.content}`,
            index,
          ),
        ),
      ),
    ]),
  ];

  // Mapping completed items 
  const completedItems = [
    getItem("URA - Completed", "sub9", <CheckCircleOutlined />, [
      getItem(
        "GFA Handbook",
        "sub10",
        null,
        completedGfaCodeCheck.map((code, index) =>
          getItem(`${index + 1}. ${code.header} - ${code.content}`, index),
        ),
      ),
      getItem(
        "DC Handbook",
        "sub11",
        null,
        completedPlanningCodeCheck.map((code, index) =>
          getItem(`${index + 1}. ${code.header} - ${code.content}`, index),
        ),
      ),
    ]),
    getItem("BCA - Completed", "sub12", <CheckCircleOutlined />, [
      getItem(
        "Code of Accessibility",
        "sub13",
        null,
        completedAccessibilityCodeCheck.map((code, index) =>
          getItem(
            `${index + 1}. ${code.chapter}.${code.clause_no} - ${code.content}`,
            index,
          ),
        ),
      ),
      getItem(
        "Approved Document",
        "sub14",
        null,
        completedBuildingCodeCheck.map((code, index) =>
          getItem(
            `${index + 1}. ${code.chapter}.${code.clause_no} - ${code.content}`,
            index,
          ),
        ),
      ),
    ]),
    getItem("SCDF - Completed", "sub15", <CheckCircleOutlined />, [
      getItem(
        "Fire Code",
        "sub16",
        null,
        completedFireCodeCheck.map((code, index) =>
          getItem(
            `${index + 1}. ${code.chapter}.${code.clause_no} - ${code.content}`,
            index,
          ),
        ),
      ),
    ]),
  ];

  const includesAll = (arr, values) => values.every((v) => arr.includes(v));

  const onClick = async (e) => {
    if (includesAll(e.keyPath, ["sub1", "sub2"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkGfaCode`, {
          gfa_code_id: gfaCodeChecklist[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[allBuildings.length - 1].id,
          user_id: userData.id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
