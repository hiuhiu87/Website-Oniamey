import { React, useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { postCreateProperty } from '../../../../../services/apiService';

const ModalCreateBrand = (props) => {

    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setName('');
        setDeleted(false);
    };

    const [name, setName] = useState('');
    const [deleted, setDeleted] = useState(false);

    const handleSubmitCreateBrand = async () => {
        await postCreateProperty('brand', name, deleted);
        props.fetchListBrand();
        toast.success('oke');
        handleClose();
    };

    return (
        <>
            <Modal title="Thêm Thương Hiệu" open={show} onOk={() => handleSubmitCreateBrand()} onCancel={handleClose}>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Trạng thái</label>
                        <select className="form-select" onChange={(e) => setDeleted(e.target.value)}>
                            <option value={false}>Hoạt động</option>
                            <option value={true}>Ngừng hoạt động</option>
                        </select>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default ModalCreateBrand;