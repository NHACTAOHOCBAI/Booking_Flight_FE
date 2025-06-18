import { onErrorUtil } from '@/globalType/util.type'
import { useCreateAirport } from '@/hooks/useAirport'
import { useGetAllCities } from '@/hooks/useCity'
import { Form, FormProps, Input, message, Modal, Select } from 'antd'
import { useMemo } from 'react'
import { GoLocation } from 'react-icons/go'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { PiCity } from 'react-icons/pi'
interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}

const NewAirport = (props: IProp) => {
  const { isNewOpen, setIsNewOpen, refetchData } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const newAirportMutation = useCreateAirport()

  const onFinish: FormProps<IAirportTable>['onFinish'] = async (value) => {
    const body = {
      airportCode: value.airportCode,
      airportName: value.airportName,
      cityId: value.cityId
    }
    newAirportMutation.mutate(body, {
      onSuccess: async () => {
        await refetchData()
        messageApi.success('Create airline successfully')
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
    setIsNewOpen(false)
  }

  const citiesData = useGetAllCities({}, isNewOpen)
  const cityOptions = useMemo(
    () =>
      citiesData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.cityName
        }
      }),
    [citiesData]
  )

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <div>
            <GoLocation /> New Airport
          </div>
        }
        open={isNewOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<IAirportTable>
            label={
              <div>
                <LuScanBarcode /> Code
              </div>
            }
            name='airportCode'
            rules={[{ required: true, message: "Please input airport's code" }]}
          >
            <Input placeholder="Airport's code" />
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
            <Input placeholder="Airport's name" />
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
            <Select options={cityOptions} placeholder="Airport's city" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewAirport
