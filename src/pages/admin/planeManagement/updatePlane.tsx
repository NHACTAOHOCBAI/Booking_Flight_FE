import { useUpdatePlane } from '@/hooks/usePlane'
import { airlineOptions } from '@/utils/select'
import { Form, FormProps, Input, message, Modal, Select } from 'antd'
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
  const [messageApi, contextHolder] = message.useMessage()
  const updatePlaneMutation = useUpdatePlane()

  const onFinish: FormProps<IPlaneTable>['onFinish'] = async (value) => {
    const body = {
      planeCode: value.planeCode,
      planeName: value.planeName,
      airlineId: value.airlineId
    }
    updatePlaneMutation.mutate(body, {
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
    setUpdatedPlane({
      id: '',
      planeCode: '',
      planeName: '',
      airlineId: ''
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
      {contextHolder}
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
