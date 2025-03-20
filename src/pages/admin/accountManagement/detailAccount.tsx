import { Avatar, Badge, Descriptions, DescriptionsProps, Drawer } from "antd"
import { UserOutlined } from '@ant-design/icons';
import dayjs from "dayjs"
interface IProps {
    detailAccount: IAccountItem
    setDetailAccount: (value: IAccountItem) => void
    isDetailOpen: boolean
    setIsDetailOpen: (open: boolean) => void
}
const DetailAccount = (props: IProps) => {
    const { detailAccount, isDetailOpen, setIsDetailOpen, setDetailAccount } = props;
    const handleClose = () => {
        setIsDetailOpen(false);
        setDetailAccount({
            _id: "",
            username: "",
            phone: "",
            fullName: "",
            dob: "",
            gender: "",
            role: "",
            createdAt: "",
            updatedAt: ""
        });
    }
    const accountItems: DescriptionsProps['items'] = [
        {
            key: '_id',
            label: 'ID',
            span: 4,
            children: detailAccount?._id,
        },
        {
            key: 'email',
            label: 'Email',
            span: 3,
            children: detailAccount?.username
        },
        {
            key: 'role',
            label: 'Role',
            span: 1,
            children: <Badge status="processing" text={`${detailAccount?.role}`} />,
        },
        {
            key: 'createdAt',
            label: 'Created At',
            children: dayjs(detailAccount?.createdAt).format('DD/MM/YYYY')
        },
        {
            key: 'updatedAt',
            label: 'Updated At',
            children: dayjs(detailAccount?.updatedAt).format('DD/MM/YYYY')
        },
    ];
    const personalItems: DescriptionsProps['items'] = [
        {
            key: 'fullname',
            label: 'Full Name',
            span: 2,
            children: detailAccount?.fullName,
        },
        {
            key: 'dob',
            label: 'Date of birth',
            children: detailAccount?.dob
        },
        {
            key: 'avatar',
            label: 'Avatar',
            span: 2,
            children: <Avatar icon={<UserOutlined />} size={"large"} />
        },
        {
            key: 'gender',
            label: 'Gender',
            span: 2,
            children: detailAccount?.gender
        },

        {
            key: 'phone',
            label: 'Phone',
            children: detailAccount?.phone
        },
    ];
    return (
        <>
            <Drawer title="Account Information" onClose={handleClose} open={isDetailOpen} size="large">
                <Descriptions size="middle" title="Account Info" column={4} bordered items={accountItems} />
                <Descriptions size="middle" title="Personal Info" bordered items={personalItems} />
            </Drawer>
        </>
    )
}
export default DetailAccount