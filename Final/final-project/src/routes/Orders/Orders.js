import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, addOrder, updateOrder, deleteOrder } from '../../store/actions/orderActions';
import { Table, Button, Modal, Form, Input, Select, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { fetchMenuItems } from '../../store/actions/menuActions';
import { fetchWaiters } from '../../store/actions/waiterActions';
import OrderForm from './OrderForm';

const { Option } = Select;

const Orders = () => {
    const dispatch = useDispatch();
    const tables = useSelector((state) => state.tables.list);
    const menu = useSelector((state) => state.menu.menuItems);
    const orders = useSelector((state) => state.order.list);
    const waitersList = useSelector((state) => state.waiter.list);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [form] = Form.useForm();
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        dispatch(fetchWaiters());
        dispatch(fetchMenuItems());
        dispatch(fetchOrders());
    }, [dispatch]);

    const getWaiterName = (waiterId) => {
        const waiter = waitersList.find((waiter) => waiter.id === waiterId);
        return waiter ? waiter.firstName : '';
    };

    const handleAddOrder = () => {
        setIsModalVisible(true);
        setFormValues(null);
    };

    const handleEditOrder = (order) => {
        setFormValues(order);
        setIsModalVisible(true);
    };

    const handleDeleteOrder = (id) => {
        setDeleteConfirmId(id);
        setDeleteConfirmVisible(true);
    };

    const handleDeleteConfirm = () => {
        if (deleteConfirmId) {
            dispatch(deleteOrder(deleteConfirmId));
        }
        setDeleteConfirmVisible(false);
        setDeleteConfirmId(null);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmVisible(false);
        setDeleteConfirmId(null);
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
        if (order.dishes) {
            order.dishes.forEach((dish) => {
                const dishPrice = menu.find((item) => item.id === dish.dishId)?.price;
                if (dishPrice) {
                    totalPrice += dishPrice * dish.count;
                }
            });
        }
        return totalPrice;
    };

    const getDishNameAndPrice = (dishId) => {
        const dish = menu.find((dish) => dish.id === dishId);
        return dish ? `${dish.name} - ${dish.price}` : '';
    };

    const dishesColumns = [
        {
            title: 'Dish Name',
            dataIndex: 'dishId',
            key: 'dishId',
            render: (dishId) => {
                const dish = menu.find((item) => item.id === dishId);
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
                const dish = menu.find((item) => item.id === dishId);
                return dish ? dish.price : '';
            },
        },
        {
            title: 'Total Price',
            dataIndex: 'dishId',
            key: 'totalPrice',
            render: (dishId, record) => {
                const dish = menu.find((item) => item.id === dishId);
                return dish ? dish.price * record.count : '';
            },
        },
    ];

    const ordersColumns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Waiter Name',
            dataIndex: 'waiterId',
            key: 'waiterName',
            render: (waiterId) => getWaiterName(waiterId),
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
                <Button icon={<EyeOutlined />} onClick={() => handleViewDishes(record)} />
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
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditOrder(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteOrder(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const tableStyle = {
        width: '80%',
        margin: '0 auto',
    };

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '16px' }}>Orders</h2>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddOrder}>
                Add New Order
            </Button>
            <Table dataSource={orders} columns={ordersColumns} pagination={{ pageSize: 10 }} bordered style={tableStyle} />
            <OrderForm
                visible={isModalVisible}
                onCancel={handleModalCancel}
                onOk={handleModalOk}
                initialValues={formValues}
                dishes={menu} // Pass 'menu' instead of 'dishes'
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
            <Modal
                title="Confirm Delete"
                visible={deleteConfirmVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this order?</p>
            </Modal>
        </div>
    );
};

export default Orders;
