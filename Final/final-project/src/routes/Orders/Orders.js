import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, addOrder, updateOrder, deleteOrder, closeOrder } from '../../store/actions/orderActions';
import { Table, Button, Modal, Form, Input, Select } from 'antd';

import OrderForm from './OrderForm';

const { Option } = Select;

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.list);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await fetch('https://mock-api-5678.nw.r.appspot.com/dishes');
                const data = await response.json();
                setDishes(data);
            } catch (error) {
                console.error('Error fetching dishes:', error);
            }
        };

        dispatch(fetchOrders());
        fetchDishes();
    }, [dispatch]);

    const handleAddOrder = () => {
        setIsModalVisible(true);
        setFormValues(null);
    };

    const handleEditOrder = (order) => {
        setFormValues(order);
        setIsModalVisible(true);
    };

    const handleDeleteOrder = (id) => {
        dispatch(deleteOrder(id));
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setFormValues(null);
        form.resetFields();
    };

    const handleModalOk = (values) => {
        if (formValues) {
            dispatch(updateOrder(formValues.id, values));
        } else {
            dispatch(addOrder(values));
        }
        setIsModalVisible(false);
        setFormValues(null);
    };

    const handleViewDishes = (order) => {
        setSelectedOrder(order);
    };

    const handleDishesModalCancel = () => {
        setSelectedOrder(null);
    };

    const calculateTotalPrice = (order) => {
        let totalPrice = 0;
        order.dishes.forEach((dish) => {
            const dishPrice = dishes.find((item) => item.id === dish.dishId)?.price;
            if (dishPrice) {
                totalPrice += dishPrice * dish.count;
            }
        });
        return totalPrice;
    };

    const getDishNameAndPrice = (dishId) => {
        const dish = dishes.find((dish) => dish.id === dishId);
        return dish ? `${dish.name} - ${dish.price}` : '';
    };

    const closeOrder = (orderId) => {
        dispatch(closeOrder(orderId));
    };

    const dishesColumns = [
        {
            title: 'Dish Name',
            dataIndex: 'dishId',
            key: 'dishId',
            render: (dishId) => {
                const dish = dishes.find((dish) => dish.id === dishId);
                return dish ? dish.name : '';
            },
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Price',
            dataIndex: 'dishId',
            key: 'price',
            render: (dishId) => {
                const dish = dishes.find((dish) => dish.id === dishId);
                return dish ? dish.price : '';
            },
        },
        {
            title: 'Total Price',
            dataIndex: 'dishId',
            key: 'totalPrice',
            render: (dishId, record) => {
                const dish = dishes.find((dish) => dish.id === dishId);
                return dish ? dish.price * record.count : '';
            },
        },
    ];

    return (
        <div>
            <h1>Orders</h1>
            <Table
                dataSource={orders}
                columns={[
                    {
                        title: 'Order ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Waiter ID',
                        dataIndex: 'waiterId',
                        key: 'waiterId',
                    },
                    {
                        title: 'Table ID',
                        dataIndex: 'tableId',
                        key: 'tableId',
                    },
                    {
                        title: 'Dishes',
                        key: 'dishes',
                        render: (_, record) => (
                            <Button onClick={() => handleViewDishes(record)}>View Dishes</Button>
                        ),
                    },
                    {
                        title: 'Total Price',
                        key: 'totalPrice',
                        render: (_, record) => calculateTotalPrice(record),
                    },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <>
                                <Button type="primary" onClick={() => handleEditOrder(record)}>
                                    Edit
                                </Button>
                                <Button type="danger" onClick={() => handleDeleteOrder(record.id)}>
                                    Close
                                </Button>
                            </>
                        ),
                    },
                ]}
            />

            <Button type="primary" onClick={handleAddOrder}>
                Add Order
            </Button>

            <OrderForm
                visible={isModalVisible}
                onCancel={handleModalCancel}
                onOk={handleModalOk}
                initialValues={formValues}
                dishes={dishes}
                form={form}
            />

            <Modal
                title="Dishes"
                visible={selectedOrder !== null}
                onCancel={handleDishesModalCancel}
                footer={null}
            >
                {selectedOrder && (
                    <Table dataSource={selectedOrder.dishes} columns={dishesColumns} pagination={false} />
                )}
                {selectedOrder && (
                    <p style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        Total Price: {calculateTotalPrice(selectedOrder)}
                    </p>
                )}
            </Modal>
        </div>
    );
};

export default Orders;
