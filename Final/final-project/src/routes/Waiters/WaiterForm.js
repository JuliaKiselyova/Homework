import React, { useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';

const WaiterForm = ({ initialValues, onOk, onCancel, form }) => {
    useEffect(() => {
        form.resetFields();
    }, [initialValues, form]);

    const onFinish = (values) => {
        onOk(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the first name',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the phone number',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            {initialValues && initialValues.id && (
                <Form.Item>
                    <Alert message={`ID: ${initialValues.id}`} type="info" showIcon />
                </Form.Item>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? 'Save' : 'Add'}
                </Button>
                <Button htmlType="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default WaiterForm;
