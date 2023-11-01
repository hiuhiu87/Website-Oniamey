const [editedRow, setEditedRow] = useState(null);

const handleEditClick = (rowIndex) => {
    // Khi bạn click để chỉnh sửa, đặt chỉnh sửa cho dòng được click
    setEditedRow(rowIndex);
};

const handleSaveClick = (rowIndex) => {
    // Khi bạn click để lưu, hãy đặt chỉnh sửa thành null để dừng việc chỉnh sửa
    setEditedRow(null);
    // Lưu giá trị thay đổi vào cơ sở dữ liệu ở đây (hoặc bất kỳ hành động nào bạn cần thực hiện)
};




<table className="table">
    <thead style={{ backgroundColor: "black" }}>
        <tr>
            <th scope="col" className='px-1 text-center'>#</th>
            <th scope="col" className='px-5 text-center'>Sản phẩm</th>
            <th scope="col" className='px-2 text-center'>Số lượng</th>
            <th scope="col" className='px-2 text-center'>Giá bán</th>
            <th scope="col" className='px-2 text-center'>Kích cỡ</th>
            <th scope="col" className='px-2 text-center'>Màu sắc</th>
            <th scope="col" className='px-2 text-center'>Hành động</th>
            <th scope="col" className='px-5 text-center'>Ảnh</th>
        </tr>
    </thead>
    <tbody>
        {productDetails.map((item, index) => (
            <tr key={`table-material-${item.id}`} className="room">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{item.name}</td>
                <td className="text-center">
                    {editedRow === index ? (
                        <input type="number" defaultValue={item.quantity} />
                    ) : (
                        <span onDoubleClick={() => handleEditClick(index)}>{item.quantity}</span>
                    )}
                </td>
                <td className="text-center">
                    {editedRow === index ? (
                        <input type="number" defaultValue={item.price} />
                    ) : (
                        <span onDoubleClick={() => handleEditClick(index)}>{item.price}</span>
                    )}
                </td>
                <td className="text-center">{item.sizeId}</td>
                <td className="text-center">{item.colorId}</td>
                <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                        {editedRow === index ? (
                            <button onClick={() => handleSaveClick(index)}>Lưu</button>
                        ) : (
                            <button className="btn-delete btn btn-dark short-button" style={{ width: '25%' }}>
                                Xóa
                            </button>
                        )}
                    </div>
                </td>
                <td className="text-center">
                    <img src="abc.png" />
                </td>
            </tr>
        ))}
        {
            listProduct && listProduct.length === 0 &&
            <tr>
                <td colSpan={7} className='text-center'>
                    Không có dữ liệu!
                </td>
            </tr>
        }
    </tbody >
</table >
















