import { Result } from 'antd';

const ThirdStep = () => (
    <Result
        status="success"
        title="Booking Confirmed!"
        //         subTitle="Thank you for choosing [Airline Name]. Your flight booking has been successfully completed✈️.
        //         A confirmation email has been sent to [Customer Email] with your e-ticket and booking details.

        // If you need any assistance, please contact our support team at [Support Contact].

        // Wishing you a pleasant journey! ✨

        subTitle={<div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }} >

            <div style={{ width: "40%" }}> A confirmation email has been sent to [Customer Email] with your e-ticket and booking details.
                If you need any assistance, please contact our support team at [Support Contact].
                Wishing you a pleasant journey! ✨</div>
        </div>}

    />
);

export default ThirdStep;