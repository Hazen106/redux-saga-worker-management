import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from 'antd';
import { addWorkerRequest } from '../actions/WorkerActions';
import WorkerTable from './WorkerTable';
import WorkerForm from './WorkerForm';

//Quản lý danh sách nhân viên và tích hợp các phần thêm sửa nhân viên
const WorkerList = () => {
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers.workers);
    const [addModalVisible, setAddModalVisible] = useState(false);

    //Xử lý nhấn nút thêm
    const handleAddWorker = () => {
        setAddModalVisible(true);
    };

    //Xử lý khi submit form thêm nhân viên
    const handleAddSubmit = (values) => {
        dispatch(addWorkerRequest(values));
        setAddModalVisible(false);
    };

    //Xử lý khi hủy thêm nhân viên
    const handleAddCancel = () => {
        setAddModalVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={handleAddWorker} style={{ marginBottom: 16 }}>
                Thêm Nhân Viên
            </Button>
            <WorkerTable dataSource={workers} />
            <Modal
                title="Thêm nhân viên"
                visible={addModalVisible}
                onCancel={handleAddCancel}
                footer={null}
            >
                <WorkerForm onSubmit={handleAddSubmit} onCancel={handleAddCancel} existingWorkers={workers} />
            </Modal>
        </div>
    );
};

export default WorkerList;
