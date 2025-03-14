import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';
import {
    ApartmentOutlined,
    BarChartOutlined,
    EnvironmentOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SendOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{
            minHeight: "100vh"
        }}>
            <Sider style={{ background: colorBgContainer, borderRight: "3px solid #dcdde1" }} trigger={null} collapsible collapsed={collapsed} >
                <div className="demo-logo-vertical">
                </div>
                <Menu
                    style={{ border: "none" }}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <BarChartOutlined />,
                            label: <Link to={"/admin"} >Dashboard</Link>,
                        },
                        {
                            key: 'airport',
                            icon: <EnvironmentOutlined />,
                            label: <Link to={"/admin/manage-airport"} >Airport</Link>,
                        },
                        {
                            key: 'flight',
                            icon: <SendOutlined />,
                            label: <Link to={"/admin/manage-flight"} >Flight</Link>,
                        },
                        {
                            key: 'account',
                            icon: <UserOutlined />,
                            label: <Link to={"/admin/manage-account"} >Account</Link>,
                        },
                        {
                            key: 'seatClass',
                            icon: <ApartmentOutlined />,
                            label: <Link to={"/admin/manage-seat"} >Seat Class</Link>,
                        },
                        {
                            key: 'setting',
                            icon: <SettingOutlined />,
                            label: <Link to={"/admin/manage-airport"} >Setting</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{
                    padding: 0,
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ marginRight: 40, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar size={35} icon={<UserOutlined />} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: '1.2' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>John Doe</span>
                            <span style={{ color: 'gray', fontSize: '12px' }}>
                                <Badge status="processing" />
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
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;