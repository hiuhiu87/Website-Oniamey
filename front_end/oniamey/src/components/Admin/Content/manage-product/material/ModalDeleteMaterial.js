import { Modal } from 'antd';
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
            <Modal title="Xác Nhận Xóa!" open={show} onOk={() => { handleSubmitDeleteMaterial() }} onCancel={handleClose}>
                <b>
                    {dataDelete && dataDelete.name ? dataDelete.name : ""}
                </b>
            </Modal>
        </>
    );
}

export default ModalDeleteMaterial;