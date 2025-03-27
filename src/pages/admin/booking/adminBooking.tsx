import React, { useEffect, useState } from 'react';
import { Button, Card, message, Steps, theme } from 'antd';
import FirstStep from './firstStep/firstStep';
import SecondStep from './secondStep/secondStep';
import ThirdStep from './thirdStep/thirdStep';
import { useNavigate, useParams } from 'react-router-dom';
import { toFLight } from '@/utils/convert';
import { useAppDispatch } from '@/redux/hooks';
import { setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice';
import { setBookingTicketsList } from '@/redux/features/bookingTicket/bookingTicketsList';

const AdminBooking = () => {
    const { flightId } = useParams();
    const bookingFlight = toFLight(flightId as string);
    const dispatch = useAppDispatch()
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    useEffect(() => {
        dispatch(setBookingFlight(bookingFlight));
        dispatch(setBookingTicketsList([]));
    }, [])
    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    const steps = [
        {
            title: 'Ticket information',
            content: <FirstStep
            />,
        },
        {
            title: 'Review',
            content: <SecondStep />,
        },
        {
            title: <div>Complete</div>,
            content: <ThirdStep />,
        },
    ];
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <>
            <div style={{ padding: 10 }}>
                <Card variant="borderless" style={{ width: "auto" }}>
                    <Steps current={current} items={items} />
                </Card>
                <div style={contentStyle}>{steps[current].content}</div>
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => {
                            message.success('Processing complete!')
                            navigate("/admin/manage-flight")
                        }}>
                            Done
                        </Button>
                    )}
                    {(current > 0 && current !== steps.length - 1) && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminBooking;