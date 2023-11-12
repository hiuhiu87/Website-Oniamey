import { React, useState } from "react";
import { Modal } from "antd";
import { postCreateProperty } from "../../../../../services/apiService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ModalCreateCollar = (props) => {
  const { show, setShow } = props;

  const [name, setName] = useState("");
  const nameError = name.trim() === "" ? "Tên không được để trống!" : "";
  const [deleted, setDeleted] = useState(false);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDeleted(false);
  };

  const handleSubmitCreateCollar = () => {
    Swal.fire({
      title: "Thông báo",
      text: "Xác nhận thêm!",
      icon: "infor",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (nameError) {
          return;
        }

        await postCreateProperty("collar", name, deleted);
        toast.success("Thêm thành công!");
        props.fetchListCollar();
        handleClose();
      }
    });
  };

  return (
    <>
      <Modal
        title="Thêm Cổ Áo"
        open={show}
        onOk={() => handleSubmitCreateCollar()}
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

export default ModalCreateCollar;
