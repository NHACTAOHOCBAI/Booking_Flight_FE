import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Spin } from 'antd';
import { useRef, useState } from 'react';
import NewAirport from './newAirport';
import UpdateAirport from './updateAirport';
import { useDeleteAirport, useGetAllAirports } from '@/hooks/useAirport';
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
    //fetch data
    const { isPending, error, data } = useGetAllAirports();
    let fakeData: IAirportItem[] = [];
    if (data && data.result) {
        fakeData = data.result.map((value) => {
            return {
                _id: value.airportCode,
                name: value.airportName,
                city: value.location,
                country: value.location
            }
        })
    }
    // delete
    const deleteAirport = useDeleteAirport();
    const handleDelete = (value: string) => {
        deleteAirport.mutate(value, {
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: 'You have created an airport',
                });
            }
        });
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
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <DeleteOutlined style={{
                            color: "#ee5253"
                        }} />
                    </Popconfirm>
                </div>
            )
        }
    ];
    if (isPending) return (
        <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spin size="large" />
        </div>
    )
    if (error) return 'An error has occurred: ' + error.message
    return (
        <>
            {contextHolder}
            <ProTable<IAirportItem>
                loading={deleteAirport.isPending}
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