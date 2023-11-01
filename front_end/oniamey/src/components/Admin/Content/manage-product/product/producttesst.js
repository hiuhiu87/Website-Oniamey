<div className='manage-product-search'>
    <div className='search-product-title'>
        <div className="title">
            <FaMousePointer size={26} /> Chọn Thuộc Tính
        </div>
    </div>
    <div className='main-search row'>
        <div className='col-5 mb-4'>
            <div class="col-md">
                <div className='d-flex align-items-center'>
                    <div class="form-floating">
                        <select className="form-select" value={productId} onChange={handleProductChange} >
                            <option value="">Chọn</option>
                            {listProduct.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.productName}
                                </option>
                            ))}
                        </select>
                        <label for="floatingSelectGrid" className='text-floating'>Sản phẩm</label>
                    </div>
                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateProduct(true)}><MdLibraryAdd /></button>
                </div>
            </div>
        </div>

        <div className='row d-flex justify-content-center align-items-center mb-3'>
            <div className="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="form-floating">
                        <select className="form-select" value={brandId} onChange={handleBrandChange} style={{ minWidth: '200px' }}>
                            <option value="">Chọn</option>
                            {listBrand.map(brand => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelectGrid" className='text-floating'>Thương hiệu</label>
                    </div>
                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateBrand(true)}><MdLibraryAdd /></button>
                </div>
            </div>
            <div class="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="form-floating">
                        <select className="form-select" value={categoryId} onChange={handleCategoryChange} style={{ minWidth: '200px' }}>
                            <option value="">Chọn</option>
                            {listCategory.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelectGrid" className='text-floating'>Danh mục</label>
                    </div>
                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateCategory(true)}><MdLibraryAdd /></button>
                </div>
            </div>
            <div class="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="form-floating">
                        <select className="form-select" value={materialId} onChange={handleMaterialChange} style={{ minWidth: '200px' }}>
                            <option value="">Chọn</option>
                            {listMaterial.map(material => (
                                <option key={material.id} value={material.id}>
                                    {material.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelectGrid" className='text-floating'>Chất liệu</label>
                    </div>
                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateMaterial(true)}><MdLibraryAdd /></button>
                </div>
            </div>
            <div class="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="form-floating">
                        <select className="form-select" value={collarId} onChange={handleCollarChange} style={{ minWidth: '200px' }}>
                            <option value="">Chọn</option>
                            {listCollar.map(collar => (
                                <option key={collar.id} value={collar.id}>
                                    {collar.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelectGrid" className='text-floating'>Cổ áo</label>
                    </div>
                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateCollar(true)}><MdLibraryAdd /></button>
                </div>
            </div>
            <div class="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className="form-floating">
                        <select className="form-select" value={sleeveLengthId} onChange={handleSleeveLengthChange} style={{ minWidth: '200px' }}>
                            <option value="">Chọn</option>
                            {listSleeveLength.map(sleeveLength => (
                                <option key={sleeveLength.id} value={sleeveLength.id}>
                                    {sleeveLength.name}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingSelectGrid" className='text-floating'>Chiều dài tay</label>
                    </div>
                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateSleeveLength(true)}><MdLibraryAdd /></button>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center align-items-center' >
            <Button type="dark" onClick={showModal} className='mb-2 mt-2'>
                Màu sắc & Kích cỡ
            </Button>

            <Modal maskClosable={false} open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className='mb-3 mt-3'>
                    <h5>Màu sắc:</h5>
                    {renderColorButtons()}
                </div>
                <div>
                    <h5>Kích cỡ:</h5>
                    {renderSizeButtons()}
                </div>
            </Modal>
        </div>
        <Row>
            <Col className='d-flex justify-content-center align-items-center flex-wrap'>
                {selectedColors.map((colorId, index) => (
                    <Button
                        key={`color-${index}`}
                        className="selected-button"
                        style={{
                            marginLeft: '8px', width: '5%'
                        }}
                        onClick={() => handleColorChange(colorId)}
                    >
                        {listColor.find(color => color.id === colorId).name}
                    </Button>
                ))}
                {selectedSizes.map((sizeId, index) => (
                    <Button
                        key={`size-${index}`}
                        className="selected-button"
                        style={{ marginLeft: '8px', width: '5%' }}
                        onClick={() => handleSizeChange(sizeId)}
                    >
                        {listSize.find(size => size.id === sizeId).name}
                    </Button>
                ))}</Col>
        </Row>
    </div>
</div>