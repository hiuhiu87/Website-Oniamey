import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProperty } from '../../../../../services/apiService';

const ModalDeleteSleeveLength = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteSleeveLength = async (event) => {
        let data = await deleteProperty('sleeve-length', dataDelete.id);
        props.fetchListSleeveLength();
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
                    <Modal.Title>Confirm Delete the Sleeve Length?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete Sleeve Length: <b>
                        {dataDelete && dataDelete.name ? dataDelete.name : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="dark" onClick={() => { handleSubmitDeleteSleeveLength() }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteSleeveLength;