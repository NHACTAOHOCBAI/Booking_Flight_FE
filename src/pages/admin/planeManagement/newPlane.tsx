import { Form, FormProps, Input, Modal } from "antd";

interface IProp {
    isNewOpen: boolean;
    setIsNewOpen: (value: boolean) => void;
}

const NewPlane = (props: IProp) => {
    const { isNewOpen, setIsNewOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<INewPlaneItem>["onFinish"] = (value) => {
        console.log(value);
        handleCancel();
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        form.resetFields();
        setIsNewOpen(false);
    };

    return (
        <>
            <Modal
                title="New Plane"
                open={isNewOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item<INewPlaneItem>
                        label="Model"
                        name="name"
                        rules={[{ required: true, message: "Please input airport's name" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<INewPlaneItem>
                        label="Airline"
                        name="airline"
                        rules={[{ required: true, message: "Please input airport's name" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default NewPlane;
