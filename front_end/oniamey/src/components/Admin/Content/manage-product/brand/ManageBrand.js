import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                consectetur ac, vestibulum at eros.
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onHide}>Close</Button>
                <Button variant='primary' onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

function App() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

const ManageBrand = (props) => {
    return (
        <div className="manage-brand-container">
            <div className="title">
                Manage Brand
            </div>
            <div className="brand-content">
                <div>
                    <button>Add New Brand</button>
                </div>
                <div>
                    Table Brand
                    <App />
                </div>
            </div>
        </div>
    );
}

export default ManageBrand;
