import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';
import {
    BarChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{
            height: "100%"
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
                            icon: <VideoCameraOutlined />,
                            label: <Link to={"/admin/manageflight"} >Airport</Link>,
                        },
                        {
                            key: 'flight',
                            icon: <VideoCameraOutlined />,
                            label: <Link to={"/admin/manageflight"} >Flight</Link>,
                        },
                        {
                            key: 'account',
                            icon: <VideoCameraOutlined />,
                            label: <Link to={"/admin/manageflight"} >Account</Link>,
                        },
                        {
                            key: 'setting',
                            icon: <VideoCameraOutlined />,
                            label: <Link to={"/admin/manageflight"} >Setting</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;