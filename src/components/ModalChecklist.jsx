import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { ChecklistContext } from "../contexts/ChecklistContext";

import { BACKEND_URL } from "../constants";

const ModalChecklist = (props) => {
  const { openModal, setOpenModal } = props;
  const { isLoading, isAuthenticated } = useAuth0();
  const { allAuthorities } = useContext(ChecklistContext);
  console.log(allAuthorities);

  return (
    <>
      <Modal
        open={openModal}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        centered={true}
        width="700px"
      >
        Hello!
      </Modal>
    </>
  );
};

export default ModalChecklist;
