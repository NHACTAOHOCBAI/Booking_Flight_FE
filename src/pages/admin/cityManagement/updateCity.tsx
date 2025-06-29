import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateCity } from '@/hooks/useCity'
import { Form, FormProps, Input, message, Modal } from 'antd'
import _ from 'lodash'
import { useEffect } from 'react'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'

interface IProp {
  updatedCity: ICityTable
  setUpdatedCity: (value: ICityTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}
const UpdateCity = (props: IProp) => {
  const { updatedCity, setUpdatedCity, isUpdateOpen, setIsUpdateOpen, refetchData } = props
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const updateCitiesMutation = useUpdateCity()

  const onFinish: FormProps<ICityTable>['onFinish'] = async (value) => {
    const isDirty = !_.isEqual(value, { cityCode: updatedCity.cityCode, cityName: updatedCity.cityName })
    if (!isDirty) {
      messageApi.open({
        type: 'error',
        content: 'No Field Change'
      })
      return
    }

    const body = { id: updatedCity.id, cityCode: value.cityCode, cityName: value.cityName }
    updateCitiesMutation.mutate(body, {
      onSuccess: async () => {
        await refetchData()
        messageApi.success('Update city successfully')
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
