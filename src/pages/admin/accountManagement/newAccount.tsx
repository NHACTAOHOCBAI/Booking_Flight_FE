import { Col, Form, FormProps, Input, message, Modal, Row, Select, UploadFile } from 'antd'
import { MdOutlineDriveFileRenameOutline, MdOutlinePhone } from 'react-icons/md'

import { onErrorUtil } from '@/globalType/util.type'
import { useCreateAccount } from '@/hooks/useAccount'
import { useGetAllRoles } from '@/hooks/useRole'
import { useMemo, useState } from 'react'
import { GrUserAdmin } from 'react-icons/gr'
import { RiLockPasswordLine } from 'react-icons/ri'
import { TfiEmail } from 'react-icons/tfi'
import UploadImage from '@/components/UploadFile'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}
const NewAccount = (props: IProp) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const { isNewOpen, setIsNewOpen, refetchData } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const { mutate: newAccountMutation, isPending } = useCreateAccount()

  const onFinish: FormProps<IAccountTable>['onFinish'] = async (value) => {
    const body = {
      account: {
        email: value.email,
        fullName: value.fullName,
        password: value.password,
        username: value.username,
        roleId: value.role,
        phone: value.phone
      },
      ...(fileList &&
        fileList.length > 0 && {
          avatar: fileList[0].originFileObj as File
        })
    }
    newAccountMutation(body, {
      onSuccess: async (data) => {
        await refetchData()
        messageApi.open({
          type: 'success',
          content: data.message
        })
        handleCancel()
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
    setFileList([])
    form.resetFields()
    setIsNewOpen(false)
  }

  const roleData = useGetAllRoles({}, isNewOpen)
  const roleOptions = useMemo(
    () =>
      roleData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.roleName
        }
      }),
    [roleData]
  )
  return (
    <>
      {contextHolder}
      <Modal width={1050} title='New Account' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Row gutter={10}>
            <Col span={12}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#95a5a6'
                }}
              >
                Account information
              </div>

              <Form.Item<IAccountTable>
                label={
                  <div>
                    <TfiEmail /> Email
                  </div>
                }
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input email'
                  }
                ]}
              >
                <Input placeholder='Email' />
              </Form.Item>

              <Form.Item<IAccountTable>
                label={
                  <div>
                    <RiLockPasswordLine /> Password
                  </div>
                }
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input password'
                  }
                ]}
              >
                <Input placeholder='Password' />
              </Form.Item>
              <div className='mb-[10px]'>
                <h3 className='mb-[10px]'>
                  Avatar<span className='text-gray-300'>{' (optional)'}</span>
                </h3>
                <UploadImage isPending={isPending} fileList={fileList} setFileList={setFileList} />
              </div>
            </Col>
            <Col span={1}>
              <div style={{ marginLeft: 18, backgroundColor: '#c8d6e5', height: '100%', width: 1.5 }}></div>
            </Col>
            <Col span={11}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#95a5a6'
                }}
              >
                Personal information
              </div>
              <Col span={24}>
                <Form.Item<IAccountTable>
                  label={
                    <div>
                      <MdOutlineDriveFileRenameOutline /> Full name
                    </div>
                  }
                  name='fullName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input full name'
                    }
                  ]}
                >
                  <Input placeholder='Full name' />
                </Form.Item>
              </Col>
              <Col span={15}>
                <Form.Item<IAccountTable>
                  label={
                    <div>
                      <MdOutlinePhone /> Phone
                    </div>
                  }
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: 'Please input phone'
                    }
                  ]}
                >
                  <Input placeholder='Phone' />
                </Form.Item>
              </Col>
              <Col span={15}>
                <Form.Item<IAccountTable>
                  label={
                    <div>
                      <GrUserAdmin /> Role
                    </div>
                  }
                  name='role'
                  rules={[
                    {
                      required: true,
                      message: 'Please input role'
                    }
                  ]}
                >
                  <Select options={roleOptions} placeholder='Role' />
                </Form.Item>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
export default NewAccount
