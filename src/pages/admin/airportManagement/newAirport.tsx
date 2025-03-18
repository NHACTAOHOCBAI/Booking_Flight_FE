import { Form, FormProps, Input, message, Modal } from "antd";

interface IProp {
    isNewOpen: boolean
    setIsNewOpen: (value: boolean) => void
}
const NewAirport = (props: IProp) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { isNewOpen, setIsNewOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<INewAirportItem>['onFinish'] = (value) => {
        console.log(value);
        handleCancel();
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        form.resetFields();
        setIsNewOpen(false);
    };
    return (
        <>
            {contextHolder}
            <Modal title="New Airport" open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item<INewAirportItem>
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
                    <Form.Item<INewAirportItem>
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
                    <Form.Item<INewAirportItem>
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
export default NewAirport;