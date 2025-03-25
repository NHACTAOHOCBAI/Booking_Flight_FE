import { toAirport, toPlane, toSeat } from "@/utils/convert"
import { Descriptions, Drawer, Popover, Table, TableProps } from "antd"
import { DescriptionsProps } from "antd/lib"
import dayjs from "dayjs"

interface IProps {
    detailFlight: IFlightTable
    setDetailFlight: (value: IFlightTable) => void
    isDetailOpen: boolean
    setIsDetailOpen: (open: boolean) => void
}
const DetailFlight = (props: IProps) => {
    const { detailFlight, isDetailOpen, setIsDetailOpen, setDetailFlight } = props;
    const handleClose = () => {
        setIsDetailOpen(false);
        setDetailFlight({
            id: "",
            flightCode: "",
            planeId: "",
            departureAirportId: "",
            arrivalAirportId: "",
            departureTime: "",
            arrivalTime: "",
            originPrice: 0,
            interAirport: [],
            seat: []
        });
    }
    const Content = (value: string) => {
        return (
            <div>
                {value}
            </div>
        )
    }
    const flightItems: DescriptionsProps['items'] = [
        {
            key: 'flightCode',
            label: 'Flight Code',
            span: 4,
            children: detailFlight?.flightCode,
        },
        {
            key: 'arrivalName',
            label: 'Arrival airport',
            span: 2,
            children: <Popover content={Content(toAirport(detailFlight.arrivalAirportId).airportCode as string)} trigger="hover" >
                {toAirport(detailFlight.arrivalAirportId).airportName}
            </Popover>
        },
        {
            key: 'departureName',
            label: 'Departure airport',
            span: 2,
            children: <Popover content={Content(toAirport(detailFlight.departureAirportId).airportCode as string)} trigger="hover" >
                {toAirport(detailFlight.departureAirportId).airportName}
            </Popover>
        },
        {
            key: 'departureTime',
            label: 'Departure time',
            span: 2,
            children: dayjs(detailFlight?.departureTime).format('HH:mm DD/MM/YYYY')
        },
        {
            key: 'arrivalTime',
            label: 'Arrival time',
            span: 2,
            children: dayjs(detailFlight?.arrivalTime).format('HH:mm DD/MM/YYYY')
        },
        {
            key: 'plane',
            label: 'Plane',
            span: 2,
            children: <Popover content={Content(toPlane(detailFlight.planeId).planeCode as string)} trigger="hover" >
                {toPlane(detailFlight.planeId).planeName}
            </Popover>
        },
        {
            key: 'initialPrice',
            label: 'Price',
            span: 2,
            children: `${detailFlight?.originPrice} VNĐ`,
        },
    ];
    const interColumns: TableProps<IInterAirport>['columns'] = [
        {
            title: 'Intermediate airport',
            dataIndex: 'index',
            key: 'index',
            children: [
                {
                    title: 'No.',
                    dataIndex: 'index',
                    key: 'index',
                    render: (_, __, index) => index + 1,
                },
                {
                    title: 'Airport',
                    dataIndex: '',
                    key: 'airportName',
                    render: (_, value) => (
                        < Popover content={Content(toAirport(value.airportId).airportCode as string)} trigger="hover" >
                            {toAirport(value.airportId).airportName}
                        </ Popover>
                    ),
                },
                {
                    title: 'Arrival time',
                    dataIndex: '',
                    key: 'arrivalTime',
                    render: (_, value) => (
                        dayjs(value.arrivalTime).format('HH:mm DD/MM/YYYY')
                    )
                },
                {
                    title: 'Departure time',
                    dataIndex: '',
                    key: 'departureTime',
                    render: (_, value) => (
                        dayjs(value.departureTime).format('HH:mm DD/MM/YYYY')
                    )
                },
                {
                    title: "Note",
                    dataIndex: "note"
                }
            ]
        },
    ];
    const seatColumns: TableProps<ISeat>['columns'] = [
        {
            title: 'Available tickets',
            dataIndex: 'index',
            key: 'index',
            children: [
                {
                    title: 'No.',
                    dataIndex: 'index',
                    key: 'index',
                    render: (_, __, index) => index + 1,
                },
                {
                    title: 'Seat',
                    dataIndex: '',
                    key: 'seatName',
                    render: (_, value) => (
                        < Popover content={Content(toSeat(value.seatId).seatCode as string)} trigger="hover" >
                            {toSeat(value.seatId).seatName}
                        </ Popover>
                    ),
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                },
                {
                    title: 'Actual price',
                    key: 'price',
                    render: (_, value) => {
                        return detailFlight.originPrice * (toSeat(value.seatId).price as number) / 100;
                    }
                }
            ]
        },
    ];
    return (
        <>
            <Drawer title="Flight Information" onClose={handleClose} open={isDetailOpen} size="large">
                <Descriptions
                    size="middle" column={4} bordered items={flightItems} />
                {
                    (detailFlight.interAirport.length != 0) ?
                        <>
                            <div style={{ height: 10 }}></div>
                            <Table<IInterAirport>
                                bordered
                                size="small" columns={interColumns} dataSource={detailFlight.interAirport} pagination={false} />
                        </>
                        :
                        <></>
                }
                <div style={{ height: 10 }}></div>
                <Table<ISeat>
                    bordered
                    size="small" columns={seatColumns} dataSource={detailFlight.seat} pagination={false} />
            </Drawer>
        </>
    )
}
export default DetailFlight