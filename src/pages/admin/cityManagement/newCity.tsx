import { useCreateCity } from '@/hooks/useCity'
import { Form, FormProps, Input, message, Modal, Skeleton } from 'antd'
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

  const [messageApi, contextHolder] = message.useMessage()
  const newCitiesMutation = useCreateCity()

  const onFinish: FormProps<ICityTable>['onFinish'] = async (value) => {
    const body = { cityCode: value.cityCode, cityName: value.cityName }
    newCitiesMutation.mutate(body, {
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
    <>
      {contextHolder}
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
        {newCitiesMutation.isPending ? (
          <Skeleton active />
        ) : (
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
              <Input placeholder="City's code" />
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
              <Input placeholder="City's name" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default NewCity
