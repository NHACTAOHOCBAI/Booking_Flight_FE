/* eslint-disable react-hooks/exhaustive-deps */
import { useUpdateAirport } from "@/hooks/useAirport";
import { Form, FormProps, Input, message, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface IProp {
    updatedAirport: IAirportItem
    setUpdatedAirport: (value: IAirportItem) => void
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
}
const UpdateAirport = (props: IProp) => {
    const [messageApi, messContextHolder] = message.useMessage();
    const [api, notifiContextHolder] = notification.useNotification();
    const updateAirport = useUpdateAirport();
    const { updatedAirport, setUpdatedAirport, isUpdateOpen, setIsUpdateOpen } = props;
    const [isLoading, setIsloading] = useState(false);
    const [form] = Form.useForm();
    const onFinish: FormProps<IUpdateAirportItem>['onFinish'] = (value) => {
        setIsloading(true);
        updateAirport.mutate(
            value,
            {
                onSuccess: () => {
                    messageApi.success("You have updated an airport");
                    handleCancel();
                    setIsloading(false);
                },
                onError: () => {
                    api.info({
                        message: <div style={{ color: "#ee5253", fontWeight: "bold" }}>Update failed</div>,
                        description: `${updateAirport.error?.response.data.message}  `,
                        icon: <ExclamationCircleOutlined style={{ color: "#ee5253" }} />
                    });
                    handleCancel();
                    setIsloading(false);
                }
            }
        );
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        form.resetFields();
        setUpdatedAirport({
            _id: "",
            name: "",
            city: "",
            country: ""
        });
        setIsUpdateOpen(false);
    };
    useEffect(() => {
        form.setFieldsValue({
            _id: updatedAirport._id,
            name: updatedAirport.name,
            city: updatedAirport.city,
            country: updatedAirport.country
        })
    }, [updatedAirport])
    return (
        <>
            {messContextHolder}
            {notifiContextHolder}
            <Modal title="Update Airport" loading={isLoading} open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item<IUpdateAirportItem>
                        label="ID"
                        name="_id"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item<IUpdateAirportItem>
                        label="Airport"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input airport's name"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<IUpdateAirportItem>
                        label="City"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: "Please input airport's city"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<IUpdateAirportItem>
                        label="Country"
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: "Please input airport's country"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default UpdateAirport;