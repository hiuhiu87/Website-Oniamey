import { React, useState } from 'react';
import { Modal } from 'antd';
import _ from 'lodash';
import { postCreateProduct } from '../../../../../services/apiService';

const ModalCreateProduct = (props) => {

    const { show, setShow } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deleted, setDeleted] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setDeleted(false);
    };

    const handleSubmitCreateProduct = async () => {
        let data = await postCreateProduct(name, description, deleted);
        props.fetchListProduct();
        console.log(data);
        handleClose();
    };

    return (
        <>
            <Modal title="Thêm sản phẩm" open={show} onOk={() => handleSubmitCreateProduct()} onCancel={handleClose}>
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
                        <label className="form-label">Mô tả</label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default ModalCreateProduct;