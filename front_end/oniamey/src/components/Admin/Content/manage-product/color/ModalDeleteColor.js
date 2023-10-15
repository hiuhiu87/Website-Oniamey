import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProperty } from '../../../../../services/apiService';

const ModalDeleteColor = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteColor = async (event) => {
        let data = await deleteProperty('color', dataDelete.id);
        props.fetchListColor();
        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Color?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete Color: <b>
                        {dataDelete && dataDelete.name ? dataDelete.name : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="dark" onClick={() => { handleSubmitDeleteColor() }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteColor;