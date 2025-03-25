import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, Popconfirm } from "antd";
import { useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import NewPlane from "./newPlane";
import UpdatePlane from "./updatePlane";
const PlaneManagement = () => {
    //update
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedPlane, setUpdatedPlane] = useState<IUpdatePlaneItem>({
        id: "",
        name: "",
        airline: ""
    });
    //new
    const [isNewOpen, setIsNewOpen] = useState(false);
    //Table
    const actionRef = useRef<ActionType>(null);
    const data: IPlaneItem[] = [
        { id: 'PLN-B737-001', name: 'Boeing 737', airline: 'American Airlines' },
        { id: 'PLN-A320-002', name: 'Airbus A320', airline: 'Delta Airlines' },
        { id: 'PLN-E190-003', name: 'Embraer E190', airline: 'United Airlines' },
        { id: 'PLN-B787-004', name: 'Boeing 787', airline: 'Qatar Airways' },
        { id: 'PLN-A350-005', name: 'Airbus A350', airline: 'Singapore Airlines' },
    ];

    const columns: ProColumns<IPlaneItem>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'ID',
            search: false,
            render: (_, record) => (
                <a style={{ color: "#3498db" }}>
                    {record.id}
                </a>
            )
        },
        {
            title: 'Model',
            dataIndex: 'name',
            copyable: true
        },
        {
            title: 'Airline',
            dataIndex: 'airline',
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
                            setUpdatedPlane(record);
                            setIsUpdateOpen(true);
                        }}
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
            <ProTable<IPlaneItem>
                search={{
                    labelWidth: 'auto',
                }}
                dataSource={data}
                columns={columns}
                actionRef={actionRef}
                cardBordered
                bordered
                headerTitle="Plane table"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setIsNewOpen(true)}
                    >
                        New Plane
                    </Button>
                ]}
                pagination={{
                    pageSizeOptions: [5, 10, 20],
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    defaultPageSize: 5
                }}
            />
            <NewPlane
                isNewOpen={isNewOpen}
                setIsNewOpen={setIsNewOpen}
            />
            <UpdatePlane
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
                updatedPlane={updatedPlane}
                setUpdatedPlane={setUpdatedPlane}
            />
        </>
    );
}
export default PlaneManagement;