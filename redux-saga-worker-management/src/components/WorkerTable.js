import React, { useState } from "react";
import { Table, Space, Button, Modal } from 'antd';
import { useDispatch } from "react-redux";
import { deleteWorkerRequest, updateWorkerRequest } from "../actions/WorkerActions";
import WorkerForm from "./WorkerForm";

//Hiển thị danh sách nhân viên và quản lý các hành động sửa xóa
const WorkerTable = ({ dataSource }) => {
    const dispatch = useDispatch();
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editWorker, setEditWorker] = useState(null);

    //Xử lý nút sửa nhân viên
    const handleEditWorker = (worker) => {
        setEditWorker(worker);
        setEditModalVisible(true);
    };

    //Xử lý nút xóa nhân viên
    const handleDeleteWorker = (worker) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: `Bạn có chắc muốn xóa nhân viên "${worker.workername}" không?`,
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk() {
                dispatch(deleteWorkerRequest(worker.id));
            },
        });
    };

    //Xử lý khi submit form sửa nhân viên
    const handleEditSubmit = (values) => {
        dispatch(updateWorkerRequest({ ...editWorker, ...values }));
        setEditModalVisible(false);
    };

    //Xử lý khi hủy sửa nhân viên
    const handleEditCancel = () => {
        setEditModalVisible(false);
    };

    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'workercode',
            key: 'workercode',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'workername',
            key: 'workername',
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Ban',
            dataIndex: 'ban',
            key: 'ban',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEditWorker(record)}>
                        Sửa
                    </Button>
                    <Button type="danger" onClick={() => handleDeleteWorker(record)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={dataSource} rowKey="id" pagination={{ pageSize: 5 }}/>
            {editWorker && (
                <Modal
                    visible={editModalVisible}
                    title="Sửa nhân viên"
                    onCancel={handleEditCancel}
                    footer={null}
                >
                    <WorkerForm
                        initialValues={editWorker}
                        onSubmit={handleEditSubmit}
                        onCancel={handleEditCancel}
                        existingWorkers={dataSource}
                    />
                </Modal>
            )}
        </>
    );
};

export default WorkerTable;
