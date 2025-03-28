/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormProps, Input, Modal } from 'antd'
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
  const onFinish: FormProps<IAirlineTable>['onFinish'] = (value) => {
    console.log(value)
    handleCancel()
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
