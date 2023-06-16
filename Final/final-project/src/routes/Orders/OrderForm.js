import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd';
import TableApi from '../../api/TableApi';
import { WaiterApi } from '../../api/WaiterApi';

const { Option } = Select;

const OrderForm = ({ visible, initialValues, onCancel, onOk, dishes }) => {
    const [form] = Form.useForm();
    const [dishPrices, setDishPrices] = useState({});
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [waitersList, setWaitersList] = useState([]);
    const [tables, setTables] = useState([]);

    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (initialValues && Object.keys(initialValues).length > 0) {
                form.setFieldsValue(initialValues);
            } else {
                form.setFieldsValue({});
            }
            calculateTotalOrderPrice(); 
        }
    }, [visible, initialValues, form]);

    useEffect(() => {
        const fetchWaiters = async () => {
            try {
                const waiterList = await WaiterApi.getList();
                setWaitersList(waiterList);
            } catch (error) {
                console.log('Error fetching waiters:', error);
            }
        };

        fetchWaiters();
    }, []);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const tableList = await TableApi.getList();
                setTables(tableList);
            } catch (error) {
                console.log('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    const handleAddDish = () => {
        const dishes = form.getFieldValue('dishes') || [];
        const nextDishes = [...dishes, { dishId: '', count: 1 }];
        form.setFieldsValue({ dishes: nextDishes });
    };

    const handleRemoveDish = (index) => {
        const dishes = form.getFieldValue('dishes') || [];
        const nextDishes = [...dishes];
        nextDishes.splice(index, 1);
        form.setFieldsValue({ dishes: nextDishes });
        calculateTotalOrderPrice(); 
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            onOk(values);
        });
    };

    const calculateDishPrice = (dishId) => {
        const dish = dishes.find((dish) => dish.id === dishId);
        return dish ? dish.price : 0;
    };

    const calculateDishTotalPrice = (dishId, count) => {
        const dishPrice = calculateDishPrice(dishId);
        return dishPrice * count;
    };

    const calculateTotalOrderPrice = () => {
        const dishes = form.getFieldValue('dishes') || [];
        const totalAmount = dishes.reduce((total, dish) => {
            const dishPrice = calculateDishPrice(dish.dishId);
            return total + dishPrice * dish.count;
        }, 0);
        setTotalOrderPrice(totalAmount);
    };

    const handleDishCountChange = (index, count) => {
        const dishes = form.getFieldValue('dishes') || [];
        const nextDishes = [...dishes];
        nextDishes[index].count = count;
        form.setFieldsValue({ dishes: nextDishes });
        calculateTotalOrderPrice(); 
    };

    useEffect(() => {
        const prices = {};
        dishes.forEach((dish) => {
            prices[dish.id] = dish.price;
        });
        setDishPrices(prices);
    }, [dishes]);

    return (
        <Modal visible={visible} title="Order Form" onCancel={onCancel} onOk={handleSubmit} destroyOnClose>
            <Form form={form} layout="vertical">
                <Form.Item name="waiterId" label="Waiter ID" rules={[{ required: true }]}>
                    <Select>
                        {waitersList.map((waiter) => (
                            <Option key={waiter.id} value={waiter.id}>
                                {waiter.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="tableId" label="Table ID" rules={[{ required: true }]}>
                    <Select>
                        {tables.map((table) => (
                            <Option key={table.id} value={table.id}>
                                {table.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.List name="dishes">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <div key={field.key}>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'dishId']}
                                        fieldKey={[field.fieldKey, 'dishId']}
                                        label="Dish"
                                        rules={[{ required: true, message: 'Please select a dish' }]}
                                    >
                                        <Select>
                                            {dishes.map((dish) => (
                                                <Option key={dish.id} value={dish.id}>
                                                    {dish.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'count']}
                                        fieldKey={[field.fieldKey, 'count']}
                                        initialValue={1}
                                        rules={[{ required: true, message: 'Please enter the count' }]}
                                    >
                                        <InputNumber min={1} onChange={(value) => handleDishCountChange(index, value)} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="link" onClick={() => handleRemoveDish(index)}>
                                            Remove Dish
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <span>
                                            <strong>Price:</strong> {calculateDishPrice(form.getFieldValue(['dishes', index, 'dishId']))}
                                        </span>
                                        <br />
                                        <span>
                                            <strong>Total Price:</strong>{' '}
                                            {calculateDishTotalPrice(
                                                form.getFieldValue(['dishes', index, 'dishId']),
                                                form.getFieldValue(['dishes', index, 'count'])
                                            )}
                                        </span>
                                    </Form.Item>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={handleAddDish} block>
                                    Add Dish
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <strong>Total Order Price:</strong> {totalOrderPrice}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderForm;