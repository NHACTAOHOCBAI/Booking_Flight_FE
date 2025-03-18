/* eslint-disable react-hooks/exhaustive-deps */
import { setDoneUpdate, updateAirport } from "@/redux/airport/airportSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Form, FormProps, Input, message, Modal } from "antd";
import { useEffect } from "react";

interface IProp {
    updatedAirport: IAirportItem
    setUpdatedAirport: (value: IAirportItem) => void
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
}
const UpdateAirport = (props: IProp) => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const isDoneUpdate = useAppSelector(state => state.airport.isDoneUpdate);
    const { updatedAirport, setUpdatedAirport, isUpdateOpen, setIsUpdateOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<IUpdateAirportItem>['onFinish'] = (value) => {
        const realValue = {
            airportCode: value._id,
            airportName: value.name,
            location: value.city
        }
        dispatch(updateAirport(realValue));
        handleCancel();
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
        if (isDoneUpdate) {
            messageApi.open({
                type: 'success',
                content: 'This is a success update',
            });
            dispatch(setDoneUpdate());
        }
    }, [isDoneUpdate])
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
            {contextHolder}
            <Modal title="Update Airport" open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
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