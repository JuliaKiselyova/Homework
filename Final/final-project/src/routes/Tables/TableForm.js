import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const TableForm = ({ visible, initialValues, onCancel, onOk, form }) => {
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues, form]);

    const handleModalCancel = () => {
        form.resetFields();
        onCancel();
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            onOk(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Add/Edit Table"
            visible={visible}
            onCancel={handleModalCancel}
            onOk={handleModalOk}
            afterClose={handleModalCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="id" label="ID">
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="number"
                    label="Number"
                    rules={[{ required: true, message: 'Please enter a number' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TableForm;
