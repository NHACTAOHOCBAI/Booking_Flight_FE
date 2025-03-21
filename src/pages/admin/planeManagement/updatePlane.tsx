import { Form, FormProps, Input, Modal } from "antd";
import { useEffect } from "react";

interface IProp {
    updatedPlane: IPlaneItem
    setUpdatedPlane: (value: IPlaneItem) => void
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
}
const UpdatePlane = (props: IProp) => {
    const { updatedPlane, setUpdatedPlane, isUpdateOpen, setIsUpdateOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<IUpdatePlaneItem>['onFinish'] = (value) => {
        console.log(value);
        handleCancel();
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        form.resetFields();
        setUpdatedPlane({
            id: "",
            name: "",
            airline: ""
        });
        setIsUpdateOpen(false);
    };
    useEffect(() => {
        form.setFieldsValue({
            id: updatedPlane.id,
            name: updatedPlane.name,
            airline: updatedPlane.airline
        })
    }, [updatedPlane])
    return (
        <>
            <Modal title="Update Plane" open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item<IUpdatePlaneItem>
                        label="ID"
                        name="id"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item<IUpdatePlaneItem>
                        label="Model"
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
                    <Form.Item<IUpdatePlaneItem>
                        label="Airline"
                        name="airline"
                        rules={[
                            {
                                required: true,
                                message: "Please input airport's name"
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
export default UpdatePlane;