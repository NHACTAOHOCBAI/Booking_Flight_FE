import { createAirport, setDoneCreate } from "@/redux/airport/airportSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Form, FormProps, Input, message, Modal } from "antd";
import { useEffect } from "react";

interface IProp {
    isNewOpen: boolean
    setIsNewOpen: (value: boolean) => void
}
const NewAirport = (props: IProp) => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();
    const isDoneCreate = useAppSelector(state => state.airport.isDoneCreate);
    const { isNewOpen, setIsNewOpen } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<INewAirportItem>['onFinish'] = (value) => {
        const realValue = {
            airportName: value.name,
            location: value.city
        }
        dispatch(createAirport(realValue));
        handleCancel();
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        form.resetFields();
        setIsNewOpen(false);
    };
    useEffect(() => {
        if (isDoneCreate) {
            messageApi.open({
                type: 'success',
                content: 'This is a success message',
            });
            dispatch(setDoneCreate());
        }
    }, [isDoneCreate])
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