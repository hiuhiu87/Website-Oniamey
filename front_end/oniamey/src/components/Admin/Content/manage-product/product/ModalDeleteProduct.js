import { Modal } from 'antd';
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
            <Modal title="Xác Nhận Xóa!" open={show} onOk={() => { handleSubmitDeleteProduct() }} onCancel={handleClose}>
                <b>
                    {dataDelete && dataDelete.productName ? dataDelete.productName : ""}
                </b>
            </Modal>
        </>
    );
}

export default ModalDeleteProduct;