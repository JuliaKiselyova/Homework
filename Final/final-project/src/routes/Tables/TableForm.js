import React, { useEffect } from 'react';
import { Modal, Form, Input, Alert, Button } from 'antd';

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
            title={initialValues ? 'Edit Table' : 'Add Table'}
            visible={visible}
            onCancel={handleModalCancel}
            footer={[
                <Button key="save" type="primary" onClick={handleModalOk}>
                    {initialValues ? 'Save' : 'Add'}
                </Button>,
                <Button key="cancel" onClick={handleModalCancel}>
                    Cancel
                </Button>,

            ]}
            afterClose={handleModalCancel}
        >
            <Form form={form} layout="vertical">
                {initialValues && initialValues.id && (
                    <Form.Item>
                        <Alert message={`ID: ${initialValues.id}`} type="info" showIcon />
                    </Form.Item>
                )}
                <Form.Item name="number" label="Number">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TableForm;
