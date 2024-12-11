
import { getBookAPI, getCategoryAPI } from '@/services/api.service';
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ViewBookDetail from 'components/admin/book/view.book.detail';

type TSearch = {
    mainText: string;
    category: string;
    author: string;
}


const BookTable = () => {

    const actionRef = useRef<ActionType>()
    const [category, setCategory] = useState<any>([])
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const [isOpenBookDetail, setIsOpenBookDetail] = useState<boolean>(false)
    const [dataBookDetail, setDataBookDetail] = useState<IBookTable | null>(null)

    useEffect(() => {
        const getCategory = async () => {
            const res = await getCategoryAPI()
            if (res.data) {
                const categoryEnum = res.data.reduce((acc: any, cur: any) => {
                    acc[cur] = cur;
                    return acc
                }, {})
                setCategory(categoryEnum)
            }
        }
        getCategory()
    }, [])

    const columns: ProColumns<IBookTable>[] = [
        {
            title: "No.",
            key: "no.",
            valueType: 'indexBorder',
            width: 48,
        },
        {
            key: "id",
            title: 'Id',
            dataIndex: '_id',
            hideInSearch: true,
            render: (_, record) => (
                <a href="#" onClick={() => {
                    setIsOpenBookDetail(true)
                    setDataBookDetail(record)
                }}>{record._id}</a>
            )
        },
        {
            key: "mainText",
            title: 'Book Title',
            dataIndex: 'mainText',
        },
        {
            key: "category",
            title: 'Category',
            dataIndex: 'category',
            valueType: 'select',
            valueEnum: category
        },
        {
            key: "author",
            title: 'Author',
            dataIndex: 'author',
        },
        {
            key: "price",
            title: "Price",
            dataIndex: "price",
            render: (_, record) => (
                <>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.price)}</>
            ),
            hideInSearch: true,
            sorter: true
        },
        {
            key: "updatedAt",
            title: "Lasted Updated",
            dataIndex: "updatedAt",
            valueType: "date",
            hideInSearch: true,
            sorter: true
        },
        {
            key: "action",
            title: 'Action',
            render: (text, record, _, action) => {
                return (
                    <div style={{
                        display: "flex",
                        gap: "15px"
                    }}>
                        <EditOutlined
                            style={{ cursor: 'pointer', color: "orange" }}
                            onClick={() => {

                            }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => { }}
                            onCancel={() => { }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{ cursor: 'pointer', color: "red" }} />
                        </Popconfirm>
                    </div>
                )
            },
            hideInSearch: true
        },
    ];


    return (

        <>
            <ProTable<IBookTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sorter) => {

                    let query = ''

                    if (params?.mainText) {
                        query += `&mainText=/${params.mainText}/i`
                    }

                    if (params?.author) {
                        query += `&author=/${params.author}/i`
                    }

                    if (params?.category) {
                        query += `&category=/${params.category}/i`
                    }

                    if (sorter) {
                        const key = Object.keys(sorter)
                        const value: any = key.length > 0 ? sorter[key[0]] : ''
                        if (key && key.length > 0) {
                            query += `&sort=${value === 'ascend' ? `${key[0]}` : `-${key[0]}`}`
                        }
                    }

                    const res = await getBookAPI(params?.current ?? 1, params?.pageSize ?? 5, query)

                    if (res.data) {
                        setMeta(res.data.meta)
                    }

                    return {
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total
                    }
                }}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showSizeChanger: true
                }}
                headerTitle="Table book"
                toolBarRender={() => [

                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        onClick={() => {

                        }}
                        type="primary"
                    >
                        Export
                    </Button>,
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {

                        }}
                        type="primary"
                    >
                        Add new
                    </Button>,
                ]}
            />

            <ViewBookDetail
                isOpenBookDetail={isOpenBookDetail}
                setIsOpenBookDetail={setIsOpenBookDetail}
                dataBookDetail={dataBookDetail}
                setDataBookDetail={setDataBookDetail}
            />
        </>
    )
}

export default BookTable