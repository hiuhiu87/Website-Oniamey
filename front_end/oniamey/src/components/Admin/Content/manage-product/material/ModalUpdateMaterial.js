import { React, useEffect, useState } from 'react';
import { Modal } from 'antd';
import _ from 'lodash';
import { putUpdateProperty } from '../../../../../services/apiService';

const ModalUpdateMaterial = (props) => {

    const { show, setShow, dataUpdate, resetDataUpdate } = props;

    const [name, setName] = useState('');
    const [deleted, setDeleted] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName('');
        setDeleted(false);
        resetDataUpdate();
    };

    useEffect(() => {
        setName(dataUpdate.name);
        setDeleted(dataUpdate.deleted);
    }, [dataUpdate])

    const handleSubmitUpdateMaterial = async () => {
        await putUpdateProperty('material', dataUpdate.id, name, deleted);
        props.fetchListMaterial();
        handleClose();
    };

    return (
        <>
            <Modal title="Cập Nhật Chất Liệu" open={show} onOk={() => handleSubmitUpdateMaterial()} onCancel={handleClose}>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Trạng thái</label>
                        <select className="form-select" defaultValue={dataUpdate.deleted} onChange={(e) => setDeleted(e.target.value)}>
                            <option value={false}>Hoạt động</option>
                            <option value={true}>Ngừng hoạt động</option>
                        </select>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default ModalUpdateMaterial;