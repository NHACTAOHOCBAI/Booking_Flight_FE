import { Modal } from "antd";

interface IProp {
    isOpenError: boolean,
    setIsOpenError: (value: boolean) => void
    message: string
}
const Error = (prop: IProp) => {
    const { isOpenError, setIsOpenError, message } = prop;
    const handleOk = () => {
        setIsOpenError(false);
    }
    return (
        <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            closable={false} // Ẩn nút Cancel
            title="Error" open={isOpenError} onOk={handleOk}>
            {message}
        </Modal>

    )
}
export default Error