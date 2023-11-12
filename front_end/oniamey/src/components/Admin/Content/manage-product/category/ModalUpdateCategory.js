import { React, useEffect, useState } from "react";
import { Modal } from "antd";
import { putUpdateProperty } from "../../../../../services/apiService";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

const ModalUpdateCategory = (props) => {
  const { show, setShow, dataUpdate, resetDataUpdate } = props;

  const [name, setName] = useState("");
  const nameError = name === "" ? "Tên không được để trống!" : "";
  const [deleted, setDeleted] = useState(false);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDeleted(false);
    resetDataUpdate();
  };

  useEffect(() => {
    setName(dataUpdate.name);
    setDeleted(dataUpdate.deleted);
  }, [dataUpdate]);

  const handleSubmitUpdateCategory = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận cập nhật!",
      icon: "infor",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (nameError !== "") {
          return;
        }

        await putUpdateProperty("category", dataUpdate.id, name, deleted);
        props.fetchListCategory();
          toast.success('Cập nhật thành công!');
        handleClose();
      }
    });
  };

  return (
    <>
      <Modal
        title="Cập Nhật Danh Mục"
        open={show}
        onOk={() => handleSubmitUpdateCategory()}
        onCancel={handleClose}
      >
        <form className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Tên</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <p style={{ color: "red", marginTop: "1px" }}>{nameError}</p>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">Trạng thái</label>
            <select
              className="form-select"
              value={dataUpdate.deleted}
              onChange={(e) => setDeleted(e.target.value)}
            >
              <option value={false}>Hoạt động</option>
              <option value={true}>Ngừng hoạt động</option>
            </select>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalUpdateCategory;