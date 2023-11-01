import { React, useState } from 'react';
import { Modal } from 'antd';
import _ from 'lodash';
import { postCreateProperty } from '../../../../../services/apiService';

const ModalCreateSleeveLength = (props) => {

    const { show, setShow } = props;

    const [name, setName] = useState('');
    const [deleted, setDeleted] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName('');
        setDeleted(false);
    };

    const handleSubmitCreateSleeveLength = async () => {
        let data = await postCreateProperty('sleeve-length', name, deleted);
        props.fetchListSleeveLength();
        console.log(data);
        handleClose();
    };

    return (
        <>
            <Modal title="Thêm Chiều Dài Tay" open={show} onOk={() => handleSubmitCreateSleeveLength()} onCancel={handleClose}>
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

export default ModalCreateSleeveLength;