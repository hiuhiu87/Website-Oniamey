import { Modal } from 'antd';
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
            <Modal title="Xác Nhận Xóa!" open={show} onOk={() => { handleSubmitDeleteBrand() }} onCancel={handleClose}>
                Xóa Thương Hiệu: <b>
                    {dataDelete && dataDelete.name ? dataDelete.name : ""}
                </b>
            </Modal>
        </>
    );
}

export default ModalDeleteBrand;