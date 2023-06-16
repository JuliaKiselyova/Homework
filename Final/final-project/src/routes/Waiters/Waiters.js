import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchWaiters,
    addWaiter,
    updateWaiter,
    deleteWaiter,
    setWaiterFilter, // Import the new action creator
} from '../../store/actions/waiterActions';
import { Table, Button, Modal, Form, Input } from 'antd';

import WaiterForm from './WaiterForm';

const Waiters = () => {
    const waiters = useSelector((state) => state.waiter.list);
    const filter = useSelector((state) => state.waiter.filter); // Get the filter value from the state
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedWaiter, setSelectedWaiter] = useState(null);
    const [form] = Form.useForm();

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
        dispatch(deleteWaiter(id))
            .then(() => {
                setSelectedWaiter(null);
            })
            .catch((error) => {
                console.log('Delete Waiter Error:', error);
            });
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedWaiter(null);
        form.resetFields();
    };

    const handleModalOk = (values) => {
        if (selectedWaiter) {
            dispatch(updateWaiter(selectedWaiter.id, values))
                .then(() => {
                    setSelectedWaiter({ ...selectedWaiter, ...values });
                })
                .catch((error) => {
                    console.log('Update Waiter Error:', error);
                });
        } else {
            dispatch(addWaiter(values))
                .then(() => {
                    dispatch(fetchWaiters());
                })
                .catch((error) => {
                    console.log('Add Waiter Error:', error);
                });
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleFilterChange = (e) => {
        dispatch(setWaiterFilter(e.target.value)); // Dispatch the action to set the filter value
    };

    const filteredWaiters = waiters.filter((waiter) =>
        waiter.firstName.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <Input
                    placeholder="Filter by name"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>
            <h2>Waiters</h2>
            <Button type="primary" onClick={handleAddWaiter}>
                Add New
            </Button>
            <Table
                rowKey="id"
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'First Name',
                        dataIndex: 'firstName',
                        key: 'firstName',
                    },
                    {
                        title: 'Phone',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <span>
                                <Button type="link" onClick={() => handleEditWaiter(record)}>
                                    Edit
                                </Button>
                                <Button type="link" onClick={() => handleDeleteWaiter(record.id)}>
                                    Delete
                                </Button>
                            </span>
                        ),
                    },
                ]}
                dataSource={filteredWaiters} // Use the filtered waiters list
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
                />
            </Modal>
        </div>
    );
};

export default Waiters;
