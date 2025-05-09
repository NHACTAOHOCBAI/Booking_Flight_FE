/* eslint-disable react-hooks/exhaustive-deps */
import { useUpdateAirline } from '@/hooks/useAirline'
import { Form, FormProps, Input, message, Modal } from 'antd'
import { useEffect } from 'react'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

interface Props {
  updatedAirline: IAirlineTable
  setUpdatedAirline: (value: IAirlineTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
export default function UpdatedAirline(props: Props) {
  const { updatedAirline, setUpdatedAirline, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const updateAirlineMutation = useUpdateAirline()

  const onFinish: FormProps<IAirlineTable>['onFinish'] = async (value) => {
    const body = {
      id: value.id,
      airlineCode: value.airlineCode,
      airlineName: value.airlineName
    }
    updateAirlineMutation.mutate(body, {
      onSuccess(data) {
        messageApi.open({
          type: 'success',
          content: data.message
        })
      },
      onError(error: Error) {
        console.log(error)
        const messageError = onErrorUtil(error)
        messageApi.open({
          type: messageError.type,
          content: messageError.content
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
    setUpdatedAirline({
      id: '',
      airlineCode: '',
      airlineName: ''
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedAirline.id,
      airlineName: updatedAirline.airlineName,
      airlineCode: updatedAirline.airlineCode
    })
  }, [updatedAirline])
  return (
    <div>
      {contextHolder}
      <Modal title='Update Airline' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} name='Update Airline' layout='vertical' autoComplete='off' onFinish={onFinish}>
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
            <Input />
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
