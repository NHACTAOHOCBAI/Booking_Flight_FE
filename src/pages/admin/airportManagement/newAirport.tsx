import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormProps, Input, message, Modal } from "antd";
interface IProp {
    isNewOpen: boolean
    setIsNewOpen: (value: boolean) => void
}
const NewAirport = (props: IProp) => {
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();
    const { isNewOpen, setIsNewOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<INewAirportItem>['onFinish'] = (value) => {
        console.log(value);
        mutation.mutate(value);
        handleCancel();
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        form.resetFields();
        setIsNewOpen(false);
    };
    //logic create
    const mutation = useMutation({
        mutationFn: async (newAirport: INewAirportItem) => {
            await fetch('http://localhost:8080/bookingflight/airports', {
                method: "POST",
                body: JSON.stringify({
                    airportName: newAirport.name,
                    location: newAirport.country
                }),
                headers: {
                    "Content-Type": "application/json"  // Thêm header JSON
                },
            })
        },
        onSuccess: () => {
            messageApi.open({
                type: 'success',
                content: 'This is a success message',
            });
            queryClient.invalidateQueries({ queryKey: ['getAllAirports'] })
        }
    })
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