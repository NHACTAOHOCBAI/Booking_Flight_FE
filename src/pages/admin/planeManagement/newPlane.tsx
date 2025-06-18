import { onErrorUtil } from '@/globalType/util.type'
import { useGetAllAirlines } from '@/hooks/useAirline'
import { useCreatePlane } from '@/hooks/usePlane'
import { Form, FormProps, Input, message, Modal, Select } from 'antd'
import { useMemo } from 'react'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineAirlines } from 'react-icons/md'
import { SlPlane } from 'react-icons/sl'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}

const NewPlane = (props: IProp) => {
  const { isNewOpen, setIsNewOpen, refetchData } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const newCitiesMutation = useCreatePlane()

  const onFinish: FormProps<IPlaneTable>['onFinish'] = async (value) => {
    const body = {
      planeCode: value.planeCode,
      planeName: value.planeName,
      airlineId: value.airlineId
    }
    newCitiesMutation.mutate(body, {
      onSuccess: async () => {
        await refetchData();
        messageApi.success("Create plane successfully");
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
    setIsNewOpen(false)
  }

  const airlinesData = useGetAllAirlines({}, isNewOpen)
  const airlineOptions = useMemo(
    () =>
      airlinesData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.airlineName
        }
      }),
    [airlinesData]
  )
  return (
    <>
      {contextHolder}
      <Modal title='New Plane' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
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

export default NewPlane
