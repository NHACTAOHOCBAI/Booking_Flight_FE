import { cityOptions } from '@/utils/select'
import { Form, FormProps, Input, Modal, Select } from 'antd'
import { GoLocation } from 'react-icons/go'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { PiCity } from 'react-icons/pi'
interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}

const NewAirport = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<IAirportTable>['onFinish'] = async (value) => {
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
      <Modal
        title={
          <div>
            <GoLocation /> New Airport
          </div>
        }
        open={isNewOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<IAirportTable>
            label={
              <div>
                <LuScanBarcode /> Code
              </div>
            }
            name='airportCode'
            rules={[{ required: true, message: "Please input airport's code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IAirportTable>
            label={
              <div>
                <MdOutlineDriveFileRenameOutline /> Name
              </div>
            }
            name='airportName'
            rules={[{ required: true, message: "Please input airport's name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IAirportTable>
            label={
              <div>
                <PiCity /> City
              </div>
            }
            name='cityId'
            rules={[{ required: true, message: "Please input airport's city" }]}
          >
            <Select options={cityOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewAirport
