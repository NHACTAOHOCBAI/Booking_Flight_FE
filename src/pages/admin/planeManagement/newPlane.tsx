import { Form, FormProps, Input, Modal } from 'antd'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineAirlines } from 'react-icons/md'
import { PiAirplaneInFlight } from 'react-icons/pi'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}

const NewPlane = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<IPlaneTable>['onFinish'] = (value) => {
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
    <>
      <Modal title='New Plane' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<IPlaneTable>
            label={
              <div>
                <MdOutlineAirlines />
                Airline
              </div>
            }
            name='airlineId'
            rules={[{ required: true, message: "Please input airline's code" }]}
          >
            <Input placeholder="Enter airline's code" />
          </Form.Item>
          <Form.Item<IPlaneTable>
            label={
              <div>
                <LuScanBarcode />
                Model
              </div>
            }
            name='planeCode'
            rules={[{ required: true, message: "Please input plane's code" }]}
          >
            <Input placeholder="Enter plane's code" />
          </Form.Item>
          <Form.Item<IPlaneTable>
            label={
              <div>
                <PiAirplaneInFlight />
                PlaneName
              </div>
            }
            name='planeName'
            rules={[{ required: true, message: "Please input plane's name" }]}
          >
            <Input placeholder="Enter plane's name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewPlane
