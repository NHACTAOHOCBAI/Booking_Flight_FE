/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Collapse, Row, Tooltip } from 'antd'
import { ProFormSwitch } from '@ant-design/pro-components'
import { grey } from '@ant-design/colors'
import type { ProFormInstance } from '@ant-design/pro-components'
import { useContext, useEffect } from 'react'
import type { CollapseProps } from 'antd'
import { colorMethod, groupByPermission } from '@/utils/utils'
import { AppContext } from '@/context/app.context'
import { IPermission } from '@/globalType/permission.type'

interface IProps {
  onChange?: (data: any[]) => void
  onReset?: () => void
  form: ProFormInstance

  singleRole: IRoleTable | null
  openModal: boolean
}

const ModuleApi = (props: IProps) => {
  const { form, singleRole, openModal } = props

  const { PERMISSIONS } = useContext(AppContext)
  const listPermissions = PERMISSIONS.permissions
  useEffect(() => {
    if (listPermissions && singleRole?.id && openModal === true) {
      //current permissions of role

      const userPermissions = groupByPermission(singleRole.permissions as IPermission[])

      const p: any = {}

      Object.entries(listPermissions).forEach(([model, perms]) => {
        let allChecked = true
        const userModel = userPermissions.find((up) => up.model === model)
        Object.keys(perms).forEach((permId) => {
          p[permId] = false
          if (userModel) {
            const hasPerm = userModel.permissions.find((perm) => perm.name === permId)
            if (hasPerm) {
              p[permId] = true
              handleSingleCheck(true, hasPerm.id as string, model)
            } else {
              allChecked = false
            }
          } else {
            allChecked = false
          }
        })

        // Đánh dấu model nếu user có tất cả quyền trong model đó
        p[model] = allChecked
        if (allChecked) handleSwitchAll(true, model)
      })

      form.setFieldsValue({
        roleName: singleRole.roleName,
        permissions: {
          ...p
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal])
  const handleSwitchAll = (value: boolean, model: string) => {
    const perms = listPermissions[model]
    if (!perms) return

    const currentPermissionModel = form.getFieldValue('permissionModel') || {}
    const currentPermissionIds = form.getFieldValue('permissionIds') || {}

    const newPermissionIds = { ...currentPermissionIds }

    Object.values(perms).forEach((perm) => {
      if (value) {
        newPermissionIds[perm.id!] = true
      } else {
        delete newPermissionIds[perm.id!]
      }
    })

    const newPermissionModel = {
      ...currentPermissionModel,
      [model]: value
    }

    form.setFieldsValue({
      permissionModel: newPermissionModel,
      permissionIds: newPermissionIds
    })
  }
  const handleSingleCheck = (value: boolean, permId: string, model: string) => {
    const currentPermissionIds = form.getFieldValue('permissionIds') || {}
    const currentPermissionModel = form.getFieldValue('permissionModel') || {}

    const newPermissionIds = { ...currentPermissionIds }

    if (value) {
      newPermissionIds[permId] = true
    } else {
      delete newPermissionIds[permId]
    }

    // Kiểm tra xem tất cả quyền con của model có đang bật không
    const perms = listPermissions[model]
    const allChecked = Object.values(perms).every((perm) => newPermissionIds[perm.id!])

    const newPermissionModel = {
      ...currentPermissionModel,
      [model]: allChecked
    }

    form.setFieldsValue({
      permissionModel: newPermissionModel,
      permissionIds: newPermissionIds
    })
  }

  // Convert the data structure for use with `items` prop
  const panels: CollapseProps['items'] = Object.entries(listPermissions).map(([model, perms], index) => ({
    key: `${index}-${model}`, // key của panel là tên model
    label: <div>{model}</div>,
    forceRender: true,
    extra: (
      <div className='customize-form-item'>
        <ProFormSwitch
          name={['permissionModel', model]} // dùng model làm key ở cấp cha
          valuePropName='checked'
          fieldProps={{
            onClick: (_u, e) => e.stopPropagation(),
            onChange: (value) => {
              handleSwitchAll(value, model)
            }
          }}
        />
      </div>
    ),
    children: (
      <Row gutter={[16, 16]}>
        {Object.entries(perms).map(([_permKey, perm], i) => (
          <Col lg={12} md={12} sm={24} key={`${i}-${perm.id}`}>
            {/* dùng perm.id làm key */}
            <Card size='small' className='flex flex-row'>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ProFormSwitch
                  name={['permissionIds', perm.id]} // dùng perm.id làm key cho switch con
                  valuePropName='checked'
                  fieldProps={{
                    onChange: (v) => handleSingleCheck(v, perm.id as string, model)
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Tooltip title={perm.name}>
                  <p style={{ paddingLeft: 10, marginBottom: 3 }}>{_permKey}</p>
                  <div style={{ display: 'flex' }}>
                    <p
                      style={{
                        paddingLeft: 10,
                        fontWeight: 'bold',
                        marginBottom: 0,
                        color: colorMethod(perm.method as string)
                      }}
                    >
                      {perm.method}
                    </p>
                    <p style={{ paddingLeft: 10, marginBottom: 0, color: grey[5] }}>{perm.apiPath}</p>
                  </div>
                </Tooltip>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }))

  return (
    <Card size='small'>
      <Collapse items={panels} />
    </Card>
  )
}

export default ModuleApi
