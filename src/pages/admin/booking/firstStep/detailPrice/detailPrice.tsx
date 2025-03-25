import { Card, Table } from 'antd';
import { TableProps } from 'antd/lib';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { ImPriceTags } from 'react-icons/im';
interface IDetailPrice {
    seatName: string,
    quantity: number,
    price: number,
}
const DetailPrice = () => {
    const detailPriceColumns: TableProps<IDetailPrice>['columns'] = [
        {
            title: '',
            dataIndex: 'seatName',
            key: 'seatName'
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (_, value) => (
                `x ${value.quantity}`
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (_, value) => (
                `${value.price * value.quantity} VNĐ`
            ),
        },
    ];
    const detailPriceData: IDetailPrice[] = [
        {
            seatName: "Business",
            quantity: 1,
            price: 1000000
        },
        {
            seatName: "Economy",
            quantity: 2,
            price: 1200000
        }
    ]
    return (
        <Card
            title={<div><ImPriceTags style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Detail price</div>}
            headStyle={{ textAlign: "left" }} variant="borderless" style={{ width: "100%" }}>
            <Table<IDetailPrice>
                size="small" columns={detailPriceColumns} dataSource={detailPriceData} pagination={false} />
            <div style={{ display: "flex", justifyContent: "space-between", margin: 10 }}>
                <div style={{ fontWeight: "bold" }}>
                    <FaMoneyCheckAlt style={{ width: 20, height: 20, verticalAlign: "middle", marginBottom: 4 }} /> Total Amount:
                </div>
                <div>3,600,000 VNĐ</div>
            </div>
        </Card>
    )
};

export default DetailPrice;