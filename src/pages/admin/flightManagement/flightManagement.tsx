
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import NewAirport from './newAirport';
import UpdateAirport from './updateAirport';
const FlightManagement = () => {
    //update
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedAirport, setUpdatedAirport] = useState<IAirportItem>();
    //New
    const [isNewOpen, setIsNewOpen] = useState(false);
    //Table
    const actionRef = useRef<ActionType>(null);
    const data: IAirportItem[] = [
        {
            _id: "1",
            name: "Noi Bai International Airport",
            city: "Hanoi",
            country: "Vietnam"
        },
        {
            _id: "2",
            name: "Tan Son Nhat International Airport",
            city: "Ho Chi Minh City",
            country: "Vietnam"
        },
        {
            _id: "3",
            name: "Da Nang International Airport",
            city: "Da Nang",
            country: "Vietnam"
        },
        {
            _id: "4",
            name: "Suvarnabhumi Airport",
            city: "Bangkok",
            country: "Thailand"
        },
        {
            _id: "5",
            name: "Changi Airport",
            city: "Singapore",
            country: "Singapore"
        },
        {
            _id: "6",
            name: "Los Angeles International Airport",
            city: "Los Angeles",
            country: "United States"
        },
        {
            _id: "7",
            name: "Heathrow Airport",
            city: "London",
            country: "United Kingdom"
        },
        {
            _id: "8",
            name: "Tokyo Haneda Airport",
            city: "Tokyo",
            country: "Japan"
        },
        {
            _id: "9",
            name: "Dubai International Airport",
            city: "Dubai",
            country: "United Arab Emirates"
        },
        {
            _id: "10",
            name: "Sydney Kingsford Smith Airport",
            city: "Sydney",
            country: "Australia"
        }
    ];
    const columns: ProColumns<IAirportItem>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'ID',
            search: false,
            render: (_, record) => (
                <a href="#">{record._id}</a>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            copyable: true
        },
        {
            title: 'City',
            dataIndex: 'city',
        },
        {
            title: 'Country',
            dataIndex: 'country',
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
                            setUpdatedAirport(record)
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
            <ProTable<IAirportItem>
                dataSource={data}
                columns={columns}
                actionRef={actionRef}
                cardBordered
                headerTitle="Airport List"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => setIsNewOpen(true)}
                        type="primary"
                    >
                        New Airport
                    </Button>
                ]}
            />
            <NewAirport
                isNewOpen={isNewOpen}
                setIsNewOpen={setIsNewOpen}
            />
            <UpdateAirport
                updatedAirport={updatedAirport!}
                setUpdatedAirport={setUpdatedAirport}
                isUpdateOpen={isUpdateOpen}
                setIsUpdateOpen={setIsUpdateOpen}
            />
        </>
    );
}
export default FlightManagement;