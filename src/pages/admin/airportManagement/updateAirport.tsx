import cityApi from '@/apis/city.api'
import { useUpdateAirport } from '@/hooks/useAirport'
import { useQuery } from '@tanstack/react-query'
import { Form, FormProps, Input, message, Modal, Select } from 'antd'
import { useEffect, useMemo } from 'react'
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
  const [messageApi, contextHolder] = message.useMessage()
  const updateAirportMutation = useUpdateAirport()

  const onFinish: FormProps<IAirportTable>['onFinish'] = async (value) => {
    const body = {
      id: value.id as string,
      airportCode: value.airportCode,
      airportName: value.airportName,
      cityCode: value.cityCode
    }
    updateAirportMutation.mutate(body, {
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
    setUpdatedAirport({
      id: '',
      airportCode: '',
      airportName: '',
      cityCode: ''
    })
    setIsUpdateOpen(false)
  }

  const citiesData = useQuery({
    queryKey: ['cities'],
    queryFn: cityApi.getCities,
    enabled: isUpdateOpen
  })
  const cityOptions = useMemo(
    () =>
      citiesData.data?.data.map((value) => {
        return {
          value: value.cityName,
          label: value.cityName
        }
      }),
    [citiesData]
  )

  useEffect(() => {
    form.setFieldsValue({
      id: updatedAirport.id,
      airportCode: updatedAirport.airportCode,
      airportName: updatedAirport.airportName,
      cityCode: updatedAirport.cityCode
    })
  }, [form, updatedAirport])
  return (
    <>
      {contextHolder}
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
            name='cityCode'
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
