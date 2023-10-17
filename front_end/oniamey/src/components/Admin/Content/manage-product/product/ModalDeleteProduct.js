import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProduct } from '../../../../../services/apiService';

const ModalDeleteProduct = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteProduct = async (event) => {
        let data = await deleteProduct(dataDelete.id);
        props.fetchListProduct();
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
                    <Modal.Title>Confirm Delete the Product?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete Product: <b>
                        {dataDelete && dataDelete.name ? dataDelete.name : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="dark" onClick={() => { handleSubmitDeleteProduct() }}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteProduct;