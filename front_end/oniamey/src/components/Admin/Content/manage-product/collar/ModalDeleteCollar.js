import { Modal } from 'antd';
import { deleteProperty } from '../../../../../services/apiService';

const ModalDeleteCollar = (props) => {

    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleSubmitDeleteCollar = async (event) => {
        let data = await deleteProperty('collar', dataDelete.id);
        props.fetchListCollar();
        handleClose();
    };

    return (
        <>
            <Modal title="Xác Nhận Xóa!" open={show} onOk={() => { handleSubmitDeleteCollar() }} onCancel={handleClose}>
                <b>
                    {dataDelete && dataDelete.name ? dataDelete.name : ""}
                </b>
            </Modal>
        </>
    );
}

export default ModalDeleteCollar;