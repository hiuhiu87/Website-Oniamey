import { React, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  FaFilter,
  FaThList,
  FaProductHunt,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { getAllProductDetailsByProductId } from "../../../../../services/apiService";
import { getAllProperties } from "../../../../../services/apiService";
import ModalDetailProductDetail from "./ModalDetailProductDetail.js";
import _ from "lodash";
import { useParams, useLocation } from "react-router-dom";
import DataTable from "react-data-table-component";
import {Col, Form, Row} from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {Slider} from "antd";

const UpdateProduct = (props) => {
  const [brandId, setBrandId] = useState("");
  const [listBrand, setListBrand] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [listMaterial, setListMaterial] = useState([]);
  const [collarId, setCollarId] = useState("");
  const [listCollar, setListCollar] = useState([]);
  const [sleeveLengthId, setSleeveLengthId] = useState("");
  const [listSleeveLength, setListSleeveLength] = useState([]);
  const [sizeId, setSizeId] = useState("");
  const [listSize, setListSize] = useState([]);
  const [colorId, setColorId] = useState("");
  const [listColor, setListColor] = useState([]);

  const [showModalDetailProductDetail, setShowModalDetailProductDetail] =
    useState(false);

  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    fetchListBrand();
    fetchListCategory();
    fetchListCollar();
    fetchListSleeveLength();
    fetchListMaterial();
    fetchListSize();
    fetchListColor();
  }, []);

  const fetchListBrand = async () => {
    let response = await getAllProperties("brand");
    setListBrand(response.data);
    setBrandId(response.data[0].id);
  };

  const fetchListCategory = async () => {
    let response = await getAllProperties("category");
    setListCategory(response.data);
    setCategoryId(response.data[0].id);
  };

  const fetchListMaterial = async () => {
    let response = await getAllProperties("material");
    setListMaterial(response.data);
    setMaterialId(response.data[0].id);
  };

  const fetchListCollar = async () => {
    let response = await getAllProperties("collar");
    setListCollar(response.data);
    setCollarId(response.data[0].id);
  };

  const fetchListSleeveLength = async () => {
    let response = await getAllProperties("sleeve-length");
    setListSleeveLength(response.data);
    setSleeveLengthId(response.data[0].id);
  };

  const fetchListColor = async () => {
    let response = await getAllProperties("color");
    setListColor(response.data);
    setColorId(response.data[0].id);
  };

  const fetchListSize = async () => {
    let response = await getAllProperties("size");
    setListSize(response.data);
    setSizeId(response.data[0].id);
  };

  const resetDataDetail = () => {
    setDataDetail({});
  };

  const handleClickBtnDetail = (productDetail) => {
    setShowModalDetailProductDetail(true);
    setDataDetail(productDetail);
  };

  const { productId } = useParams();

  const location = useLocation();
  const productName = location.state.productName;

  const [listProductDetail, setListProductDetail] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const handleSelectAll = () => {
    const newSelectedItems = {};
    listProductDetail.forEach((item, index) => {
      newSelectedItems[index] = !selectAll;
    });
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (index) => {
    const newSelectedItems = { ...selectedItems };
    newSelectedItems[index] = !selectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  useEffect(() => {
    fetchListProductDetailByProductId();
  }, [productId]);

  const fetchListProductDetailByProductId = async () => {
    let response = await getAllProductDetailsByProductId(productId);
    setListProductDetail(response.data);
  };

  console.log('size: ', sizeId)

  const columnsProductDetail = [
    {
      name: "STT",
      selector: (row) => listProductDetail.indexOf(row) + 1,
      minWidth: "40px",
      maxWidth: "80px",
      center: "true",
    },
    {
      name: "Ảnh",
      cell: (row) => (
        <div
          className="text-center image-product-detail"
          style={{ verticalAlign: "middle", width: "100px" }}
        >
          <img
            style={{ width: "100%", padding: "5px" }}
            src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${row.cover}`}
          />
        </div>
      ),
      center: "true",
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.name,
      center: "true",
    },
    {
      name: "Số lượng",
      selector: (row) => row.quantity,
      center: "true",
    },
    {
      name: "Giá bán",
      selector: (row) => row.price,
      center: "true",
    },
    {
      name: "Kích cỡ",
      selector: (row) => row.size,
      center: "true",
    },
    {
      name: "Màu",
      selector: (row) => row.color,
      center: "true",
    },
    {
      name: "Trạng thái",
      selector: (row) =>
        row.deleted === false ? "Hoạt động" : "Ngừng hoạt động",
      center: "true",
    },
    {
      name: "Hành động",
      cell: (row) => (
        <>
          <button
            className="btn-update btn btn-dark mx-3 short-button"
            onClick={() => handleClickBtnDetail(row)}
          >
            <AiFillEye color="#ffffff" />
          </button>
        </>
      ),
      center: "true",
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Số Bản Ghi Một Trang",
    rangeSeparatorText: "Trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất Cả",
  };

  return (
    <>
      <div class="manage-product-update-container">
        <div className="manage-product-detail-update-title">
          <div className="title">
            <FaProductHunt size={32} /> Sản phẩm: {productName}
          </div>
        </div>
        <div className="manage-product-detail-update-search">
          <div className="search-product-detail-update-title">
            <div className="title">
              <FaFilter size={26} /> Bộ Lọc
            </div>
          </div>
          <Form>
            <Row className="mb-3 justify-content-md-center ">
              <Col lg="5">
                <FloatingLabel
                    controlId="floatingInput"
                    label="Tìm kiếm"
                >
                  <Form.Control type="text" placeholder="name@example.com" />
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3 justify-content-md-center ">
              <Col lg="2">
                <FloatingLabel controlId="floatingSelect" label="Thương hiệu">
                  <Form.Select aria-label="Floating label select example">
                    <option>Tất cả</option>
                    {/* {listBrand.map(brand => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))} */}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg="2">
                <FloatingLabel controlId="floatingSelect" label="Danh mục">
                  <Form.Select aria-label="Floating label select example">
                    <option value="">Tất cả</option>
                    {/* {listCategory.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))} */}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg="2">
                <FloatingLabel controlId="floatingSelect" label="Chất liệu">
                  <Form.Select aria-label="Floating label select example">
                    <option value="">Tất cả</option>
                    {/* {listMaterial.map(material => (
                                            <option key={material.id} value={material.id}>
                                                {material.name}
                                            </option>
                                        ))} */}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg="2">
                <FloatingLabel controlId="floatingSelect" label="Cổ áo">
                  <Form.Select aria-label="Floating label select example">
                    <option value="">Tất cả</option>
                    {/* {listCollar.map(collar => (
                                            <option key={collar.id} value={collar.id}>
                                                {collar.name}
                                            </option>
                                        ))} */}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="mb-3 justify-content-md-center ">
              <Col lg="2">
                <FloatingLabel controlId="floatingSelect" label="Chiều dài tay">
                  <Form.Select aria-label="Floating label select example">
                    <option value="">Tất cả</option>
                    <option value="">Tất cả</option>
                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg="2">
                <FloatingLabel controlId="floatingSelect" label="Màu sắc">
                  <Form.Select aria-label="Floating label select example">
                    <option value="">Tất cả</option>
                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg="2">
                <FloatingLabel controlId="floatingSelect" label="Kích cỡ">
                  <Form.Select aria-label="Floating label select example">
                    <option value="">Tất cả</option>
                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg="2" className="mt-1">
                Khoảng giá
                <Slider
                    range
                    step={1}
                    defaultValue={[0, 50]}
                />
              </Col>
              <Col lg="2" className="mt-1">
                Số lượng
                <Slider defaultValue={0} />
              </Col>
            </Row>
          </Form>
        </div>
        <div className="manage-product-detail-update-table">
          <div className="list-product-detail-update-title">
                  <div className="title">
                      <FaThList size={26} /> Danh Sách Sản Phẩm Chi Tiết
                  </div>
                  <button type="button" class="btn btn-dark">
                      <MdLibraryAdd/> Cập nhật
                  </button>
          </div>
          <DataTable
            rounded-3
            columns={columnsProductDetail}
            data={listProductDetail}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            pointerOnHover
            paginationRowsPerPageOptions={[5, 10, 15]}
            // onRowClicked={(row) => handleClickTable(row)}
          />
        </div>
      </div>
      <ModalDetailProductDetail
        show={showModalDetailProductDetail}
        setShow={setShowModalDetailProductDetail}
        productName={productName}
        productId={productId}
        brandId={brandId}
        setBrandId={setBrandId}
        listBrand={listBrand}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        listCategory={listCategory}
        materialId={materialId}
        setMaterialId={setMaterialId}
        listMaterial={listMaterial}
        collarId={collarId}
        setCollarId={setCollarId}
        listCollar={listCollar}
        sleeveLengthId={sleeveLengthId}
        setSleeveLengthId={setSleeveLengthId}
        listSleeveLength={listSleeveLength}
        sizeId={sizeId}
        setSizeId={setSizeId}
        listSize={listSize}
        colorId={colorId}
        setColorId={setColorId}
        listColor={listColor}
        fetchListProductDetailByProductId={fetchListProductDetailByProductId}
        dataDetail={dataDetail}
        resetDataDetail={resetDataDetail}
      />
    </>
  );
};

export default UpdateProduct;