import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
        <Modal
            show={show}
            onHide={handleClose}
            size="x"
            backdrop="static"
            className='modal-add-product'
            centered
        >
            <Modal.Header>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Status</label>
                        <select className="form-select" onChange={(e) => setDeleted(e.target.value)}>
                            <option value={false}>Active</option>
                            <option value={true}>DeActive</option>
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={() => handleSubmitCreateProduct()}>
                    Save
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateProduct;