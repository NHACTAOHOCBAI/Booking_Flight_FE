// import { useParams } from "react-router-dom";

// const AdminBooking = () => {
//     const { flightId } = useParams();
//     return (
//         <>{flightId}</>
//     )
// }
// export default AdminBooking
import React, { useState } from 'react';
import { Button, Card, message, Steps, theme } from 'antd';
import FirstStep from './firstStep/firstStep';
import SecondStep from './secondStep/secondStep';
import ThirdStep from './thirdStep/thirdStep';
import { useNavigate } from 'react-router-dom';
const steps = [
    {
        title: 'Ticket information',
        content: <FirstStep />,
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

const AdminBooking = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <div style={{ padding: 40 }}>
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