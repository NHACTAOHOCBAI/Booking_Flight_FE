/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Spin } from 'antd';
import { useRef, useState } from 'react';
import NewAirport from './newAirport';
import UpdateAirport from './updateAirport';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const AirportManagement = () => {
    const queryClient = useQueryClient();
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
    //logic delete
    const mutation = useMutation({
        mutationFn: async (deletedAirport: IAirportItem) => {
            await fetch(`http://localhost:8080/bookingflight/airports/${deletedAirport._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"  // Thêm header JSON
                },
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['getAllAirports'] })
            messageApi.open({
                type: 'success',
                content: 'You have deleted an airport',
            });
        }
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
                        onConfirm={() => {
                            mutation.mutate(record);
                        }}
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
                loading={mutation.isPending}
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