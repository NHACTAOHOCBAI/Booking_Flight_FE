import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, Layout, Menu, MenuProps, message, Modal, theme } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { RxDashboard } from 'react-icons/rx'
import { VscAccount } from 'react-icons/vsc'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { AppContext } from '@/context/app.context'
import { GoLocation } from 'react-icons/go'
import { IoAirplaneOutline, IoTicketOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineAirlines } from 'react-icons/md'
import { PiCityLight, PiAirplaneInFlight, PiSeat } from 'react-icons/pi'
import React from 'react'
import { clearLocalStorage } from '@/apis/auth.api'
import { TbExclamationCircleFilled } from 'react-icons/tb'
import { useLogout } from '@/hooks/useAuth'

const menuStyle: React.CSSProperties = {
  padding: '8px 15px',
  cursor: 'pointer'
}
const { Header, Sider, Content } = Layout

const AdminLayout = () => {
  const { pathname } = useLocation()
  const endpoints = pathname.split('/').pop() as string
  const [collapsed, setCollapsed] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const { profile } = useContext(AppContext)
  const permissions = profile?.role?.permissions

  const { PERMISSIONS, isPermissionsReady } = useContext(AppContext)
  const ALL_PERMISSIONS = PERMISSIONS.permissions
  // console.log(ALL_PERMISSIONS)
  useEffect(() => {
    if (!isPermissionsReady) return

    const ACL_ENABLE = import.meta.env.VITE_ACL_ENABLE
    if (permissions?.length || ACL_ENABLE === 'false') {
      const viewAccount = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS.ACCOUNTS.GET_ACCOUNTS.apiPath &&
          item.method === ALL_PERMISSIONS['ACCOUNTS']['GET_ACCOUNTS'].method
      )

      const viewCity = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['CITIES']['GET_CITIES'].apiPath &&
          item.method === ALL_PERMISSIONS['CITIES']['GET_CITIES'].method
      )
      // const viewCity = 1

      // const viewAirport = 1
      const viewAirport = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['AIRPORTS']['GET_AIRPORTS'].apiPath &&
          item.method === ALL_PERMISSIONS['AIRPORTS']['GET_AIRPORTS'].method
      )

      const viewPlane = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['PLANES']['GET_PLANES'].apiPath &&
          item.method === ALL_PERMISSIONS['PLANES']['GET_PLANES'].method
      )

      const viewFlight = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['FLIGHTS']['GET_FLIGHTS'].apiPath &&
          item.method === ALL_PERMISSIONS['FLIGHTS']['GET_FLIGHTS'].method
      )
      // const viewFlight = 1
      const viewAirline = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['AIRLINES']['GET_AIRLINES'].apiPath &&
          item.method === ALL_PERMISSIONS['AIRLINES']['GET_AIRLINES'].method
      )
      // const viewAirline = 1
      const viewSeatClass = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['SEATS']['GET_SEATS'].apiPath &&
          item.method === ALL_PERMISSIONS['SEATS']['GET_SEATS'].method
      )

      const viewTicket = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['TICKETS']['GET_TICKETS'].apiPath &&
          item.method === ALL_PERMISSIONS['TICKETS']['GET_TICKETS'].method
      )

      const viewRole = permissions?.find(
        (item) =>
          typeof item === 'object' &&
          item.apiPath === ALL_PERMISSIONS['ROLES']['GET_ROLES'].apiPath &&
          item.method === ALL_PERMISSIONS['ROLES']['GET_ROLES'].method
      )

      const full = [
        {
          key: 'dashboard',
          icon: <RxDashboard style={{ width: 20, height: 20 }} />,
          label: <Link to={'/admin'}>Dashboard</Link>
        },
        ...(viewAccount || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-account',
                icon: <VscAccount style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-account'}>Account</Link>
              }
            ]
          : []),
        ...(viewCity || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-city',
                icon: <PiCityLight style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-city'}>City</Link>
              }
            ]
          : []),

        ...(viewAirport || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-airport',
                icon: <GoLocation style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-airport'}>Airport</Link>
              }
            ]
          : []),
        ...(viewPlane || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-plane',
                icon: <IoAirplaneOutline style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-plane'}>Plane</Link>
              }
            ]
          : []),

        ...(viewFlight || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-flight',
                icon: <PiAirplaneInFlight style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-flight'}>Flight</Link>
              }
            ]
          : []),
        ...(viewSeatClass || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-seat',
                icon: <PiSeat style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-seat'}>Seat Class</Link>
              }
            ]
          : []),
        ...(viewAirline || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-airline',
                icon: <MdOutlineAirlines style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-airline'}>Airline</Link>
              }
            ]
          : []),

        ...(viewTicket || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-ticket',
                icon: <IoTicketOutline style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-ticket'}>Ticket</Link>
              }
            ]
          : []),
        ...(viewRole || ACL_ENABLE === 'false'
          ? [
              {
                key: 'manage-role',
                icon: <IoSettingsOutline style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-role'}>Role</Link>
              }
            ]
          : [])
      ]

      setMenuItems(full)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions, isPermissionsReady])

  const logoutMutation = useLogout()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { confirm } = Modal
  const showConfirm = () => {
    confirm({
      title: 'Confirm logout',
      icon: <TbExclamationCircleFilled />,
      content: 'Do you111  want to logout?',
      onOk() {
        let body: void
        logoutMutation.mutate(body, {
          onSuccess() {
            clearLocalStorage()
            setIsAuthenticated(false)
            setProfile(null)
            message.success('logout success')
          }
        })
      },
      onCancel() {}
    })
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to='/myProfile'> My profile</Link>
    },
    {
      key: '2',
      label: <button onClick={showConfirm}>Logout</button>
    }
  ]
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider
        style={{ background: colorBgContainer, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div
          className='demo-logo-vertical'
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
        >
          <img
            src='../../logo.png'
            alt='Logo'
            style={{ width: '100%' }}
            onClick={() => {
              navigate('/')
            }}
          />
        </div>
        <Menu
          style={{ border: 'none', marginBottom: 50 }}
          theme='light'
          mode='inline'
          selectedKeys={[endpoints]}
          defaultOpenKeys={['overview']}
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 50
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />

          <div style={{ marginRight: 40, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size={35} icon={<UserOutlined />} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: '1.2' }}>
              <Dropdown
                menu={{ items }}
                popupRender={(menu) => (
                  <div className='bg-transparent'>
                    {React.cloneElement(
                      menu as React.ReactElement<{
                        style: React.CSSProperties
                      }>,
                      { style: menuStyle }
                    )}
                  </div>
                )}
              >
                {/* <span className='cursor-pointer'>
                      <Space>{profile.fullName}</Space>
                    </span> */}
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{profile?.fullName}</span>
              </Dropdown>

              <span style={{ color: 'gray', fontSize: '12px' }}>
                <Badge status='processing' />

                <span> {profile?.role?.roleName}</span>
              </span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 10,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
