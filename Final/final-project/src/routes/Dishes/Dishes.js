import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, filterMenuByCategory, addMenuItem, updateMenuItem, deleteMenuItem } from '../../store/actions/menuActions';
import { Table, Select, Button, Modal, Form } from 'antd';
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
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`, // Format the price as currency
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </span>
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


    const handleDelete = (id) => {
        dispatch(deleteMenuItem(id));
    };


    const handleModalCancel = () => {
        setIsModalVisible(false);
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

    return (
        <div>
            <h2>Dishes</h2>
            <Button type="primary" onClick={handleAdd}>Add Dish</Button>
            <div>
                <Select style={{ width: 200 }} placeholder="Filter by Category" onChange={handleCategoryChange}>
                    <Option value="">All</Option>
                    <Option value="appetizer">Appetizer</Option>
                    <Option value="main">Main</Option>
                    <Option value="dessert">Dessert</Option>
                </Select>

            </div>
            <Table dataSource={filteredMenu} columns={columns} />

            <Modal
                title={selectedDish ? 'Edit Dish' : 'Add Dish'}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <DishesForm form={form} initialValues={selectedDish} onCancel={handleModalCancel} onOk={handleModalOk} />
            </Modal>
        </div>
    );
};

export default Dishes;
