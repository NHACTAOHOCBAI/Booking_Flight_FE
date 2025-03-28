import { Modal, Input, Form, FormProps } from 'antd'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

interface Props {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
export default function NewAirline(props: Props) {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<IAirlineTable>['onFinish'] = (value) => {
    console.log(value)
    handleCancel()
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setIsNewOpen(false)
  }
  return (
    <div>
      <Modal title='New Airline' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} name='New Airline' layout='vertical' autoComplete='off' onFinish={onFinish}>
          <Form.Item
            label={
              <div>
                <LuScanBarcode /> Airline Code
              </div>
            }
            name='airlineCode'
            rules={[
              {
                required: true,
                message: "Please input airline's code"
              }
            ]}
          >
            <Input placeholder='Airline Code' />
          </Form.Item>
          <Form.Item
            label={
              <div>
                <MdOutlineDriveFileRenameOutline /> Airline Name
              </div>
            }
            name='airlineName'
            rules={[
              {
                required: true,
                message: "Please input airline's name"
              }
            ]}
          >
            <Input placeholder='Airline Name' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
