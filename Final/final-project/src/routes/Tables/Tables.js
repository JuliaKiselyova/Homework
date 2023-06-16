import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, addTable, updateTable, deleteTable } from '../../store/actions/tableActions';
import { Table, Button, Modal, Form, Input } from 'antd';

import TableForm from './TableForm';

const Tables = () => {
    const dispatch = useDispatch();
    const tables = useSelector((state) => state.tables.list);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [form] = Form.useForm();

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
        dispatch(deleteTable(id));
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
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => handleEditTable(record)}>Edit</Button>
                    <Button type="link" onClick={() => handleDeleteTable(record.id)}>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <h2>Tables</h2>
            <Button type="primary" onClick={handleAddTable}>Add New</Button> { }
            <Table dataSource={tables} columns={columns} />

            <TableForm
                visible={isModalVisible}
                initialValues={formValues}
                onCancel={handleModalCancel}
                onOk={handleModalOk}
                form={form}
            />
        </div>
    );
};

export default Tables;
