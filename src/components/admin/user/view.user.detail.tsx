import { Badge, Descriptions, Drawer } from "antd"
import dayjs from "dayjs";

interface IProps {
    isOpenUserDetail: boolean;
    setIsOpenUserDetail: (v: boolean) => void;
    dataUserDetail: IUserTable | null;
    setDataUserDetail: (v: IUserTable | null) => void
}

const ViewUserDetail = (props: IProps) => {

    const { dataUserDetail, isOpenUserDetail, setDataUserDetail, setIsOpenUserDetail } = props

    const format: string = "YYYY-MM-DD"

    return (
        <Drawer
            title="User Detail"
            onClose={() => {
                setDataUserDetail(null)
                setIsOpenUserDetail(false)
            }}
            open={isOpenUserDetail}
            width="50vw"
        >
            {dataUserDetail ?
                <Descriptions
                    title="User Info"
                    bordered
                >
                    <Descriptions.Item
                        label="Id"
                        span={2}
                    >
                        {dataUserDetail?._id}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Full Name"
                        span={2}
                    >
                        {dataUserDetail?.fullName}
                    </Descriptions.Item>


                    <Descriptions.Item
                        label="Email"
                        span={2}
                    >
                        {dataUserDetail?.email}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Phone"
                        span={2}
                    >
                        {dataUserDetail?.phone}
                    </Descriptions.Item>


                    <Descriptions.Item
                        label="Role"
                        span={3}
                    >
                        <Badge status="processing" text={dataUserDetail.role} />
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Created At"
                        span={2}
                    >
                        {dayjs(dataUserDetail?.createdAt).format(format)}
                    </Descriptions.Item>

                    <Descriptions.Item
                        label="Updated At"
                        span={2}
                    >
                        {dayjs(dataUserDetail?.updatedAt).format(format)}
                    </Descriptions.Item>

                </Descriptions>
                :
                <div>No data</div>
            }
        </Drawer>
    )
}

export default ViewUserDetail