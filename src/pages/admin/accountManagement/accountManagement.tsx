import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import UpdateAccount from './updateAccount';
import NewAccount from './newAccount';
import DetailAccount from './detailAccount';
const AccountManagement = () => {
    //update
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [updatedAccount, setUpdatedAccount] = useState<IAccountItem>({
        _id: "",
        username: "",
        phone: "",
        fullName: "",
        dob: "",
        gender: "",
        role: "",
        createdAt: "",
        updatedAt: ""
    });
    const [detailAccount, setDetailAccount] = useState<IAccountItem>({
        _id: "",
        username: "",
        phone: "",
        fullName: "",
        dob: "",
        gender: "",
        role: "",
        createdAt: "",
        updatedAt: ""
    })
    //New
    const [isNewOpen, setIsNewOpen] = useState(false);
    //Table
    const actionRef = useRef<ActionType>(null);
    const data: IAccountItem[] = [
        {
            _id: "1a2b3c4d5e6f7g8h9i0j",
            username: "john_doe",
            phone: "0987654321",
            fullName: "John Doe",
            dob: "1990-05-15",
            createdAt: "2024-03-01T10:30:00",
            updatedAt: "2025-03-10T12:45:00",
            gender: "Male",
            role: "Admin"
        },
        {
            _id: "2b3c4d5e6f7g8h9i0j1a",
            username: "jane_smith",
            phone: "0978123456",
            fullName: "Jane Smith",
            dob: "1995-08-22",
            createdAt: "2024-02-15T09:15:00",
            updatedAt: "2025-03-11T08:30:00",
            gender: "Female",
            role: "Customer"
        },
        {
            _id: "3c4d5e6f7g8h9i0j1a2b",
            username: "michael_brown",
            phone: "0967543210",
            fullName: "Michael Brown",
            dob: "1988-12-10",
            createdAt: "2024-01-20T14:00:00",
            updatedAt: "2025-03-09T16:25:00",
            gender: "Male",
            role: "Staff"
        },
        {
            _id: "4d5e6f7g8h9i0j1a2b3c",
            username: "sophia_wilson",
            phone: "0956789012",
            fullName: "Sophia Wilson",
            dob: "1992-07-18",
            createdAt: "2024-02-10T11:45:00",
            updatedAt: "2025-03-12T14:10:00",
            gender: "Female",
            role: "Customer"
        },
        {
            _id: "5e6f7g8h9i0j1a2b3c4d",
            username: "david_miller",
            phone: "0945678901",
            fullName: "David Miller",
            dob: "1985-03-25",
            createdAt: "2024-03-05T13:30:00",
            updatedAt: "2025-03-10T18:20:00",
            gender: "Male",
            role: "Admin"
        },
        {
            _id: "6f7g8h9i0j1a2b3c4d5e",
            username: "emily_davis",
            phone: "0934567890",
            fullName: "Emily Davis",
            dob: "1998-11-05",
            createdAt: "2024-02-28T08:00:00",
            updatedAt: "2025-03-09T09:15:00",
            gender: "Female",
            role: "Customer"
        },
        {
            _id: "7g8h9i0j1a2b3c4d5e6f",
            username: "chris_johnson",
            phone: "0923456789",
            fullName: "Chris Johnson",
            dob: "1991-06-30",
            createdAt: "2024-01-10T10:10:00",
            updatedAt: "2025-03-08T17:05:00",
            gender: "Male",
            role: "Staff"
        },
        {
            _id: "8h9i0j1a2b3c4d5e6f7g",
            username: "olivia_williams",
            phone: "0912345678",
            fullName: "Olivia Williams",
            dob: "1996-09-14",
            createdAt: "2024-02-22T12:50:00",
            updatedAt: "2025-03-07T11:40:00",
            gender: "Female",
            role: "Customer"
        },
        {
            _id: "9i0j1a2b3c4d5e6f7g8h",
            username: "william_taylor",
            phone: "0901234567",
            fullName: "William Taylor",
            dob: "1983-04-08",
            createdAt: "2024-03-12T15:20:00",
            updatedAt: "2025-03-06T10:55:00",
            gender: "Male",
            role: "Admin"
        },
        {
            _id: "0j1a2b3c4d5e6f7g8h9i",
            username: "ava_martinez",
            phone: "0998765432",
            fullName: "Ava Martinez",
            dob: "2000-01-02",
            createdAt: "2024-03-08T09:30:00",
            updatedAt: "2025-03-05T13:10:00",
            gender: "Female",
            role: "Customer"
        }
    ];

    const columns: ProColumns<IAccountItem>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'ID',
            search: false,
            render: (_, record) => (
                <a style={{ color: "#3498db" }}
                    onClick={() => {
                        setIsDetailOpen(true)
                        setDetailAccount(record)
                    }}>
                    {record._id}
                </a>
            )
        },
        {
            title: 'Email',
            dataIndex: 'username',
            copyable: true
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        // role hien thi
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        //role tim kiem
        {
            title: 'Role',
            dataIndex: 'role',
            hideInTable: true,
            valueType: "select",
            valueEnum: {
                admin: { text: 'Admin' },
                user: { text: 'User' },
                client: { text: 'Client' },
            },
        },
        {
            title: 'Role',
            dataIndex: 'role',
            search: false
        },
        {
            title: 'Action',
            search: false,
            render: (_, record) => (
                <div style={{
                    display: "flex",
                    gap: 10
                }}>
                    <EditOutlined
                        style={{
                            color: "#54a0ff"
                        }}
                        onClick={() => {
                            setIsUpdateOpen(true)
                            setUpdatedAccount(record)
                        }
                        }
                    />
                    <Popconfirm
                        title="Delete the airport"
                        description="Are you sure to delete this airport?"
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <DeleteOutlined style={{
                            color: "#ee5253"
                        }} />
                    </Popconfirm>
                </div>
            )
        }
    ];
    return (
        <>
            <ProTable<IAccountItem>
                dataSource={data}
                columns={columns}
                actionRef={actionRef}
                cardBordered
                bordered
                headerTitle="Accounts List"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => setIsNewOpen(true)}
                        type="primary"
                    >
                        New Account
                    </Button>
                ]}
                pagination={{
                    pageSizeOptions: [5, 10, 20],
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    defaultPageSize: 5
                }}
            />
            <NewAccount
                isNewOpen={isNewOpen}
                setIsNewOpen={setIsNewOpen}
            />
            <UpdateAccount
                updatedAccount={updatedAccount!}
                setUpdatedAccount={setUpdatedAccount}
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
            />
            <DetailAccount
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                detailAccount={detailAccount}
                setDetailAccount={setDetailAccount}
            />
        </>
    );
}
export default AccountManagement;