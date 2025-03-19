import { getFlight } from "@/apis/flight.api";
import { Flight } from "@/types/flight.type";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";
const FlightManagement = () => {
  //Table
  const actionRef = useRef<ActionType>(null);

  const [flight, setFlight] = useState<Flight[]>([]);
  //fetching data
  useEffect(() => {
    getFlight().then((res) => {
      return setFlight(res.data);
    });
  });

  const data: IAirportItem[] = [];

  const columns: ProColumns<IAirportItem>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "ID",
      search: false,
      render: (_, record) => <a style={{ color: "#3498db" }}>{record._id}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      copyable: true,
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Action",
      search: false,
      render: () => (
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <EditOutlined
            style={{
              color: "#54a0ff",
            }}
          />
          <Popconfirm
            title="Delete the airport"
            description="Are you sure to delete this airport?"
            okText="Delete"
            cancelText="Cancel"
          >
            <DeleteOutlined
              style={{
                color: "#ee5253",
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleRequest = async () => {
    return {
      data: {}, // Dữ liệu bảng
      success: true,
      total: 10,
    };
  };
  return (
    <>
      <ProTable<IAirportItem>
        dataSource={data}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        headerTitle="Airport List"
        request={handleRequest}
        //Khi ProTable được render hoặc có sự thay đổi ở bộ lọc, tìm kiếm, phân trang, nó sẽ tự động gọi hàm request
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            New Airport
          </Button>,
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5,
        }}
      />
    </>
  );
};
export default FlightManagement;
