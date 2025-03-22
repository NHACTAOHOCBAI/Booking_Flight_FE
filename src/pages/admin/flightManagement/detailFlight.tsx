import { Descriptions, Drawer, Popover, Table, TableProps } from "antd"
import { DescriptionsProps } from "antd/lib"
import dayjs from "dayjs"

interface IProps {
    detailFlight: IFlightItem
    setDetailFlight: (value: IFlightItem) => void
    isDetailOpen: boolean
    setIsDetailOpen: (open: boolean) => void
}
const DetailFlight = (props: IProps) => {
    const { detailFlight, isDetailOpen, setIsDetailOpen, setDetailFlight } = props;
    const handleClose = () => {
        setIsDetailOpen(false);
        setDetailFlight({
            _id: "",
            planeId: "",
            planeName: "",
            departureId: "",
            departureName: "",
            arrivalId: "",
            arrivalName: "",
            departureTime: "",
            arrivalTime: "",
            price: 0,
            ticket: [],
            interAirport: []
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
            key: '_id',
            label: 'ID',
            span: 4,
            children: detailFlight?._id,
        },
        {
            key: 'arrivalName',
            label: 'Arrival airport',
            span: 2,
            children: <Popover content={Content(detailFlight.arrivalId)} trigger="hover" >
                {detailFlight.arrivalName}
            </Popover>
        },
        {
            key: 'departureName',
            label: 'Departure airport',
            span: 2,
            children: <Popover content={Content(detailFlight.departureId)} trigger="hover" >
                {detailFlight.departureName}
            </Popover>
        },
        {
            key: 'departureTime',
            label: 'Departure time',
            span: 2,
            children: dayjs(detailFlight?.departureTime).format('DD/MM/YYYY HH:mm:ss')
        },
        {
            key: 'arrivalTime',
            label: 'Arrival time',
            span: 2,
            children: dayjs(detailFlight?.arrivalTime).format('DD/MM/YYYY HH:mm:ss')
        },
        {
            key: 'plane',
            label: 'Plane',
            span: 2,
            children: <Popover content={Content(detailFlight.planeId)} trigger="hover" >
                {detailFlight.planeName}
            </Popover>
        },
        {
            key: 'initialPrice',
            label: 'Price',
            span: 2,
            children: `${detailFlight?.price} VNĐ`,
        },
    ];
    //fake data
    const airports = [
        { _id: "SGN", name: "Tan Son Nhat International Airport", city: "Ho Chi Minh City", country: "Vietnam" },
        { _id: "HAN", name: "Noi Bai International Airport", city: "Hanoi", country: "Vietnam" },
        { _id: "DAD", name: "Da Nang International Airport", city: "Da Nang", country: "Vietnam" },
        { _id: "PQC", name: "Phu Quoc International Airport", city: "Phu Quoc", country: "Vietnam" },
        { _id: "CXR", name: "Cam Ranh International Airport", city: "Nha Trang", country: "Vietnam" },
        { _id: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
        { _id: "SIN", name: "Changi Airport", city: "Singapore", country: "Singapore" },
        { _id: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" },
        { _id: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
        { _id: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" }
    ];
    const seats = [
        { _id: "S001", name: "Economy", price: 100, description: "Basic economy class seat" },
        { _id: "S002", name: "Business", price: 120, description: "Premium business class seat" },
        { _id: "S003", name: "First Class", price: 170, description: "Luxury first-class seat" }
    ];
    interface IInterData {
        id: string,
        nameAirport: string,
        arrivalTime: string,
        departureTime: string
    }
    interface ITicketData {
        id: string,
        seatName: string
        quantity: number
        price: number
    }
    const interData: IInterData[] = detailFlight.interAirport.map((value) => {
        // Tìm object sân bay trong data
        const foundAirport = airports.find((item) => item._id === value._id);
        return {
            id: value._id,
            nameAirport: foundAirport!.name,
            arrivalTime: value.arrivalTime,
            departureTime: value.departureTime
        }
    });
    const ticketData: ITicketData[] = detailFlight.ticket.map((value) => {
        // Tìm object sân bay trong data
        const foundSeat = seats.find((item) => item._id === value.type._id);
        return {
            id: value.type._id,
            seatName: foundSeat?.name as string,
            quantity: value.quantity,
            price: foundSeat?.price as number
        }
    });
    const interColumns: TableProps<IInterData>['columns'] = [
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
                    key: 'nameAirport',
                    render: (_, value) => (
                        < Popover content={Content(value.id)} trigger="hover" >
                            {value.nameAirport}
                        </ Popover>
                    ),
                },
                {
                    title: 'Arrival time',
                    dataIndex: '',
                    key: 'arrivalTime',
                    render: (_, value) => (
                        dayjs(value?.arrivalTime).format('DD/MM/YYYY HH:mm:ss')
                    )
                },
                {
                    title: 'Departure time',
                    dataIndex: '',
                    key: 'departureTime',
                    render: (_, value) => (
                        dayjs(value?.departureTime).format('DD/MM/YYYY HH:mm:ss')
                    )
                },
            ]
        },
    ];
    const seatColumns: TableProps<ITicketData>['columns'] = [
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
                        < Popover content={Content(value.id)} trigger="hover" >
                            {value.seatName}
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
                    render: (_, record) => {
                        console.log(detailFlight.price, record.price)
                        return detailFlight.price * record.price / 100;
                    }
                },
            ]
        },
    ];
    return (
        <>
            <Drawer title="Flight Information" onClose={handleClose} open={isDetailOpen} size="large">
                <Descriptions
                    size="middle" column={4} bordered items={flightItems} />
                {
                    (interData.length != 0) ?
                        <>
                            <div style={{ height: 10 }}></div>
                            <Table<IInterData>
                                bordered
                                size="small" columns={interColumns} dataSource={interData} pagination={false} />
                        </>
                        :
                        <></>
                }
                <div style={{ height: 10 }}></div>
                <Table<ITicketData>
                    bordered
                    size="small" columns={seatColumns} dataSource={ticketData} pagination={false} />
            </Drawer>
        </>
    )
}
export default DetailFlight