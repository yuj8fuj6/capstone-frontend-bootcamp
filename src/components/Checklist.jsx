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

  // Use effect for pending GFA code
  useEffect(() => {
    const pendingCodeCheck = gfaCodeChecklist.map((obj) =>
      omit(obj, [`gfa_code_model_buildings`]),
    );
    const filterPendingCodeCheck = pendingCodeCheck.filter((i) => {
      return !completedGfaCodeCheck.find((f) => f.id === i.id);
    });
    setPendingGfaCodeCheck(filterPendingCodeCheck);
  }, [gfaCodeChecklist, completedGfaCodeCheck]);

  // Use effect for pending Planning code
  useEffect(() => {
    const pendingCodeCheck = planningCodeChecklist.map((obj) =>
      omit(obj, [`planning_code_model_buildings`]),
    );
    const filterPendingCodeCheck = pendingCodeCheck.filter((i) => {
      return !completedPlanningCodeCheck.find((f) => f.id === i.id);
    });
    setPendingPlanningCodeCheck(filterPendingCodeCheck);
  }, [planningCodeChecklist, completedPlanningCodeCheck]);

  // Use effect for pending Accessibility code
  useEffect(() => {
    const pendingCodeCheck = accessibilityCodeChecklist.map((obj) =>
      omit(obj, [`accessibility_code_model_buildings`]),
    );
    const filterPendingCodeCheck = pendingCodeCheck.filter((i) => {
      return !completedAccessibilityCodeCheck.find((f) => f.id === i.id);
    });
    setPendingAccessibilityCodeCheck(filterPendingCodeCheck);
  }, [accessibilityCodeChecklist, completedAccessibilityCodeCheck]);

  // Use effect for pending Building code
  useEffect(() => {
    const pendingCodeCheck = buildingCodeChecklist.map((obj) =>
      omit(obj, [`building_code_model_buildings`]),
    );
    const filterPendingCodeCheck = pendingCodeCheck.filter((i) => {
      return !completedBuildingCodeCheck.find((f) => f.id === i.id);
    });
    setPendingBuildingCodeCheck(filterPendingCodeCheck);
  }, [buildingCodeChecklist, completedBuildingCodeCheck]);

  // Use effect for pending Fire code
  useEffect(() => {
    const pendingCodeCheck = fireCodeChecklist.map((obj) =>
      omit(obj, [`fire_code_model_buildings`]),
    );
    const filterPendingCodeCheck = pendingCodeCheck.filter((i) => {
      return !completedFireCodeCheck.find((f) => f.id === i.id);
    });
    setPendingFireCodeCheck(filterPendingCodeCheck);
  }, [fireCodeChecklist, completedFireCodeCheck]);

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
        pendingPlanningCodeCheck.map((code, index) =>
          getItem(`${index + 1}. ${code.header} - ${code.content}`, index),
        ),
      ),
    ]),
    getItem("BCA", "sub4", <WarningOutlined />, [
      getItem(
        "Code of Accessibility",
        "sub5",
        null,
        pendingAccessibilityCodeCheck.map((code, index) =>
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
        pendingBuildingCodeCheck.map((code, index) =>
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
        pendingFireCodeCheck.map((code, index) =>
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
          gfa_code_id: pendingGfaCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedGfaCodeCheck([
            ...completedGfaCodeCheck,
            res.data.gfa_code,
          ]);
          setPendingGfaCodeCheck([...pendingGfaCodeCheck, res.data.gfa_code]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub1", "sub3"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkPlanningCode`, {
          planning_code_id: pendingPlanningCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedPlanningCodeCheck([
            ...completedPlanningCodeCheck,
            res.data.planning_code,
          ]);
          setPendingPlanningCodeCheck([
            ...pendingPlanningCodeCheck,
            res.data.planning_code,
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub4", "sub5"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkAccessibilityCode`, {
          accessibility_code_id: pendingAccessibilityCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedAccessibilityCodeCheck([
            ...completedAccessibilityCodeCheck,
            res.data.accessibility_code,
          ]);
          setPendingAccessibilityCodeCheck([
            ...pendingAccessibilityCodeCheck,
            res.data.accessibility_code,
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub4", "sub6"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkBuildingCode`, {
          building_code_id: pendingBuildingCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedBuildingCodeCheck([
            ...completedBuildingCodeCheck,
            res.data.building_code,
          ]);
          setPendingBuildingCodeCheck([
            ...pendingBuildingCodeCheck,
            res.data.building_code,
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub7", "sub8"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkFireCode`, {
          fire_code_id: pendingFireCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedFireCodeCheck([
            ...completedFireCodeCheck,
            res.data.fire_code,
          ]);
          setPendingFireCodeCheck([
            ...pendingFireCodeCheck,
            res.data.fire_code,
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Uncheck clauses

    if (includesAll(e.keyPath, ["sub9", "sub10"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkGfaCode`, {
          gfa_code_id: completedGfaCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedGfaCodeCheck(
            completedGfaCodeCheck.filter(
              (el) => el.id !== completedGfaCodeCheck[e.keyPath[0]].id,
            ),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub9", "sub11"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkPlanningCode`, {
          planning_code_id: completedPlanningCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedPlanningCodeCheck(
            completedPlanningCodeCheck.filter(
              (el) => el.id !== completedPlanningCodeCheck[e.keyPath[0]].id,
            ),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub12", "sub13"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkAccessibilityCode`, {
          accessibility_code_id:
            completedAccessibilityCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedAccessibilityCodeCheck(
            completedAccessibilityCodeCheck.filter(
              (el) =>
                el.id !== completedAccessibilityCodeCheck[e.keyPath[0]].id,
            ),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub12", "sub14"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkBuildingCode`, {
          building_code_id: completedBuildingCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedBuildingCodeCheck(
            completedBuildingCodeCheck.filter(
              (el) => el.id !== completedBuildingCodeCheck[e.keyPath[0]].id,
            ),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (includesAll(e.keyPath, ["sub15", "sub16"])) {
      await axios
        .post(`${BACKEND_URL}/checklists/checkFireCode`, {
          fire_code_id: completedFireCodeCheck[e.keyPath[0]].id,
          check: true,
          building_id: allBuildings[0].id,
          user_id: userData.id,
        })
        .then((res) => {
          setCompletedFireCodeCheck(
            completedFireCodeCheck.filter(
              (el) => el.id !== completedFireCodeCheck[e.keyPath[0]].id,
            ),
          );
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
