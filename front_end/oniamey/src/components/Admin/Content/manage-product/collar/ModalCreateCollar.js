import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { postCreateProperty } from '../../../../../services/apiService';

const ModalCreateCollar = (props) => {

    const { show, setShow } = props;

    const [name, setName] = useState('');
    const [deleted, setDeleted] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName('');
        setDeleted(false);
    };

    const handleSubmitCreateCollar = async () => {
        let data = await postCreateProperty('collar', name, deleted);
        props.fetchListCollar();
        handleClose();
        console.log(data);
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="x"
            backdrop="static"
            className='modal-add-collar'
            centered
        >
            <Modal.Header>
                <Modal.Title>Add New Collar</Modal.Title>
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
                        <label className="form-label">Status</label>
                        <select className="form-select" onChange={(e) => setDeleted(e.target.value)}>
                            <option value={false}>Active</option>
                            <option value={true}>DeActive</option>
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={() => handleSubmitCreateCollar()}>
                    Save
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateCollar;