import React, { useEffect } from "react";
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
//Quản lý form thêm sửa nhân viên
const WorkerForm = ({ onSubmit, initialValues = {}, onCancel, existingWorkers }) => {
    const [form] = Form.useForm();
    // Thiết lập giá trị ban đầu cho form khi component được mount
    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [form, initialValues]);

    //Xử lý khi submit form
    const handleSubmit = () => {
        //Kiểm tra tính hợp lệ của trường trả về một Promise, nếu Promise được giải quyết .then được gọi với giá trị của form 'value'
        form.validateFields().then((values) => {
            //Kiểm tra có sự trùng lặp, phương thức some ktra có phần tử nào trong mảng existingWorkers thỏa mãn đk
            const isDuplicate = existingWorkers.some(worker => worker.workercode === values.workercode && worker.id !== initialValues.id);
            if (isDuplicate) {
                form.setFields([
                    {
                        name: 'workercode',
                        errors: ['Mã nhân viên đã tồn tại.']
                    },
                ]);
                return;
            }
            onSubmit(values);
            form.resetFields();
        }).catch((error) => {
            console.log('validation failed:', error);
        });
    };

    return (
        <Form form={form} layout="vertical" initialValues={initialValues}>
            <Form.Item
                label="Mã nhân viên"
                name="workercode"
                rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tên nhân viên"
                name="workername"
                rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tuổi"
                name="age"
                rules={[
                    { required: true, message: 'Vui lòng nhập tuổi' },
                    {
                        //Không nhận đối số rule nên để'_'
                        validator: (_, value) =>
                            value >= 0 && value <= 100 ? Promise.resolve() : Promise.reject('Tuổi phải là số dương và nhỏ hơn 100'),
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                label="Ban"
                name="ban"
                rules={[{ required: true, message: 'Vui lòng chọn ban!' }]}
            >
                <Select>
                    <Option value="Công nghệ thông tin">Công nghệ thông tin</Option>
                    <Option value="Đào tạo và PTNL">Đào tạo và PTNL</Option>
                    <Option value="Tài Chính">Tài Chính</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default WorkerForm;
