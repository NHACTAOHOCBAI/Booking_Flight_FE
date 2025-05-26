import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Layout, Menu, MenuProps, theme } from 'antd'
import { IoAirplaneOutline, IoSettingsOutline, IoTicketOutline } from 'react-icons/io5'
import { PiAirplaneInFlight, PiCityLight, PiSeat } from 'react-icons/pi'
import { VscAccount } from 'react-icons/vsc'
import { GoLocation } from 'react-icons/go'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlineAirlines } from 'react-icons/md'

import { AppContext } from '@/context/app.context'
const { Header, Sider, Content } = Layout

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const { profile } = useContext(AppContext)
  const permissions = profile?.permissions
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions

  useEffect(() => {
    const ACL_ENABLE = import.meta.env.VITE_ACL_ENABLE
    if (permissions?.length || ACL_ENABLE === 'false') {
      const viewCity = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['CITIES']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['CITIES']['GET_PAGINATE'].method
      )

      const viewAirport = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['AIRPORTS']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['AIRPORTS']['GET_PAGINATE'].method
      )

      const viewPlane = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['PLANES']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['PLANES']['GET_PAGINATE'].method
      )

      const viewFlight = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['FLIGHTS']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['FLIGHTS']['GET_PAGINATE'].method
      )

      const viewAirline = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['AIRLINES']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['AIRLINES']['GET_PAGINATE'].method
      )

      const viewSeatClass = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['SEATCLASSES']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['SEATCLASSES']['GET_PAGINATE'].method
      )

      const viewAccount = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['ACCOUNTS']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['ACCOUNTS']['GET_PAGINATE'].method
      )

      const viewTicket = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['TICKETS']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['TICKETS']['GET_PAGINATE'].method
      )

      const viewRole = permissions?.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS['ROLES']['GET_PAGINATE'].apiPath &&
          item.method === ALL_PERMISSIONS['ROLES']['GET_PAGINATE'].method
      )

      const full = [
        {
          key: 'dashboard',
          icon: <RxDashboard style={{ width: 20, height: 20 }} />,
          label: <Link to={'/admin'}>Dashboard</Link>
        },
        ...(viewCity || ACL_ENABLE === 'false'
          ? [
              {
                key: 'city',
                icon: <PiCityLight style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-city'}>City</Link>
              }
            ]
          : []),

        ...(viewAirport || ACL_ENABLE === 'false'
          ? [
              {
                key: 'airport',
                icon: <GoLocation style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-airport'}>Airport</Link>
              }
            ]
          : []),
        ...(viewPlane || ACL_ENABLE === 'false'
          ? [
              {
                key: 'plane',
                icon: <IoAirplaneOutline style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-plane'}>Plane</Link>
              }
            ]
          : []),

        ...(viewFlight || ACL_ENABLE === 'false'
          ? [
              {
                key: 'flight2',
                icon: <PiAirplaneInFlight style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-flight'}>Flight</Link>
              }
            ]
          : []),
        ...(viewSeatClass || ACL_ENABLE === 'false'
          ? [
              {
                key: 'seatClass',
                icon: <PiSeat style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-seat'}>Seat Class</Link>
              }
            ]
          : []),
        ...(viewAirline || ACL_ENABLE === 'false'
          ? [
              {
                key: 'airline',
                icon: <MdOutlineAirlines style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-airline'}>Airline</Link>
              }
            ]
          : []),
        ...(viewAccount || ACL_ENABLE === 'false'
          ? [
              {
                key: 'account',
                icon: <VscAccount style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-account'}>Account</Link>
              }
            ]
          : []),
        ...(viewTicket || ACL_ENABLE === 'false'
          ? [
              {
                key: 'ticket',
                icon: <IoTicketOutline style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-ticket'}>Ticket</Link>
              }
            ]
          : []),
        ...(viewRole || ACL_ENABLE === 'false'
          ? [
              {
                key: 'role',
                icon: <IoSettingsOutline style={{ width: 20, height: 20 }} />,
                label: <Link to={'/admin/manage-role'}>Role</Link>
              }
            ]
          : [])
      ]

      setMenuItems(full)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions])

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
          <div style={{ justifySelf: 'start' }}>Cities</div>
          <div style={{ marginRight: 40, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar size={35} icon={<UserOutlined />} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: '1.2' }}>
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>John Doe</span>
              <span style={{ color: 'gray', fontSize: '12px' }}>
                <Badge status='processing' />
                <span> Admin </span>
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
