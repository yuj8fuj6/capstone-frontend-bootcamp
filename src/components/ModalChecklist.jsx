import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ChecklistContext } from "../contexts/ChecklistContext";
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

  const { getAccessTokenSilently } = useAuth0();

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
              5/14 Items Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">URA</div>
              <div className="h-[800px] overflow-auto">
                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-1 font-bold">1.</div>
                  <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2">
                    Hello
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-right text-xs mb-1">
              5/14 Items Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">BCA</div>
              <div className="h-[800px] overflow-auto">
                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-1 font-bold">1.</div>
                  <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2">
                    Hello
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-right text-xs mb-1">
              5/14 Items Outstanding
            </div>
            <div className="border-1 border-darkgreen rounded-xl p-2 items-center">
              <div className="font-bold">SCDF</div>
              <div className="h-[800px] overflow-auto">
                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-1 font-bold">1.</div>
                  <div className="col-span-11 border-1 border-slate-300 rounded-xl p-2">
                    Hello
                  </div>
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
