import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../../store/actions/menuActions';
import { Table, Select, Button, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DishesForm from './DishesForm';

const { Option } = Select;

const Dishes = () => {
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu.menuItems);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedDish, setSelectedDish] = useState(null);
    const [filteredMenu, setFilteredMenu] = useState(menu);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    useEffect(() => {
        setFilteredMenu(menu);
    }, [menu]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`, // Format the price as currency
            width: '10%',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
            width: '20%',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            width: '10%',
            render: (_, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                        style={{ marginLeft: '8px' }} // Add margin between buttons
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        filterMenu(value);
    };

    const filterMenu = (category) => {
        if (category) {
            const filteredItems = menu.filter((item) => item.category === category);
            setFilteredMenu(filteredItems);
        } else {
            setFilteredMenu(menu);
        }
    };

    const handleAdd = () => {
        setIsModalVisible(true);
        setSelectedDish(null);
        form.resetFields();
    };

    const handleEdit = (record) => {
        setIsModalVisible(true);
        setSelectedDish(record);
        form.setFieldsValue(record);
    };

    const handleDelete = (record) => {
        setDeleteConfirmVisible(true);
        setDeleteConfirmId(record.id);
    };

    const handleDeleteConfirm = () => {
        if (deleteConfirmId) {
            dispatch(deleteMenuItem(deleteConfirmId));
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
        setSelectedDish(null);
        form.resetFields();
    };

    const handleModalOk = (values) => {
        const menuItem = {
            ...values,
            id: selectedDish ? selectedDish.id : Math.floor(Math.random() * 1000), // Generate a random ID if not provided
        };

        if (selectedDish) {
            dispatch(updateMenuItem(selectedDish.id, menuItem));
        } else {
            dispatch(addMenuItem(menuItem));
        }

        form.resetFields();
        setIsModalVisible(false);
    };

    const tableStyle = {
        width: '80%',
        margin: '0 auto',
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px', width: '200px' }}>
                <Select placeholder="Filter by category" value={selectedCategory} onChange={handleCategoryChange} style={{ width: '200px' }}>
                    <Option value="">All</Option>
                    <Option value="appetizer">Appetizer</Option>
                    <Option value="main">Main</Option>
                    <Option value="dessert">Dessert</Option>
                </Select>

            </div>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ marginBottom: '16px' }}
            >
                Add New
            </Button>
            <Table dataSource={filteredMenu} columns={columns} pagination={{ pageSize: 10 }} style={tableStyle} />

            <Modal
                title={selectedDish ? 'Edit Dish' : 'Add Dish'}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <DishesForm form={form} initialValues={selectedDish} onCancel={handleModalCancel} onOk={handleModalOk} />
            </Modal>

            <Modal
                title="Confirm Delete"
                visible={deleteConfirmVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this dish?</p>
            </Modal>
        </div>
    );
};

export default Dishes;
