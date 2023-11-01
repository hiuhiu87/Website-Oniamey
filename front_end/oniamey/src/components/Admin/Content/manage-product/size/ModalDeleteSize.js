import { Modal } from 'antd';
import { deleteProperty } from '../../../../../services/apiService';

const ModalDeleteSize = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteSize = async (event) => {
        let data = await deleteProperty('size', dataDelete.id);
        props.fetchListSize();
        handleClose();
    };

    return (
        <>
            <Modal title="Xác Nhận Xóa!" open={show} onOk={() => { handleSubmitDeleteSize() }} onCancel={handleClose}>
                <b>
                    {dataDelete && dataDelete.name ? dataDelete.name : ""}
                </b>
            </Modal>
        </>
    );
}

export default ModalDeleteSize;