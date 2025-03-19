/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormProps, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";

interface IProp {
    updatedAirport: IAirportItem
    setUpdatedAirport: (value: IAirportItem) => void
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
}
const UpdateAirport = (props: IProp) => {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const { updatedAirport, setUpdatedAirport, isUpdateOpen, setIsUpdateOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<IUpdateAirportItem>['onFinish'] = (value) => {
        mutation.mutate(value);
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
    //logic update
    const mutation = useMutation({
        mutationFn: async (updatedAirport: IUpdateAirportItem) => {
            await fetch(`http://localhost:8080/bookingflight/airports/${updatedAirport._id}`, {
                method: "PUT",
                body: JSON.stringify({
                    airportName: updatedAirport.name,
                    location: updatedAirport.country
                }),
                headers: {
                    "Content-Type": "application/json"  // Thêm header JSON
                },
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['getAllAirports'] })
            handleCancel();
            messageApi.open({
                type: 'success',
                content: 'You have updated an airport',
            });
        }
    })
    return (
        <>
            {contextHolder}
            <Modal title="Update Airport" loading={mutation.isPending} open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
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