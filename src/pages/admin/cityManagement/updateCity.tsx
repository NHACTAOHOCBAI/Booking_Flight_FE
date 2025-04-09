/* eslint-disable react-hooks/exhaustive-deps */
import cityApi from '@/apis/city.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, FormProps, Input, Modal } from 'antd'
import { useEffect } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

interface IProp {
  updatedCity: ICityTable
  setUpdatedCity: (value: ICityTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdateCity = (props: IProp) => {
  const { updatedCity, setUpdatedCity, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const newCitiesMutation = useMutation({
    mutationFn: (body: ICityTable) => cityApi.updateCity(body),
    onSuccess: (data) => {
      console.log('Cập nhật thành phố thành công:', data)
      queryClient.invalidateQueries({ queryKey: ['cities'] })
    },
    onError: (error) => {
      console.log('Lỗi cập nhật thành phố:', error)
    }
  })

  const onFinish: FormProps<ICityTable>['onFinish'] = async (value) => {
    newCitiesMutation.mutate(value)
    handleCancel()
  }

  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedCity({
      id: '',
      cityCode: '',
      cityName: ''
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedCity.id,
      cityCode: updatedCity.cityCode,
      cityName: updatedCity.cityName
    })
  }, [updatedCity])
  return (
    <>
      <Modal title='Update City' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<ICityTable>
            label={
              <div>
                <HiDotsVertical /> ID
              </div>
            }
            name='id'
          >
            <Input disabled />
          </Form.Item>
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
export default UpdateCity
