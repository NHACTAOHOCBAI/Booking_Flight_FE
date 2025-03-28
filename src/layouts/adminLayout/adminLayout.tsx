import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Layout, Menu, theme } from 'antd'
import { IoAirplaneOutline, IoSettingsOutline } from 'react-icons/io5'
import { PiAirplaneInFlight, PiCityLight, PiSeat } from 'react-icons/pi'
import { FaMapLocationDot } from "react-icons/fa6";
import { VscAccount } from 'react-icons/vsc'
import { GoLocation } from 'react-icons/go'
import { RxDashboard } from 'react-icons/rx'
import { MdDashboard, MdFlight } from 'react-icons/md'
const { Header, Sider, Content } = Layout

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider
        style={{ background: colorBgContainer, borderRight: '3px solid #dcdde1' }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className='demo-logo-vertical' style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <img src="../../logo.png" alt="Logo"
            style={{ width: "100%" }}
            onClick={() => { navigate("/") }}
          />
        </div>
        <Menu
          style={{ border: 'none', marginBottom: 50 }}
          theme='light'
          mode='inline'
          defaultOpenKeys={['overview']}
          defaultSelectedKeys={['dashboard']}
          items={[
            {
              key: 'overview',
              label: <div style={{ fontSize: 16 }}>Overview</div>,
              icon: <MdDashboard style={{ width: 20, height: 20 }} />,
              children: [
                {
                  key: 'dashboard',
                  icon: <RxDashboard style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin'}>Dashboard</Link>
                },
              ],
            },
            {
              key: 'location',
              label: <div style={{ fontSize: 16 }}>Location</div>,
              icon: <FaMapLocationDot style={{ width: 20, height: 20 }} />,
              children: [
                {
                  key: 'city',
                  icon: <PiCityLight style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin/manage-city'}>City</Link>
                },
                {
                  key: 'airport',
                  icon: <GoLocation style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin/manage-airport'}>Airport</Link>
                },
              ],
            },
            {
              key: 'flight',
              label: <div style={{ fontWeight: 'normal', fontSize: 16 }}>Flight</div>,
              icon: <MdFlight style={{ width: 20, height: 20 }} />,
              children: [
                {
                  key: 'plane',
                  icon: <IoAirplaneOutline style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin/manage-plane'}>Plane</Link>
                },
                {
                  key: 'flight',
                  icon: <PiAirplaneInFlight style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin/manage-flight'}>Flight</Link>
                },
                {
                  key: 'seatClass',
                  icon: <PiSeat style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin/manage-seat'}>Seat Class</Link>
                },
              ],
            },
            {
              key: 'other',
              label: <div style={{ fontWeight: 'normal', fontSize: 16 }}>Other</div>,
              icon: <MdDashboard style={{ width: 20, height: 20 }} />,
              children: [
                {
                  key: 'account',
                  icon: <VscAccount style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin/manage-account'}>Account</Link>
                },
                {
                  key: 'setting',
                  icon: <IoSettingsOutline style={{ width: 20, height: 20 }} />,
                  label: <Link to={'/admin/manage-airport'}>Setting</Link>
                }
              ],
            },

          ]}
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
            height: 40
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
          <div style={{ marginRight: 40, marginBottom: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  )
}

export default AdminLayout
