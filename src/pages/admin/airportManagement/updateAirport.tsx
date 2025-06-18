import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateAirport } from '@/hooks/useAirport'
import { useGetAllCities } from '@/hooks/useCity'
import { Form, FormProps, Input, message, Modal, Select } from 'antd'
import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import { PiCity } from 'react-icons/pi'

interface IProp {
  updatedAirport: IAirportTable
  setUpdatedAirport: (value: IAirportTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}
const UpdateAirport = (props: IProp) => {
  const { updatedAirport, setUpdatedAirport, isUpdateOpen, setIsUpdateOpen, refetchData } = props
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const updateAirportMutation = useUpdateAirport()

  const onFinish: FormProps<IAirportTable>['onFinish'] = async (value) => {
    const initialValue = _.omit(updatedAirport, ['id', 'cityName'])
    const isDirty = !_.isEqual(value, initialValue)
    if (!isDirty) {
      messageApi.open({
        type: 'error',
        content: 'No Field Change'
      })
      return
    }
    console.log(value)
    const body = {
      id: updatedAirport.id,
      airportCode: value.airportCode,
      airportName: value.airportName,
      cityId: value.cityId
    }
    updateAirportMutation.mutate(body, {
      onSuccess: async () => {
        await refetchData()
        messageApi.success('Update airline successfully')
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
    setUpdatedAirport({
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
      cityName: updatedAirport.cityName,
      cityId: updatedAirport.cityId
    })
  }, [form, updatedAirport])

  const citiesData = useGetAllCities({}, isUpdateOpen)
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
      <Modal title='Update Airport' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <Select placeholder={updatedAirport.cityName} options={cityOptions} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateAirport
