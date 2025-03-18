/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Spin } from 'antd';
import { useRef, useState } from 'react';
import NewAirport from './newAirport';
import UpdateAirport from './updateAirport';
import { useQuery } from '@tanstack/react-query';
const AirportManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    //update
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [updatedAirport, setUpdatedAirport] = useState<IAirportItem>({
        _id: "",
        name: "",
        city: "",
        country: ""
    });
    //New
    const [isNewOpen, setIsNewOpen] = useState(false);
    //Table
    const actionRef = useRef<ActionType>(null);
    //fake data
    const { isPending, error, data } = useQuery({
        queryKey: ['getAllAirports'],
        queryFn: (): Promise<APIResponse<IFakeAirportItem[]>> =>
            fetch('http://localhost:8080/bookingflight/airports').then((res) =>
                res.json(),
            ),
    })
    if (isPending) return (
        <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spin size="large" />
        </div>
    )
    if (error) return 'An error has occurred: ' + error.message
    let fakeData: IAirportItem[] = [];
    if (data && data.result) {
        fakeData = data.result.map((value: IFakeAirportItem) => {
            return {
                _id: value.airportCode,
                name: value.airportName,
                city: value.location,
                country: value.location
            }
        })
    }
    // const fakeData: IAirportItem[] = [
    //     {
    //         "_id": "5382147f-1cec-4d6a-8ed0-5bcf154f81e4",
    //         "name": "Noi Bai International Airport",
    //         "city": "Hanoi",
    //         "country": "Vietnam"
    //     },
    //     {
    //         "_id": "35efe212-6264-4474-beb9-67bbbd09bfa6",
    //         "name": "Tan Son Nhat International Airport",
    //         "city": "Ho Chi Minh City",
    //         "country": "Vietnam"
    //     },
    //     {
    //         "_id": "8efba8ab-06d9-4527-9a02-4dd0a6a2cc35",
    //         "name": "Da Nang International Airport",
    //         "city": "Da Nang",
    //         "country": "Vietnam"
    //     },
    //     {
    //         "_id": "dccf573f-ed02-4429-8486-4957123915a6",
    //         "name": "Suvarnabhumi Airport",
    //         "city": "Bangkok",
    //         "country": "Thailand"
    //     },
    //     {
    //         "_id": "fe673c9f-4ce4-4558-acfb-c0af4f0de1a1",
    //         "name": "Changi Airport",
    //         "city": "Singapore",
    //         "country": "Singapore"
    //     },
    //     {
    //         "_id": "f240c93d-8fc1-42a0-b740-6e55ee883d5d",
    //         "name": "Los Angeles International Airport",
    //         "city": "Los Angeles",
    //         "country": "United States"
    //     },
    //     {
    //         "_id": "5fcd6b83-b57d-4433-b05a-ba686c24ace0",
    //         "name": "Heathrow Airport",
    //         "city": "London",
    //         "country": "United Kingdom"
    //     },
    //     {
    //         "_id": "35c92697-3a9a-4a11-a9b5-148f13e2e039",
    //         "name": "Tokyo Haneda Airport",
    //         "city": "Tokyo",
    //         "country": "Japan"
    //     },
    //     {
    //         "_id": "7f0d1335-c826-439f-b340-5ea2e583e2e2",
    //         "name": "Dubai International Airport",
    //         "city": "Dubai",
    //         "country": "United Arab Emirates"
    //     },
    //     {
    //         "_id": "a3522b53-6db7-4e9c-b90c-5509de2294bd",
    //         "name": "Sydney Kingsford Smith Airport",
    //         "city": "Sydney",
    //         "country": "Australia"
    //     }
    // ]

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
                <a style={{ color: "#3498db" }}>{record._id}</a>
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
            {contextHolder}
            <ProTable<IAirportItem>
                dataSource={fakeData}
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
                pagination={{
                    pageSizeOptions: [5, 10, 20],
                    showSizeChanger: true,
                    defaultCurrent: 1,
                    defaultPageSize: 5
                }}
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
export default AirportManagement;