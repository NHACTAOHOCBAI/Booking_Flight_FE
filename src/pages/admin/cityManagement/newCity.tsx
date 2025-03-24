import { Form, FormProps, Input, Modal } from 'antd'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { PiCityLight } from 'react-icons/pi'
interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}

const NewCity = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<ICityTable>['onFinish'] = async (value) => {
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
            <PiCityLight /> New City
          </div>
        }
        open={isNewOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<ICityTable>
            label={
              <div>
                <LuScanBarcode /> Code
              </div>
            }
            name='cityCode'
            rules={[{ required: true, message: "Please input city's code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<ICityTable>
            label={
              <div>
                <MdOutlineDriveFileRenameOutline /> Name
              </div>
            }
            name='cityName'
            rules={[{ required: true, message: "Please input city's name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewCity
