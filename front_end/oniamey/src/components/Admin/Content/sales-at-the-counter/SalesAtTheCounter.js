import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import "./SalesAtTheCounter.scss";
 
import {useRef} from "react";
import * as OrderApi from '../../../../services/OderApi';
import * as OrderDetailApi from '../../../../services/OrderDetailApi';
import DataTable from "react-data-table-component";
import {format} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {AiFillCreditCard, AiOutlineSlack} from "react-icons/ai";
import {Switch} from "antd";
import QrReader from "react-qr-scanner";
import {Modal} from "antd";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {FaPenSquare} from "react-icons/fa";
import {MdDeleteSweep} from "react-icons/md";
 
import { useRef } from "react";
import DataTable from "react-data-table-component";
import { getProductDetailsByCode } from "../../../../../src/services/apiService";
import { getAllProductDetails } from "../../../../../src/services/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AiFillCreditCard, AiOutlineSlack } from "react-icons/ai";
import { Modal, Switch } from "antd";
import QrReader from "react-qr-scanner";
import ListProductDetail from "./ListProductDetail"; 

const SalesAtTheCounter = (props) => {
  const [activeTab, setActiveTab] = useState(1);
 
    //Luật order info
    const [userId,setUserId]=useState(0);
    const [customerId,setCustomerId]=useState(0);
    const [phoneNumber,setPhoneNumber]=useState("");
    const [address,setAddress]=useState("");
    const [userName,setUserName]=useState("");
    const [totalMoney,setTotalMoney]=useState(0);
    const [shipDate,setShipDate]=useState("");
    const [type,setType]= useState(false);
    const [moneyReduced,setMoneyReduced]=useState(0);
    const [note,setNote]=useState("");
    const [moneyShip,setMoneyShip]=useState(0);
    const status= 'PENDING';
    const [voucherId,setVoucherId]=useState(0);
    const [orderDetailData,setOrderDetailData]=useState([]);

    const onChangeType = (checked) => {
        setType(checked);
    };

    //Cường
    const [record, setRecord] = useState([]);

    const [open, setOpen] = useState(false);
    const delay = 100;

    const handleCancelScan = () => {
        stopStreamedVideo(document.querySelector("video"));
        setOpen(false);
    };

    const handleScan = (data) => {
        if(data) {
            console.log(data.text)
            stopStreamedVideo(document.querySelector("video"));
            setOpen(false);
        }

    };

    const stopStreamedVideo = (videoElem) => {
        const stream = videoElem.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        videoElem.srcObject = null;
    };

    const handleError = (err) => {
        console.error(err);
    };

    // const paginationComponentOptions = {
    //     rowsPerPageText: "Số Bản Ghi Một Trang",
    //     rangeSeparatorText: "Trên",
    //     selectAllRowsItem: true,
    //     selectAllRowsItemText: "Tất Cả",
    // };

    const [listProduct,setListProduct]= useState([{
        cover:"",
         name :"Cường ĐB",
         quantity :2,
         sellPrice :2000,
         size:43,
         color :"red"
    }]);


    const columnsSanPham = [
        {
            name: "STT",
            // selector: (row) => promotions.indexOf(row) + 1,
            minWidth: "40px",
            maxWidth: "80px",
            center: "true",
        },
        {
            name: "Sản phẩm",
            // selector: (row) => row.promotionName,
            center: "true",
        },
        {
            name: "Số lượng",
            // selector: (row) => row.promotionCode,
            center: "true",
        },
        {
            name: "Tổng tiền",
            //         selector: (row) => {
            //     const startDate = new Date(row.promotionStartDate);
            //     return format(startDate, "HH:mm:ss dd/MM/yyyy");
            // },
            center: "true",
        },
        {
            name: "Thao tác",
            cell: (row) =>
                <>
                    <Button
                        variant="dark"
                        className="ms-2"
                        // onClick={() => handleDetailPromotion(row.promotionID)}
                    >
                        <FontAwesomeIcon icon={faEye} color="white"/>
                    </Button>
                </>,
            center: "true",
        },
    ] 
  const [record, setRecord] = useState([]);

  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(false);

  const delay = 100; 

  const handleShowListProductDetail = () => {
    setShow(true);
  }

  const handleCancelScan = () => {
    stopStreamedVideo(document.querySelector("video"));
    setOpen(false);
  };

  const handleScan = (data) => {
    if (data) {
      let res = getProductDetailsByCode(data.text);
      res
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      stopStreamedVideo(document.querySelector("video"));
      setOpen(false);
    }
  };

  const stopStreamedVideo = (videoElem) => {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoElem.srcObject = null;
  };

  const handleError = (err) => {
    console.error(err);
  };
 
    const closeTab = (tabId) => {
        const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
        if (tabIndex !== -1) {
            const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
            setTabs(updatedTabs);
            setActiveTab(1);
        }
    };

    const handleTaoHoaDon =async ()=>{
        const handleSubmitCreateOrder = () => {
            Swal.fire({
                title: "Thông báo",
                text: "Tạo hóa đơn?",
                icon: "infor",
                showCancelButton: true,
                confirmButtonColor: "#000",
                cancelButtonColor: "#000",
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    //tạo hóa đơn, lấy ra id hóa đơn
                    const idOrder = await OrderApi.createOrder({
                        userId,
                        customerId,
                        phoneNumber,
                        address,
                        userName,
                        totalMoney,
                        shipDate,
                        type,
                        moneyReduced,
                        note,
                        moneyShip,
                        status,
                        voucherId
                    });
                    //tạo hóa đơn detail
                    const result = await OrderDetailApi.createOrderDetail(orderDetailData);
                    if (result.length === 0){
                        toast.success("Tạo hóa đơn thành công");
                    }else{
                        toast.error("Có lỗi xảy ra");
                    }
                }
            });
        };
        handleSubmitCreateOrder();
    }

    const columnsProductDetail = [
        {
            name: "STT",
            selector: (row) => listProduct.indexOf(row) + 1,
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
            name: "Ngày cập nhật",
            selector: (row) => row.quantity,
            center: "true",
        },
        {
            name: "Ngày cập nhật",
            selector: (row) => row.sellPrice,
            center: "true",
        },{
            name: "Ngày cập nhật",
            selector: (row) => row.size,
            center: "true",
        },{
            name: "Ngày cập nhật",
            selector: (row) => row.color,
            center: "true",
        },{
            name: "Ngày cập nhật",
            selector: (row) => row.sellPrice*row.quantity,
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
        <Container className="sales-at-the-counter-manage">
            <Row className="justify-content-md-center p-3">
                <Col>
                    <h4>Bán Hàng Tại Quầy</h4>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="outline-dark" onClick={addTab}>
                        Thêm hóa đơn
                    </Button>
                </Col>
            </Row>

            <Tabs
                id="uncontrolled-tab-example"
                activeKey={activeTab}
                onSelect={(key) => setActiveTab(key)}
                className="mb-3 mt-3 p-3"
            >
                {tabs.map((tab) => (
                    <Tab
                        eventKey={tab.id}
                        title={(
                            <div>
                                {`Hóa đơn ${tab.id}`}
                                {tab.id !== 1 && (
                                    <IoIosClose onClick={() => closeTab(tab.id)}/>
                                )}
                            </div>
                        )}
                    >
                        <div className={"p-4 m-1"}>
                            <div className={"san-pham"}>
                                <div className={"d-flex justify-content-between p-4"}>
                                    <div>
                                        <Button variant="outline-dark">
                                            Danh Sách
                                        </Button>
                                    </div>
                                    <div className={"d-flex gap-3"}>
                                        <Button variant="outline-dark" onClick={() => setOpen(true)}>
                                            QR Code Sản Phẩm
                                        </Button>
                                        <Button variant="outline-dark">
                                            Thêm Sản Phẩm
                                        </Button>
                                    </div>
                                </div>
                                <div className={"pt-5 pb-lg-5"} >

                                    <DataTable
                                        rounded-3
                                        columns={columnsProductDetail}
                                        data={listProduct}
                                        pagination
                                        paginationComponentOptions={paginationComponentOptions}
                                        highlightOnHover
                                        pointerOnHover
                                        paginationRowsPerPageOptions={[5, 10, 15]}
                                        paginationPerPage={5}
                                        paginationDefaultPage={1}
                                        // onRowClicked={(row) => handleClickTable(row)}
                                    />
                                </div>
                                <hr/>
                                <div className={"d-flex justify-content-end gap-2 align-content-center pe-5"}>
                                    Tổng tiền :
                                    <h5 style={{color: "red"}}>
                                        {} VNĐ
                                    </h5>
                                </div>
                            </div>
 
  const paginationComponentOptions = {
    rowsPerPageText: "Số Bản Ghi Một Trang",
    rangeSeparatorText: "Trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất Cả",
  };

  const noDataComponent = () => {
    return (
      <div className="no-data-component">
        <h5>Không có dữ liệu</h5>
      </div>
    );
  };

  const columnsSanPham = [
    {
      name: "STT",
      // selector: (row) => promotions.indexOf(row) + 1,
      minWidth: "40px",
      maxWidth: "80px",
      center: "true",
    },
    {
      name: "Sản phẩm",
      // selector: (row) => row.promotionName,
      center: "true",
    },
    {
      name: "Số lượng",
      // selector: (row) => row.promotionCode,
      center: "true",
    },
    {
      name: "Tổng tiền",
      //         selector: (row) => {
      //     const startDate = new Date(row.promotionStartDate);
      //     return format(startDate, "HH:mm:ss dd/MM/yyyy");
      // },
      center: "true",
    },
    {
      name: "Thao tác",
      cell: (row) => (
        <>
          <Button
            variant="dark"
            className="ms-2"
            // onClick={() => handleDetailPromotion(row.promotionID)}
          >
            <FontAwesomeIcon icon={faEye} color="white" />
          </Button>
        </>
      ),
      center: "true",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [tabs, setTabs] = useState([
    {
      id: 1,
      content: "Hóa đơn 1",
      customerInfo: {
        hasAccount: false,
        name: "",
        email: "",
        address: {
          street: "",
          ward: "",
          city: "",
          country: "",
          isDefault: false,
        },
        searchInput: "",
      },
    },
  ]);

  const nextTabId = useRef(2);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Gọi API để lấy danh sách tỉnh/thành phố
  useEffect(() => {
    axios.get("https://provinces.open-api.vn/api/p/").then((response) => {
      setProvinces(response.data);
    });
  }, []);

  // // Gọi API để lấy danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
  // const fetchDistricts = (provinceId) => {
  //     axios.get(`https://provinces.open-api.vn/api/p/${provinceId}/d/`).then((response) => {
  //         setDistricts(response.data);
  //     });
  // };
  //
  // // Gọi API để lấy danh sách phường/xã dựa trên quận/huyện đã chọn
  // const fetchWards = (districtId) => {
  //     axios.get(`https://provinces.open-api.vn/api/d/${districtId}/w/`).then((response) => {
  //         setWards(response.data);
  //     });
  // }; 

  const addTab = () => {
    if (tabs.length < 5) {
      const newTab = {
        id: nextTabId.current,
        content: `Hóa đơn ${nextTabId.current}`,
        customerInfo: {
          hasAccount: false,
          name: "",
          email: "",
          address: {
            street: "",
            ward: "",
            city: "",
            country: "",
            isDefault: false,
          },
          searchInput: "",
        },
      };
      setTabs([...tabs, newTab]);
      setActiveTab(newTab.id);
      nextTabId.current++;
    } else {
      alert("Không thể thêm hóa đơn nữa, đã đạt giới hạn 5 hóa đơn.");
    }
  };

  // // Xử lý khi thay đổi trường hasAccount
  // const handleHasAccountChange = (tabId, newHasAccountValue) => {
  //     const updatedTabs = tabs.map((tab) => {
  //         if (tab.id === tabId) {
  //             return { ...tab, customerInfo: { ...tab.customerInfo, hasAccount: newHasAccountValue } };
  //         }
  //         return tab;
  //     });
  //     setTabs(updatedTabs);
  // };
  //
  // const handleIsDefaultChange = (tabId, newIsDefaultValue) => {
  //     const updatedTabs = tabs.map((tab) => {
  //         if (tab.id === tabId) {
  //             return { ...tab, customerInfo: { ...tab.customerInfo, address: { ...tab.customerInfo.address, isDefault: newIsDefaultValue } } };
  //         }
  //         return tab;
  //     });
  //     setTabs(updatedTabs);
  // };
 
                                    </Col>
                                    <Col className={"col-md-6 p-3"}>
                                        <div className={"d-flex gap-2 align-items-center ps-3"}>
                                            <AiOutlineSlack size={32}/>
                                            <h4 className={"mb-0"}>
                                                Thông tin thanh toán
                                            </h4>
                                        </div>
                                        <div className={"d-flex justify-content-between align-items-center pt-5"}>
                                            <div className={"d-flex align-items-center gap-5"}>
                                                <div>
                                                    khách thanh toán
                                                </div>
                                                <Button variant="outline-secondary" className={"d-flex align-items-center px-5 pt-2 pb-2"}>
                                                    <AiFillCreditCard size={16}/>
                                                </Button>
                                            </div>
                                            <div>
                                                <h6 className={"mb-0"}>
                                                    {/*//làm tính tiền đê*/}
                                                    VNĐ
                                                </h6>
                                            </div>
                                        </div>
                                        <div className={"pt-4 d-flex gap-5"}>
                                            <Form.Control
                                                // name="" điền tên Form đê
                                                type="text"
                                                placeholder="Tìm theo tên - mã - giá trị" // điền placehoder đê
                                                // onChange={(e) => onChangeFilters(e)} // chon onchange đê
                                            />
                                            <Button variant={"outline-dark"} className={"w-25"}>
                                                Chọn mã
                                            </Button>
                                        </div>
                                        <div className={"d-flex gap-4 align-items-center pt-4"}>
                                            <div>
                                                Giao hàng:
                                            </div>
                                            <Switch defaultUnChecked onChange={onChangeType}  />
                                        </div>
                                        <div className={"d-flex gap-4 align-items-center justify-content-between pt-4"}>
                                            <div>
                                                Tiền hàng:
                                            </div>
                                            <div>
                                                <h6 className={"pb-0"}>
                                                    VNĐ
                                                </h6>
                                            </div>
                                        </div>
                                        <div className={"d-flex gap-4 align-items-center justify-content-between pt-4"}>
                                            <div>
                                                Giảm giá:
                                            </div>
                                            <div>
                                                <h6 className={"pb-0"}>
                                                    VNĐ
                                                </h6>
                                            </div>
                                        </div>
                                        <div className={"d-flex gap-4 align-items-center justify-content-between pt-4"}>
                                            <div>
                                                Tổng tiền:
                                            </div>
                                            <div>
                                                <h4 className={"pb-0 "}>
                                                    VNĐ
                                                </h4>
                                            </div>
                                        </div>
                                        <div className={"d-flex justify-content-end pt-5 pe-3"}>
                                            <Button variant={"outline-dark"} onClick={handleTaoHoaDon}>
                                                Tạo hóa đơn
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Tab>
                ))}
            </Tabs>
            <Modal
                title="Quét Mã QR"
                open={open}
                onCancel={handleCancelScan}
                onOk={handleCancelScan}
            >
                <div className="qrcode-container">
                    {open ? (
                        <QrReader delay={delay} onError={handleError} onScan={handleScan} />
                    ) : null}
                </div>
            </Modal>
        </Container>

    ); 
  const closeTab = (tabId) => {
    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    if (tabIndex !== -1) {
      const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
      setTabs(updatedTabs);
      setActiveTab(1);
    }
  };

  // prodcut

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Thực hiện yêu cầu mạng tới backend ở đây
    axios
      .get("URL_BACKEND/products") // Điều chỉnh URL tới API của bạn
      .then((response) => {
        setProducts(response.data); // Cập nhật mảng products với dữ liệu từ backend
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu từ backend:", error);
      });
  }, []); // [] để đảm bảo chỉ chạy một lần khi thành phần được tạo

  // search product
  // const handleSearchTextChange = (e) => {
  //     setSearchText(e.target.value);
  // };
  //
  // Lọc danh sách sản phẩm dựa trên giá trị của ô tìm kiếm
  // const filteredProducts = products.filter((product) => {
  //     return product.name.toLowerCase().includes(searchText.toLowerCase());
  // });

  return (
    <Container className="sales-at-the-counter-manage">
      <Row className="justify-content-md-center p-3">
        <Col>
          <h4>Bán Hàng Tại Quầy</h4>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="outline-dark" onClick={addTab}>
            Thêm hóa đơn
          </Button>
        </Col>
      </Row>

      <Tabs
        id="uncontrolled-tab-example"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
        className="mb-3 mt-3 p-3"
      >
        {tabs.map((tab) => (
          <Tab
            eventKey={tab.id}
            title={
              <div>
                {`Hóa đơn ${tab.id}`}
                {tab.id !== 1 && (
                  <IoIosClose onClick={() => closeTab(tab.id)} />
                )}
              </div>
            }
          >
            <div className={"p-4 m-1"}>
              <div className={"san-pham"}>
                <div className={"d-flex justify-content-between p-4"}>
                  <div>
                    <Button variant="outline-dark">Danh Sách</Button>
                  </div>
                  <div className={"d-flex gap-3"}>
                    <Button
                      variant="outline-dark"
                      onClick={() => setOpen(true)}
                    >
                      QR Code Sản Phẩm
                    </Button>
                    <Button variant="outline-dark" onClick={() => setShow(true)}>Thêm Sản Phẩm</Button>
                  </div>
                </div>
                <div className={"pt-5 pb-lg-5"}>
                  <DataTable
                    columns={columnsSanPham}
                    // data={records}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
                    pointerOnHover
                    paginationRowsPerPageOptions={[5, 10, 20]}
                    // onRowClicked={(row) => handleDetailPromotion(row.promotionID)}
                    noDataComponent={noDataComponent()}
                  />
                </div>
                <hr />
                <div
                  className={
                    "d-flex justify-content-end gap-2 align-content-center pe-5"
                  }
                >
                  Tổng tiền :<h5 style={{ color: "red" }}>{} VNĐ</h5>
                </div>
              </div>

              <div className={"tai-khoan pt-5"}>
                <div className={"d-flex justify-content-between pt-5 p-4 pb-0"}>
                  <div>
                    <h3>Tài khoản</h3>
                  </div>
                  <div>
                    <Button variant="outline-dark">Chọn tài khoản</Button>
                  </div>
                </div>
                <hr />
                {/*// toán tử 3 ngôi*/}
                {true ? (
                  <div className={"d-flex align-items-center ps-5"}>
                    <div>Tên khách hàng:</div>
                    <div
                      className={
                        "pt-1 pb-1 pe-2 ps-2 ms-3 text-bg-secondary rounded-3"
                      }
                    >
                      khách lẻ
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className={"khach-hang pt-5"}>
                <div className={"d-flex justify-content-between pt-5 p-4 pb-0"}>
                  <div>
                    <h3>Khách hàng</h3>
                  </div>
                  {/*// toán tử 3 ngôi*/}
                  {/*<div>*/}
                  {/*    <Button variant="outline-dark">*/}
                  {/*        Chọn địa chỉ*/}
                  {/*    </Button>*/}
                  {/*</div>*/}
                </div>
                <hr />
                <Row className={" pb-5 mb-5"}>
                  <Col className={"col-md-6 p-3 bg-info"}></Col>
                  <Col className={"col-md-6 p-3"}>
                    <div className={"d-flex gap-2 align-items-center ps-3"}>
                      <AiOutlineSlack size={32} />
                      <h4 className={"mb-0"}>Thông tin thanh toán</h4>
                    </div>
                    <div
                      className={
                        "d-flex justify-content-between align-items-center pt-5"
                      }
                    >
                      <div className={"d-flex align-items-center gap-5"}>
                        <div>khách thanh toán</div>
                        <Button
                          variant="outline-secondary"
                          className={"d-flex align-items-center px-5 pt-2 pb-2"}
                        >
                          <AiFillCreditCard size={16} />
                        </Button>
                      </div>
                      <div>
                        <h6 className={"mb-0"}>
                          {/*//làm tính tiền đê*/}
                          VNĐ
                        </h6>
                      </div>
                    </div>
                    <div className={"pt-4 d-flex gap-5"}>
                      <Form.Control
                        // name="" điền tên Form đê
                        type="text"
                        placeholder="Tìm theo tên - mã - giá trị" // điền placehoder đê
                        // onChange={(e) => onChangeFilters(e)} // chon onchange đê
                      />
                      <Button variant={"outline-dark"} className={"w-25"}>
                        Chọn mã
                      </Button>
                    </div>
                    <div className={"d-flex gap-4 align-items-center pt-4"}>
                      <div>Giao hàng:</div>
                      <Switch defaultUnChecked />
                    </div>
                    <div
                      className={
                        "d-flex gap-4 align-items-center justify-content-between pt-4"
                      }
                    >
                      <div>Tiền hàng:</div>
                      <div>
                        <h6 className={"pb-0"}>VNĐ</h6>
                      </div>
                    </div>
                    <div
                      className={
                        "d-flex gap-4 align-items-center justify-content-between pt-4"
                      }
                    >
                      <div>Giảm giá:</div>
                      <div>
                        <h6 className={"pb-0"}>VNĐ</h6>
                      </div>
                    </div>
                    <div
                      className={
                        "d-flex gap-4 align-items-center justify-content-between pt-4"
                      }
                    >
                      <div>Tổng tiền:</div>
                      <div>
                        <h4 className={"pb-0 "}>VNĐ</h4>
                      </div>
                    </div>
                    <div className={"d-flex justify-content-end pt-5 pe-3"}>
                      <Button variant={"outline-dark"}>Xác nhận hóa đơn</Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Tab>
        ))}
      </Tabs>
      <Modal
        title="Quét Mã QR"
        open={open}
        onCancel={handleCancelScan}
        onOk={handleCancelScan}
      >
        <div className="qrcode-container">
          {open ? (
            <QrReader delay={delay} onError={handleError} onScan={handleScan} />
          ) : null}
        </div>
      </Modal>
      <ListProductDetail
        show={show}
        setShow={setShow}
      />
    </Container>
  ); 
};

export default SalesAtTheCounter;
