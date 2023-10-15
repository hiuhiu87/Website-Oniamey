import React, { useState, useRef } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";
import "./SalesAtTheCounter.scss";

const SalesAtTheCounter = (props) => {
    const [activeTab, setActiveTab] = useState(1);
    const [tabs, setTabs] = useState([
        {
            id: 1,
            content: "Hóa đơn 1",
            customerInfo: {
                hasAccount: true,
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

    const addTab = () => {
        if (tabs.length < 5) {
            const newTab = {
                id: nextTabId.current,
                content: `Hóa đơn ${nextTabId.current}`,
                customerInfo: {
                    hasAccount: true,
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

    const handleHasAccountChange = (tabId, newHasAccountValue) => {
        const updatedTabs = tabs.map((tab) => {
            if (tab.id === tabId) {
                return { ...tab, customerInfo: { ...tab.customerInfo, hasAccount: newHasAccountValue } };
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

    return (
        <Container>
            <Row className="justify-content-md-center">
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
                className="mb-3"
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
                                <Form>
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
                                            <Form.Group>
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={tab.customerInfo.address}
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
                                            <Form.Group>
                                                <Form.Label>Địa chỉ</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Số nhà và đường"
                                                    value={tab.customerInfo.address.street}
                                                    onChange={(e) => {
                                                        const updatedTab = { ...tab };
                                                        updatedTab.customerInfo.address.street = e.target.value;
                                                        setTabs((prevTabs) => {
                                                            const updatedTabs = [...prevTabs];
                                                            updatedTabs[tab.id - 1] = updatedTab;
                                                            return updatedTabs;
                                                        });
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Phường/Xã"
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
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Tỉnh/Thành phố"
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
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Quốc gia</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Quốc gia"
                                                    value={tab.customerInfo.address.country}
                                                    onChange={(e) => {
                                                        const updatedTab = { ...tab };
                                                        updatedTab.customerInfo.address.country = e.target.value;
                                                        setTabs((prevTabs) => {
                                                            const updatedTabs = [...prevTabs];
                                                            updatedTabs[tab.id - 1] = updatedTab;
                                                            return updatedTabs;
                                                        });
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`defaultAddressCheckbox-${tab.id}`}
                                                    label="Địa chỉ mặc định"
                                                    checked={tab.customerInfo.address.isDefault}
                                                    onChange={(e) => {
                                                        const updatedTab = { ...tab };
                                                        updatedTab.customerInfo.address.isDefault = e.target.checked;
                                                        setTabs((prevTabs) => {
                                                            const updatedTabs = [...prevTabs];
                                                            updatedTabs[tab.id - 1] = updatedTab;
                                                            return updatedTabs;
                                                        });
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Tìm tài khoản</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={tab.customerInfo.searchInput}
                                                    onChange={(e) => {
                                                        const updatedTab = { ...tab };
                                                        updatedTab.customerInfo.searchInput = e.target.value;
                                                        setTabs((prevTabs) => {
                                                            const updatedTabs = [...prevTabs];
                                                            updatedTabs[tab.id - 1] = updatedTab;
                                                            return updatedTabs;
                                                        });
                                                    }}
                                                />
                                            </Form.Group>
                                        </>
                                    ) : (
                                        <>
                                            <Form.Group>
                                                <Form.Label>Tên</Form.Label>
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
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
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
                                            <Form.Group>
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={tab.customerInfo.address}
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
                                            <Form.Group>
                                                <Form.Label>Địa chỉ</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Số nhà và đường"
                                                    value={tab.customerInfo.address.street}
                                                    onChange={(e) => {
                                                        const updatedTab = { ...tab };
                                                        updatedTab.customerInfo.address.street = e.target.value;
                                                        setTabs((prevTabs) => {
                                                            const updatedTabs = [...prevTabs];
                                                            updatedTabs[tab.id - 1] = updatedTab;
                                                            return updatedTabs;
                                                        });
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Phường/Xã</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Phường/Xã"
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
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Tỉnh/Thành phố</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Tỉnh/Thành phố"
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
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Quốc gia</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Quốc gia"
                                                    value={tab.customerInfo.address.country}
                                                    onChange={(e) => {
                                                        const updatedTab = { ...tab };
                                                        updatedTab.customerInfo.address.country = e.target.value;
                                                        setTabs((prevTabs) => {
                                                            const updatedTabs = [...prevTabs];
                                                            updatedTabs[tab.id - 1] = updatedTab;
                                                            return updatedTabs;
                                                        });
                                                    }}
                                                />
                                            </Form.Group>
                                        </>
                                    )}
                                </Form>
                            </Col>
                            <Col>
                                A
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                a
                            </Col>
                            <Col>
                                b
                            </Col>
                        </Row>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default SalesAtTheCounter;