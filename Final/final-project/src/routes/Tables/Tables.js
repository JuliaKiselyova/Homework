import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, addTable, updateTable, deleteTable } from '../../store/actions/tableActions';
import { Table, Button, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import TableForm from './TableForm';

const Tables = () => {
    const dispatch = useDispatch();
    const tables = useSelector((state) => state.tables.list);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [form] = Form.useForm();
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        dispatch(fetchTables());
    }, [dispatch]);

    const handleAddTable = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditTable = (table) => {
        form.resetFields();
        setFormValues(table);
        setIsModalVisible(true);
    };

    const handleDeleteTable = (id) => {
        setDeleteConfirmVisible(true);
        setDeleteConfirmId(id);
    };

    const handleDeleteConfirm = () => {
        if (deleteConfirmId) {
            dispatch(deleteTable(deleteConfirmId));
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
            dispatch(updateTable(formValues.id, values));
        } else {
            dispatch(addTable(values));
        }
        setIsModalVisible(false);
        setFormValues(null);
        form.resetFields();
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '100px',
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            width: '400px',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            width: '400px',
            render: (text, record) => (
                <span>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditTable(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeleteTable(record.id)} style={{ marginLeft: '8px' }}>
                        Delete
                    </Button>
                </span >
            ),
        },
    ];

    const tableStyle = {
        width: '80%',
        margin: '0 auto',
    };

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '16px' }}>Tables</h2>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTable} style={{ marginBottom: '16px' }}>
                Add New
            </Button>
            <Table
                dataSource={tables}
                columns={columns}
                pagination={false}
                bordered
                style={tableStyle}
            />

            <TableForm
                visible={isModalVisible}
                initialValues={formValues}
                onCancel={handleModalCancel}
                onOk={handleModalOk}
                form={form}
            />

            <Modal
                title="Confirm Delete"
                visible={deleteConfirmVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this table?</p>
            </Modal>
        </div>
    );
};

export default Tables;
