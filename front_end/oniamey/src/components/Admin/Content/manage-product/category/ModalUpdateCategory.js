import { React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { putUpdateProperty } from '../../../../../services/apiService';

const ModalUpdateCategory = (props) => {

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

    const handleSubmitUpdateCategory = async () => {
        await putUpdateProperty('category', dataUpdate.id, name, deleted);
        props.fetchListCategory();
        handleClose();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="x"
            backdrop="static"
            className='modal-add-category'
            centered
        >
            <Modal.Header>
                <Modal.Title>Update Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Status</label>
                        <select className="form-select" defaultValue={dataUpdate.deleted} onChange={(e) => setDeleted(e.target.value)}>
                            <option value={false}>Active</option>
                            <option value={true}>DeActive</option>
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={() => handleSubmitUpdateCategory()}>
                    Save
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUpdateCategory;