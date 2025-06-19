/* eslint-disable react-hooks/exhaustive-deps */
import { saveProfileToLS } from '@/apis/auth.api'
import UploadImage from '@/components/UploadFile'
import { AppContext } from '@/context/app.context'
import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateAccount } from '@/hooks/useAccount'
import { useGetMyProfile } from '@/hooks/useMyProfile'
import { useGetAllRoles } from '@/hooks/useRole'

import { Col, Form, FormProps, Input, message, Modal, Row, Select, UploadFile } from 'antd'
import _ from 'lodash'
import { useContext, useEffect, useMemo, useState } from 'react'
import { GrUserAdmin } from 'react-icons/gr'
import { MdOutlineDriveFileRenameOutline, MdOutlinePhone } from 'react-icons/md'
import { TfiEmail } from 'react-icons/tfi'

interface IProp {
  updatedAccount: IAccountTable
  setUpdatedAccount: (value: IAccountTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}
const UpdateAccount = (props: IProp) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { updatedAccount, setUpdatedAccount, isUpdateOpen, setIsUpdateOpen, refetchData } = props
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const { mutate: updateAccountMutation, isPending } = useUpdateAccount()
  const { refetch } = useGetMyProfile()

  const { setProfile } = useContext(AppContext)
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
      account: {
        id: updatedAccount.id,
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
    updateAccountMutation(body, {
      onSuccess: async () => {
        const { data: userData } = await refetch()
        if (userData) {
          setProfile(userData.data)
          saveProfileToLS(userData.data)
        }
        await refetchData()

        messageApi.success('Update account successfully')
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
    setFileList([])
    form.resetFields()
    setUpdatedAccount({
      id: '',
      username: '',
      phone: '',
      fullName: '',
      email: '',
      role: { roleName: '', description: '', permissions: [] }
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedAccount.id,
      username: updatedAccount.username,
      email: updatedAccount.email,
      phone: updatedAccount.phone,
      fullName: updatedAccount.fullName,
      roleId: updatedAccount.role
    })
    setFileList([
      {
        uid: '-1',
        name: 'avatar.jpg',
        status: 'done',
        url: updatedAccount.avatar as string
      }
    ])
  }, [updatedAccount])

  const roleData = useGetAllRoles({}, isUpdateOpen)
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
      <Modal title='Update Account' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
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
          <Form.Item<IAccountTable>
            label={
              <div>
                <MdOutlinePhone /> Phone
              </div>
            }
            name='phone'
          >
            <Input />
          </Form.Item>
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
                message: 'Please input roleId'
              }
            ]}
          >
            <Select placeholder={updatedAccount.role?.roleName} options={roleOptions} />
          </Form.Item>
          <div className='mb-[10px]'>
            <h3 className='mb-[10px]'>
              Avatar<span className='text-gray-300'>{' (optional)'}</span>
            </h3>
            <UploadImage isPending={isPending} fileList={fileList} setFileList={setFileList} />
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateAccount
