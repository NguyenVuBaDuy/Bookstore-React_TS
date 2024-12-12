
import { deleteBookAPI, getBookAPI, getCategoryAPI } from '@/services/api.service';
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, notification, Popconfirm, TablePaginationConfig } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ViewBookDetail from 'components/admin/book/view.book.detail';
import CreateBook from 'components/admin/book/create.book';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import UpdateBook from './update.book';

type TSearch = {
    mainText: string;
    category: string[];
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

    const [isOpenModalCreateBook, setIsOpenModalCreateBook] = useState<boolean>(false)
    const [sortQuery, setSortQuery] = useState<string>('&sort=-updatedAt')

    const [isOpenModalUpdateBook, setIsOpenModalUpdateBook] = useState<boolean>(false)
    const [dataUpdateBook, setDataUpdateBook] = useState<IBookTable | null>(null)

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
            sorter: true,
            sortOrder: sortQuery?.includes('price') ? (sortQuery.includes('-') ? 'descend' : 'ascend') : null,
        },
        {
            key: "updatedAt",
            title: "Lasted Updated",
            dataIndex: "updatedAt",
            valueType: "date",
            hideInSearch: true,
            sorter: true,
            sortOrder: sortQuery?.includes('updatedAt') ? (sortQuery.includes('-') ? 'descend' : 'ascend') : null,
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
                                setIsOpenModalUpdateBook(true)
                                setDataUpdateBook(record)
                            }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => { handleDeleteBook(record._id) }}
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

    const handleOnChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<MutationRecordType>) => {
        let sort = ''

        if (sorter.order === 'ascend') {
            sort = `&sort=${sorter.field}`
        } else if (sorter.order === 'descend') {
            sort = `&sort=-${sorter.field}`
        }
        console.log(sort)
        setSortQuery(sort)
    }

    const handleDeleteBook = async (_id: string) => {
        const res = await deleteBookAPI(_id)
        if (res.data) {
            message.success("Delete Book Successfully")
            actionRef.current?.reload()
        } else {
            notification.error({ message: "Delete Book Failed", description: res.message })
        }
    }

    return (

        <>
            <ProTable<IBookTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params) => {


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

                    if (sortQuery) {
                        query += sortQuery
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
                            setIsOpenModalCreateBook(true)
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>,
                ]}
                onChange={handleOnChange}
            />

            <ViewBookDetail
                isOpenBookDetail={isOpenBookDetail}
                setIsOpenBookDetail={setIsOpenBookDetail}
                dataBookDetail={dataBookDetail}
                setDataBookDetail={setDataBookDetail}
            />

            <CreateBook
                setIsOpenModalCreateBook={setIsOpenModalCreateBook}
                isOpenModalCreateBook={isOpenModalCreateBook}
                category={category}
                actionRef={actionRef}
            />

            <UpdateBook
                setDataUpdateBook={setDataUpdateBook}
                dataUpdateBook={dataUpdateBook}
                setIsOpenModalUpdateBook={setIsOpenModalUpdateBook}
                isOpenModalUpdateBook={isOpenModalUpdateBook}
                category={category}
                actionRef={actionRef}
            />
        </>
    )
}

export default BookTable