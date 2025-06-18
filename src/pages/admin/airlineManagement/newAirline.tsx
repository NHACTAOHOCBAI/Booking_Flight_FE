import { onErrorUtil } from '@/globalType/util.type'
import { useCreateAirline } from '@/hooks/useAirline'
import { Modal, Input, Form, FormProps, message } from 'antd'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

interface Props {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}

export default function NewAirline(props: Props) {
  const { isNewOpen, setIsNewOpen, refetchData } = props
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
      onSuccess: async () => {
        await refetchData()
        messageApi.success('Create Airline successfully')
        handleCancel()
      },
      onError(error: Error) {
        console.log(error)
        const messageError = onErrorUtil(error)
        messageApi.open({
          type: messageError.type,
          content: messageError.content
        })
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
