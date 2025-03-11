/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormProps, Input, Modal } from "antd";
import { useEffect } from "react";

interface IProp {
    updatedAirport: IAirportItem
    setUpdatedAirport: (value: IAirportItem) => void
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
}
interface IUpdateAirportItem {
    _id: string,
    name: string,
    city: string,
    country: string
};
const UpdateAirport = (props: IProp) => {
    const { updatedAirport, setUpdatedAirport, isUpdateOpen, setIsUpdateOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<IUpdateAirportItem>['onFinish'] = (value) => {
        console.log(value);
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
        form.setFieldsValue({
            _id: updatedAirport._id,
            name: updatedAirport.name,
            city: updatedAirport.city,
            country: updatedAirport.country
        })
    }, [updatedAirport])
    return (
        <>
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