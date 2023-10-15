import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProperty } from '../../../../../services/apiService';

const ModalDeleteMaterial = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteMaterial = async (event) => {
        let data = await deleteProperty('material', dataDelete.id);
        props.fetchListMaterial();
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
                    <Modal.Title>Confirm Delete the Material?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete Material: <b>
                        {dataDelete && dataDelete.name ? dataDelete.name : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="dark" onClick={() => { handleSubmitDeleteMaterial() }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteMaterial;