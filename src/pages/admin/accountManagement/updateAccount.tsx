/* eslint-disable react-hooks/exhaustive-deps */
import roleApi from '@/apis/role.api'
import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateAccount } from '@/hooks/useAccount'
import { useQuery } from '@tanstack/react-query'
import { Col, Form, FormProps, Input, message, Modal, Row, Select } from 'antd'
import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { GrUserAdmin } from 'react-icons/gr'
import { MdOutlineDriveFileRenameOutline, MdOutlinePhone } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { TfiEmail } from 'react-icons/tfi'

interface IProp {
  updatedAccount: IAccountTable
  setUpdatedAccount: (value: IAccountTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdateAccount = (props: IProp) => {
  const { updatedAccount, setUpdatedAccount, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const updateAccountMutation = useUpdateAccount()

  const onFinish: FormProps<IAccountTable>['onFinish'] = async (value) => {
    const initialValue = _.omit(updatedAccount, ['id'])
    const isDirty = !_.isEqual(value, initialValue)
    if (!isDirty) {
      messageApi.open({
        type: 'error',
        content: 'No Field Change'
      })
      return
    }
    const body = {
      id: updatedAccount.id,
      email: value.email,
      fullName: value.fullName,
      password: value.password,
      username: value.username,
      roleId: value.roleId,
      phone: value.phone
    }
    updateAccountMutation.mutate(body, {
      onSuccess(data) {
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
      }
    })
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedAccount({
      id: '',
      username: '',
      phone: '',
      fullName: '',
      email: '',
      password: '',
      roleId: '3'
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedAccount.id,
      username: updatedAccount.username,
      password: updatedAccount.password,
      email: updatedAccount.email,
      phone: updatedAccount.phone,
      fullName: updatedAccount.fullName,
      roleId: updatedAccount.roleId
    })
  }, [updatedAccount])

  const roleData = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleApi.getRoles({}),
    enabled: isUpdateOpen
  })
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
      <Modal width={1050} title='Update Account' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
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
                <Input />
              </Form.Item>

              <Form.Item<IAccountTable>
                label={
                  <div>
                    <MdOutlineDriveFileRenameOutline /> Username
                  </div>
                }
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input username'
                  }
                ]}
              >
                <Input />
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
                <Input />
              </Form.Item>
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
                  <Input />
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={15}>
                <Form.Item<IAccountTable>
                  label={
                    <div>
                      <GrUserAdmin /> Role
                    </div>
                  }
                  name='roleId'
                  rules={[
                    {
                      required: true,
                      message: 'Please input roleId'
                    }
                  ]}
                >
                  <Select placeholder={updatedAccount.roleId} options={roleOptions} />
                </Form.Item>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateAccount
