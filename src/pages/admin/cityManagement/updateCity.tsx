import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateCity } from '@/hooks/useCity'
import { Form, FormProps, Input, message, Modal } from 'antd'
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
  const [messageApi, contextHolder] = message.useMessage()
  const updateCitiesMutation = useUpdateCity()

  const onFinish: FormProps<ICityTable>['onFinish'] = async (value) => {
    const body = { id: value.id as string, cityCode: value.cityCode as string, cityName: value.cityName as string }
    updateCitiesMutation.mutate(body, {
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
  }, [form, updatedCity])
  return (
    <>
      {contextHolder}
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
