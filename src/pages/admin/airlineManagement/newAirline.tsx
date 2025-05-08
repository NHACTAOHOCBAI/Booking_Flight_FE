import { useCreateAirline } from '@/hooks/useAirline'
import { Modal, Input, Form, FormProps, message } from 'antd'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

interface Props {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
export default function NewAirline(props: Props) {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const newAirlineMutation = useCreateAirline()

  const onFinish: FormProps<IAirlineTable>['onFinish'] = async (value) => {
    const body = {
      id: value.id,
      airlineCode: value.airlineCode,
      airlineName: value.airlineName
    }
    newAirlineMutation.mutate(body, {
      onSuccess(data) {
        messageApi.open({
          type: 'success',
          content: data.message
        })
      },
      onError(error) {
        console.log(error)
        messageApi.open({
          type: 'error',
          content: error.message
        })
      },
      onSettled() {
        handleCancel()
      }
    })
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
      {contextHolder}
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
