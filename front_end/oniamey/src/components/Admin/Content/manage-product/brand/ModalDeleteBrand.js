import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProperty } from '../../../../../services/apiService';

const ModalDeleteBrand = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteBrand = async (event) => {
        let data = await deleteProperty('brand', dataDelete.id);
        props.fetchListBrand();
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
                    <Modal.Title>Confirm Delete the Brand?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete Brand: <b>
                        {dataDelete && dataDelete.name ? dataDelete.name : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => { handleSubmitDeleteBrand() }}>
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteBrand;