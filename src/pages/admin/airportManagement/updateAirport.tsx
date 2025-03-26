/* eslint-disable react-hooks/exhaustive-deps */
import { cityOptions } from '@/utils/select'
import { Form, FormProps, Input, Modal, Select } from 'antd'
import { useEffect } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { PiCity } from 'react-icons/pi'

interface IProp {
  updatedAirport: IAirportTable
  setUpdatedAirport: (value: IAirportTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdateAirport = (props: IProp) => {
  const { updatedAirport, setUpdatedAirport, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<IAirportTable>['onFinish'] = (value) => {
    console.log(value)
    handleCancel()
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedAirport({
      id: '',
      airportCode: '',
      airportName: '',
      cityId: ''
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedAirport.id,
      airportCode: updatedAirport.airportCode,
      airportName: updatedAirport.airportName,
      cityId: updatedAirport.cityId
    })
  }, [updatedAirport])
  return (
    <>
      <Modal title='Update Airport' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<IAirportTable>
            label={
              <div>
                <HiDotsVertical /> ID
              </div>
            }
            name='id'
          >
            <Input disabled />
          </Form.Item>
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
export default UpdateAirport
