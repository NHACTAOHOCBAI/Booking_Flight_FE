
import { airlineOptions } from '@/utils/select'
import { Form, FormProps, Input, Modal, Select } from 'antd'
import { useEffect } from 'react'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineAirlines } from 'react-icons/md'
import { SlPlane } from 'react-icons/sl'

interface IProp {
  updatedPlane: IPlaneTable
  setUpdatedPlane: (value: IPlaneTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdatePlane = (props: IProp) => {
  const { updatedPlane, setUpdatedPlane, isUpdateOpen, setIsUpdateOpen } = props
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
    setUpdatedPlane({
      id: '',
      planeCode: '',
      planeName: ''
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedPlane.id,
      airlineId: updatedPlane.airlineId,
      planeCode: updatedPlane.planeCode,
      planeName: updatedPlane.planeName
    })
  }, [form, updatedPlane])
  return (
    <>
      <Modal title='Update Plane' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
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
                <SlPlane />
                Name
              </div>
            }
            name='planeName'
            rules={[{ required: true, message: "Please input plane's name" }]}
          >
            <Input placeholder="Enter plane's name" />
          </Form.Item>
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
            <Select options={airlineOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdatePlane
