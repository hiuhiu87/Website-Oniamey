import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, FormControl, InputGroup, Row, Tab, Table, Tabs } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import axios from "axios"; // Import Axios
import "./SalesAtTheCounter.scss";
import { useRef } from "react";

const SalesAtTheCounter = (props) => {
    const [activeTab, setActiveTab] = useState(1);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // State để lưu phương thức thanh toán
    const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState(''); // State để lưu trạng thái hóa đơn

    const [searchText, setSearchText] = useState('');
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

    // Gọi API để lấy danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
    const fetchDistricts = (provinceId) => {
        axios.get(`https://provinces.open-api.vn/api/p/${provinceId}/d/`).then((response) => {
            setDistricts(response.data);
        });
    };

    // Gọi API để lấy danh sách phường/xã dựa trên quận/huyện đã chọn
    const fetchWards = (districtId) => {
        axios.get(`https://provinces.open-api.vn/api/d/${districtId}/w/`).then((response) => {
            setWards(response.data);
        });
    };

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

    // Xử lý khi thay đổi trường hasAccount
    const handleHasAccountChange = (tabId, newHasAccountValue) => {
        const updatedTabs = tabs.map((tab) => {
            if (tab.id === tabId) {
                return { ...tab, customerInfo: { ...tab.customerInfo, hasAccount: newHasAccountValue } };
            }
            return tab;
        });
        setTabs(updatedTabs);
    };

    const handleIsDefaultChange = (tabId, newIsDefaultValue) => {
        const updatedTabs = tabs.map((tab) => {
            if (tab.id === tabId) {
                return { ...tab, customerInfo: { ...tab.customerInfo, address: { ...tab.customerInfo.address, isDefault: newIsDefaultValue } } };
            }
            return tab;
        });
        setTabs(updatedTabs);
    };

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
        axios.get('URL_BACKEND/products') // Điều chỉnh URL tới API của bạn
            .then(response => {
                setProducts(response.data); // Cập nhật mảng products với dữ liệu từ backend
            })
            .catch(error => {
                console.error('Lỗi khi lấy dữ liệu từ backend:', error);
            });
    }, []); // [] để đảm bảo chỉ chạy một lần khi thành phần được tạo
    // search product
    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    // Lọc danh sách sản phẩm dựa trên giá trị của ô tìm kiếm
    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <Container>
            <Row className="justify-content-md-center " >
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
                className="mb-3 mt-3"
            >
                {tabs.map((tab) => (
                    <Tab
                        eventKey={tab.id}
                        title={(
                            <div>
                                {`Hóa đơn ${tab.id}`}
                                {tab.id !== 1 && (
                                    <IoIosClose onClick={() => closeTab(tab.id)} />
                                )}
                            </div>
                        )}
                    >
                        <Row>
                            <Col>
                                <Form className="padding-all">
                                    <h5 className="text-center mb-4">
                                        Thông tin khách hàng
                                    </h5>
                                    <Form.Group>
                                        <Form.Check
                                            type="switch"
                                            id={`hasAccountSwitch-${tab.id}`}
                                            label="Khách hàng có tài khoản?"
                                            checked={tab.customerInfo.hasAccount}
                                            onChange={(e) => handleHasAccountChange(tab.id, e.target.checked)}
                                        />
                                    </Form.Group>
                                    {tab.customerInfo.hasAccount ? (
                                        <>
                                            <Row className="row_form mt-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Người Bán</Form.Label>
                                                        <Form.Control
                                                            disabled
                                                            type="text"
                                                            value={tab.customerInfo.name}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.name = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        />
                                                    </Form.Group>

                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Số điện thoại</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={tab.customerInfo.email}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.email = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="row_form mt-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Quốc Gia</Form.Label>
                                                        <Form.Control
                                                            disabled
                                                            as="select"
                                                        >
                                                            <option value="">Việt Nam</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className="col_form_address mt-3">
                                                        <Form.Label>Tỉnh/Thành phố</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={tab.customerInfo.address.city}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.address.city = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        >
                                                            <option value="">Chọn tỉnh/thành phố</option>
                                                            {provinces.map((province) => (
                                                                <option key={province.code} value={province.name}>
                                                                    {province.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col >
                                                    <Form.Group>
                                                        <Form.Label>Quận/Huyện</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={tab.customerInfo.address.district}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.address.district = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        >
                                                            <option value="">Chọn quận/huyện</option>
                                                            {districts.map((district) => (
                                                                <option key={district.code} value={district.name}>
                                                                    {district.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className="col_form_address mt-3">
                                                        <Form.Label>Phường/Xã</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={tab.customerInfo.address.ward}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.address.ward = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        >
                                                            <option value="">Chọn phường/xã</option>
                                                            {wards.map((ward) => (
                                                                <option key={ward.code} value={ward.name}>
                                                                    {ward.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Form.Group className="mt-3">
                                                    <Form.Label>Địa chỉ chi tiết</Form.Label>
                                                    <Form.Control
                                                        as="textarea" // Sử dụng Textarea
                                                        rows={3} // Số dòng trong Textarea
                                                        placeholder="Địa chỉ chi tiết" // Ghi chú cho Textarea
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Tìm kiếm voucher</Form.Label>
                                                        <Form.Control type="text" placeholder="Nhập tên voucher" />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Tổng tiền sản phẩm</Form.Label>
                                                        <Form.Control type="text" value="500,000 VND" readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Phương thức thanh toán</Form.Label>
                                                        <Form.Control as="select" value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                                                            <option value="">Chọn phương thức thanh toán</option>
                                                            <option value="cash">Tiền mặt</option>
                                                            <option value="creditCard">Thẻ tín dụng</option>
                                                            <option value="paypal">PayPal</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Trạng thái hóa đơn</Form.Label>
                                                        <Form.Control as="select" value={selectedInvoiceStatus} onChange={(e) => setSelectedInvoiceStatus(e.target.value)}>
                                                            <option value="">Chọn trạng thái hóa đơn</option>
                                                            <option value="pending">Chờ xử lý</option>
                                                            <option value="processed">Đã xử lý</option>
                                                            <option value="completed">Hoàn thành</option>
                                                            <option value="cancelled">Hủy</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Form.Group className="mt-3">
                                                    <Form.Label>Ghi chú</Form.Label>
                                                    <Form.Control
                                                        as="textarea" // Sử dụng Textarea
                                                        rows={3} // Số dòng trong Textarea
                                                        placeholder="Ghi chú chi tiết" // Ghi chú cho Textarea
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Col className="d-flex justify-content-center mt-4">
                                                    <Button variant="outline-dark" onClick={addTab}>
                                                        Tạo hóa đơn
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    ) : (
                                        <>
                                            <Form.Group className="mt-3">
                                                <Form.Label>Tìm Kiếm</Form.Label>
                                                <Form.Control

                                                    type="text"
                                                    value={tab.customerInfo.name}
                                                    onChange={(e) => {
                                                        const updatedTab = { ...tab };
                                                        updatedTab.customerInfo.name = e.target.value;
                                                        setTabs((prevTabs) => {
                                                            const updatedTabs = [...prevTabs];
                                                            updatedTabs[tab.id - 1] = updatedTab;
                                                            return updatedTabs;
                                                        });
                                                    }}
                                                />
                                            </Form.Group>

                                            <Row className="row_form mt-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Người Bán</Form.Label>
                                                        <Form.Control
                                                            disabled
                                                            type="text"
                                                            value={tab.customerInfo.name}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.name = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        />
                                                    </Form.Group>

                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Số điện thoại</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            value={tab.customerInfo.email}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.email = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="row_form mt-3">
                                                <Col>
                                                    <Form.Group>

                                                        <Form.Label>Quốc Gia</Form.Label>
                                                        <Form.Control
                                                            disabled
                                                            as="select"
                                                        >
                                                            <option value="">Việt Nam</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className="col_form_address mt-3">
                                                        <Form.Label>Tỉnh/Thành phố</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={tab.customerInfo.address.city}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.address.city = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        >
                                                            <option value="">Chọn tỉnh/thành phố</option>
                                                            {provinces.map((province) => (
                                                                <option key={province.code} value={province.name}>
                                                                    {province.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Quận/Huyện</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={tab.customerInfo.address.district}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.address.district = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        >
                                                            <option value="">Chọn quận/huyện</option>
                                                            {districts.map((district) => (
                                                                <option key={district.code} value={district.name}>
                                                                    {district.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className="col_form_address mt-3">
                                                        <Form.Label>Phường/Xã</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={tab.customerInfo.address.ward}
                                                            onChange={(e) => {
                                                                const updatedTab = { ...tab };
                                                                updatedTab.customerInfo.address.ward = e.target.value;
                                                                setTabs((prevTabs) => {
                                                                    const updatedTabs = [...prevTabs];
                                                                    updatedTabs[tab.id - 1] = updatedTab;
                                                                    return updatedTabs;
                                                                });
                                                            }}
                                                        >
                                                            <option value="">Chọn phường/xã</option>
                                                            {wards.map((ward) => (
                                                                <option key={ward.code} value={ward.name}>
                                                                    {ward.name}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Form.Group className="mt-3">
                                                    <Form.Label>Địa chỉ chi tiết</Form.Label>
                                                    <Form.Control
                                                        as="textarea" // Sử dụng Textarea
                                                        rows={3} // Số dòng trong Textarea
                                                        placeholder="Địa chỉ chi tiết" // Ghi chú cho Textarea
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Tìm kiếm voucher</Form.Label>
                                                        <Form.Control type="text" placeholder="Nhập tên voucher" />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Tổng tiền sản phẩm</Form.Label>
                                                        <Form.Control type="text" value="500,000 VND" readOnly />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Phương thức thanh toán</Form.Label>
                                                        <Form.Control as="select" value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                                                            <option value="">Chọn phương thức thanh toán</option>
                                                            <option value="cash">Tiền mặt</option>
                                                            <option value="creditCard">Thẻ tín dụng</option>
                                                            <option value="paypal">PayPal</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group>
                                                        <Form.Label>Trạng thái hóa đơn</Form.Label>
                                                        <Form.Control as="select" value={selectedInvoiceStatus} onChange={(e) => setSelectedInvoiceStatus(e.target.value)}>
                                                            <option value="">Chọn trạng thái hóa đơn</option>
                                                            <option value="pending">Chờ xử lý</option>
                                                            <option value="processed">Đã xử lý</option>
                                                            <option value="completed">Hoàn thành</option>
                                                            <option value="cancelled">Hủy</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Form.Group className="mt-3">
                                                    <Form.Label>Ghi chú</Form.Label>
                                                    <Form.Control
                                                        as="textarea" // Sử dụng Textarea
                                                        rows={3} // Số dòng trong Textarea
                                                        placeholder="Ghi chú chi tiết" // Ghi chú cho Textarea
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Col className="d-flex justify-content-center mt-4">
                                                    <Button variant="outline-dark" onClick={addTab}>
                                                        Tạo hóa đơn
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </Form>
                            </Col>
                            <Col xs={7}>
                                <div className="padding-all h-100">
                                    <h5 className="text-center mb-4">
                                        Sản phẩm khách mua
                                    </h5>

                                    <Form className="padding-all mb-4">
                                        <Form.Group controlId="searchProduct">
                                            <Form.Label>Tìm kiếm sản phẩm</Form.Label>
                                            <FormControl
                                                type="text"
                                                value={searchText}
                                                onChange={handleSearchTextChange}
                                                placeholder="Nhập tên sản phẩm"
                                            />
                                        </Form.Group>
                                    </Form>

                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên Sản Phẩm</th>
                                                <th>Giá</th>
                                                <th>Số Lượng</th>
                                                <th>Thành Tiền</th>
                                                <th>Hành Động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((product, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price} VND</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.price * product.quantity} VND</td>
                                                </tr>
                                            ))}
                                            {/* Thêm các hàng khác ở đây tương tự */}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default SalesAtTheCounter;
