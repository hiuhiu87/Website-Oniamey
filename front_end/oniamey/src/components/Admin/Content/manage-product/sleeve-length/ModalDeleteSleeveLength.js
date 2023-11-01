import { Modal } from 'antd';
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
            <Modal title="Xác Nhận Xóa!" open={show} onOk={() => { handleSubmitDeleteSleeveLength() }} onCancel={handleClose}>
                <b>
                    {dataDelete && dataDelete.name ? dataDelete.name : ""}
                </b>
            </Modal>
        </>
    );
}

export default ModalDeleteSleeveLength;