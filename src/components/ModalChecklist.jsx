import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ChecklistContext } from "../contexts/ChecklistContext";
import { UserContext } from "../contexts/UserContext";
import { BsCheck2Square, BsSquare } from "react-icons/bs";

import { BACKEND_URL } from "../constants";

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const ModalChecklist = (props) => {
  const { openModal, setOpenModal } = props;
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

  const { getAccessTokenSilently } = useAuth0();

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

  const handlePendingGfaClick = async (index) => {
    await axios
      .post(`${BACKEND_URL}/checklists/checkGfaCode`, {
        gfa_code_id: pendingGfaCodeCheck[index].id,
        check: true,
        building_id: allBuildings[0].id,
        user_id: userData.id,
      })
      .then((res) => {
        setCompletedGfaCodeCheck([...completedGfaCodeCheck, res.data.gfa_code]);
        setPendingGfaCodeCheck([...pendingGfaCodeCheck, res.data.gfa_code]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCompletedGfaClick = async (index) => {
    await axios
      .post(`${BACKEND_URL}/checklists/checkGfaCode`, {
        gfa_code_id: completedGfaCodeCheck[index].id,
        check: true,
        building_id: allBuildings[0].id,
        user_id: userData.id,
      })
      .then((res) => {
        setCompletedGfaCodeCheck(
          completedGfaCodeCheck.filter(
            (el) => el.id !== completedGfaCodeCheck[index].id,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        open={openModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        centered={true}
        width="1200px"
        className="text-darkgreen"
      >
        <div className="text-base font-bold text-left">Checklist</div>
        <div className="grid grid-cols-3 gap-6 mt-2">
          <div>
            <div className="text-right text-xs mb-1">
              {pendingGfaCodeCheck.length}/{gfaCodeChecklist.length} Items
              Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">URA - DC Handbook</div>
              <div className="h-[350px] overflow-auto text-xs">
                {pendingGfaCodeCheck.map((clause, index) => (
                  <div
                    className="grid grid-cols-12 items-center mt-2"
                    onClick={() => handlePendingGfaClick(index)}
                  >
                    <div className="col-span-1 font-bold">{index + 1}.</div>
                    <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                      <div className="grid grid-cols-1">
                        <div className="font-bold text-xxs">
                          {clause.header}
                        </div>
                        <div>{clause.content}</div>
                        <div className="text-xxs">
                          Ref. Url:
                          <a
                            href={`https://${clause.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {clause.url}
                          </a>
                        </div>
                      </div>
                      <BsSquare />
                    </div>
                  </div>
                ))}
                <div className="border-t border-darkgreen mt-2">
                  {completedGfaCodeCheck.map((clause, index) => (
                    <div className="grid grid-cols-12 items-center mt-2 text-lightgreen">
                      <div className="col-span-1 font-bold">{index + 1}.</div>
                      <div
                        className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100"
                        onClick={() => handleCompletedGfaClick(index)}
                      >
                        <div className="grid grid-cols-1">
                          <div className="font-bold text-xxs line-through">
                            {clause.header}
                          </div>
                          <div className="line-through">{clause.content}</div>
                          <div className="text-xxs">
                            Ref. Url:
                            <a
                              href={`https://${clause.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {clause.url}
                            </a>
                          </div>
                        </div>
                        <BsCheck2Square />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-right text-xs mb-1">
              {pendingPlanningCodeCheck.length}/{planningCodeChecklist.length}{" "}
              Items Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">URA - GFA Handbook</div>
              <div className="h-[350px] overflow-auto text-xs">
                {pendingPlanningCodeCheck.map((clause, index) => (
                  <div className="grid grid-cols-12 items-center mt-2">
                    <div className="col-span-1 font-bold">{index + 1}.</div>
                    <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                      <div className="grid grid-cols-1">
                        <div className="font-bold text-xxs">
                          {clause.header}
                        </div>
                        <div>{clause.content}</div>
                        <div className="text-xxs">
                          Ref. Url:
                          <a
                            href={`https://${clause.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {clause.url}
                          </a>
                        </div>
                      </div>
                      <BsSquare />
                    </div>
                  </div>
                ))}
                <div className="border-t border-darkgreen mt-2">
                  {completedPlanningCodeCheck.map((clause, index) => (
                    <div className="grid grid-cols-12 items-center mt-2 text-lightgreen">
                      <div className="col-span-1 font-bold">{index + 1}.</div>
                      <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                        <div className="grid grid-cols-1">
                          <div className="font-bold text-xxs line-through">
                            {clause.header}
                          </div>
                          <div className="line-through">{clause.content}</div>
                          <div className="text-xxs">
                            Ref. Url:
                            <a
                              href={`https://${clause.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {clause.url}
                            </a>
                          </div>
                        </div>
                        <BsCheck2Square />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-right text-xs mb-1">
              {pendingAccessibilityCodeCheck.length}/
              {accessibilityCodeChecklist.length} Items Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">BCA - Code on Accessibility</div>
              <div className="h-[350px] overflow-auto text-xs">
                {pendingAccessibilityCodeCheck.map((clause, index) => (
                  <div className="grid grid-cols-12 items-center mt-2">
                    <div className="col-span-1 font-bold">{index + 1}.</div>
                    <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                      <div className="grid grid-cols-1">
                        <div className="font-bold text-xxs">
                          {clause.chapter}.{clause.clause_no}
                        </div>
                        <div>{clause.content}</div>
                        <div className="text-xxs">
                          Page {clause.page_no} of Code Document
                        </div>
                      </div>
                      <BsSquare />
                    </div>
                  </div>
                ))}
                <div className="border-t border-darkgreen mt-2">
                  {completedAccessibilityCodeCheck.map((clause, index) => (
                    <div className="grid grid-cols-12 items-center mt-2 text-lightgreen">
                      <div className="col-span-1 font-bold">{index + 1}.</div>
                      <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                        <div className="grid grid-cols-1">
                          <div className="font-bold text-xxs line-through">
                            {clause.header}
                          </div>
                          <div className="line-through">{clause.content}</div>
                          <div className="text-xxs">
                            Page {clause.page_no} of Code Document
                          </div>
                        </div>
                        <BsCheck2Square />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-right text-xs mb-1">
              {pendingBuildingCodeCheck.length}/{buildingCodeChecklist.length}{" "}
              Items Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">BCA - Approved Document</div>
              <div className="h-[350px] overflow-auto text-xs">
                {pendingBuildingCodeCheck.map((clause, index) => (
                  <div className="grid grid-cols-12 items-center mt-2">
                    <div className="col-span-1 font-bold">{index + 1}.</div>
                    <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                      <div className="grid grid-cols-1">
                        <div className="font-bold text-xxs">
                          {clause.chapter}.{clause.clause_no}
                        </div>
                        <div>{clause.content}</div>
                        <div className="text-xxs">
                          Page {clause.page_no} of Code Document
                        </div>
                      </div>
                      <BsSquare />
                    </div>
                  </div>
                ))}
                <div className="border-t border-darkgreen mt-2">
                  {completedBuildingCodeCheck.map((clause, index) => (
                    <div className="grid grid-cols-12 items-center mt-2 text-lightgreen">
                      <div className="col-span-1 font-bold">{index + 1}.</div>
                      <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                        <div className="grid grid-cols-1">
                          <div className="font-bold text-xxs line-through">
                            {clause.header}
                          </div>
                          <div className="line-through">{clause.content}</div>
                          <div className="text-xxs">
                            Page {clause.page_no} of Code Document
                          </div>
                        </div>
                        <BsCheck2Square />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-right text-xs mb-1">
              {pendingFireCodeCheck.length}/{fireCodeChecklist.length} Items
              Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">SCDF - Fire Code</div>
              <div className="h-[350px] overflow-auto text-xs">
                {pendingFireCodeCheck.map((clause, index) => (
                  <div className="grid grid-cols-12 items-center mt-2">
                    <div className="col-span-1 font-bold">{index + 1}.</div>
                    <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                      <div className="grid grid-cols-1">
                        <div className="font-bold text-xxs">
                          {clause.chapter}.{clause.clause_no}
                        </div>
                        <div>{clause.content}</div>
                        <div className="text-xxs">
                          Ref. Url:
                          <a
                            href={`https://${clause.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {clause.url}
                          </a>
                        </div>
                      </div>
                      <BsSquare />
                    </div>
                  </div>
                ))}
                <div className="border-t border-darkgreen mt-2">
                  {completedFireCodeCheck.map((clause, index) => (
                    <div className="grid grid-cols-12 items-center mt-2 text-lightgreen">
                      <div className="col-span-1 font-bold">{index + 1}.</div>
                      <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2 flex flex-row flex-wrap items-center justify-between hover:bg-slate-100">
                        <div className="grid grid-cols-1">
                          <div className="font-bold text-xxs line-through">
                            {clause.header}
                          </div>
                          <div className="line-through">{clause.content}</div>
                          <div className="text-xxs">
                            Ref. Url:
                            <a
                              href={`https://${clause.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {clause.url}
                            </a>
                          </div>
                        </div>
                        <BsCheck2Square />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalChecklist;
