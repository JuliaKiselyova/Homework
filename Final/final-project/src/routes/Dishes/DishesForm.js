import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, Button, Alert } from 'antd';

const { Option } = Select;

const DishesForm = ({ form, initialValues, onCancel, onOk }) => {
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [form, initialValues]);

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            onOk(values);
        });
    };

    return (
        <Form form={form} layout="vertical">
            {initialValues && initialValues.id && (
                <Form.Item>
                    <Alert message={`ID: ${initialValues.id}`} type="info" showIcon />
                </Form.Item>
            )}
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter the dish name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
            >
                <Select style={{ width: '200px' }}>
                    <Option value="appetizer">Appetizer</Option>
                    <Option value="main">Main</Option>
                    <Option value="dessert">Dessert</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter the dish description' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please enter the price' }]}
            >
                <InputNumber min={0} precision={2} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" onClick={handleOk} style={{ marginLeft: 8 }}>
                    Save
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </Form.Item>
        </Form>
    );
};

export default DishesForm;
