import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWaiters, addWaiter, updateWaiter, deleteWaiter, setWaiterFilter } from '../../store/actions/waiterActions';
import { Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import WaiterForm from './WaiterForm';

const Waiters = () => {
    const waiters = useSelector((state) => state.waiter.list);
    const filter = useSelector((state) => state.waiter.filter);
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedWaiter, setSelectedWaiter] = useState(null);
    const [form] = Form.useForm();
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    useEffect(() => {
        dispatch(fetchWaiters());
    }, [dispatch]);

    const handleEditWaiter = (waiter) => {
        form.resetFields();
        setSelectedWaiter(waiter);
        setIsModalVisible(true);
    };

    const handleAddWaiter = () => {
        form.resetFields();
        setSelectedWaiter(null);
        setIsModalVisible(true);
    };

    const handleDeleteWaiter = (id) => {
        setDeleteConfirmVisible(true);
        setDeleteConfirmId(id);
    };

    const handleDeleteConfirm = () => {
        if (deleteConfirmId) {
            dispatch(deleteWaiter(deleteConfirmId));
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
        setSelectedWaiter(null);
        form.resetFields();
    };

    const handleModalOk = (values) => {
        if (selectedWaiter) {
            dispatch(updateWaiter(selectedWaiter.id, values));
        } else {
            dispatch(addWaiter(values));
        }
        setIsModalVisible(false);
        setSelectedWaiter(null);
        form.resetFields();
    };

    const handleFilterChange = (e) => {
        dispatch(setWaiterFilter(e.target.value));
    };

    const filteredWaiters = waiters.filter((waiter) =>
        waiter.firstName.toLowerCase().includes(filter.toLowerCase())
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            align: 'center',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            width: '400px',
            render: (_, record) => (
                <span>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditWaiter(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteWaiter(record.id)}
                        style={{ marginLeft: '8px' }}
                    >
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Filter by name"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>
            <h2 style={{ marginBottom: '16px' }}>Waiters</h2>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddWaiter}
                style={{ marginBottom: '16px' }}
            >
                Add New
            </Button>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredWaiters}
                bordered
                pagination={false}
                style={{ borderRadius: '8px' }}
            />

            <Modal
                title={selectedWaiter ? 'Edit Waiter' : 'Add Waiter'}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <WaiterForm
                    initialValues={selectedWaiter ? selectedWaiter : { firstName: '', phone: '' }}
                    onOk={handleModalOk}
                    onCancel={handleModalCancel}
                    form={form}
                    isEditForm={!!selectedWaiter}
                />
            </Modal>

            <Modal
                title="Confirm Delete"
                visible={deleteConfirmVisible}
                onCancel={handleDeleteCancel}
                onOk={handleDeleteConfirm}
                cancelText="Cancel"
                okText="Delete"

            >
                <p>Are you sure you want to delete this waiter?</p>
            </Modal>
        </div>
    );
};

export default Waiters;
