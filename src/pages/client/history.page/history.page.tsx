import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getOrderHistory } from 'services/api.service'
import ReactJson from "react-json-view";
import moment from "moment";

const HistoryPage = () => {

    const [dataOrder, setDataOrder] = useState<IOrder | []>([])

    useEffect(() => {
        getOrder()
    }, [])

    const getOrder = async () => {
        const res = await getOrderHistory()
        if (res.data) {
            setDataOrder(res.data)
        }
    }

    const columns = [
        {
            title: 'No.',
            render: (_, record, index) => (
                <div>{index + 1}</div>
            )
        },
        {
            title: 'Order time',
            key: 'createdAt',
            render: (_, record: IOrder) => (
                <div>{moment(record.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</div>
            )
        },
        {
            title: 'Total price',
            key: 'totalPrice',
            render: (_, record: IOrder) => (
                <div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalPrice)}</div>
            )
        },
        {
            title: "Status",
            key: "status",
            render: () => (
                <Tag color="green">Success</Tag>
            )
        },
        {
            title: "Detail",
            key: 'detail',
            render: (_, record: IOrder) => (
                <ReactJson
                    src={record.detail}
                    name="Order detail"
                    collapsed={true}
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                />
            )
        }
    ];

    return (
        <div style={{
            minHeight: "calc(100vh - 123px)",
            backgroundColor: 'white',
            width: "1440px",
            margin: "0 auto",
            boxSizing: 'border-box'
        }}>

            <Table
                dataSource={dataOrder}
                columns={columns}
                pagination={false}
            />

        </div>
    )
}

export default HistoryPage