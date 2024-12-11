
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useRef } from 'react';

type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: [string, string];
}

const UserTable = () => {
    const actionRef = useRef<ActionType>()


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
            hideInSearch: true
        },
        {
            key: "updatedAt",
            title: "Lasted Updated",
            dataIndex: "updatedAt",
            valueType: "date",
            hideInSearch: true
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
                            key="editable"
                            onClick={() => {
                                action?.startEditable?.(record._id)
                            }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => { handleDelete(record._id) }}
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
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sorter) => {
                    return {
                        data: [],
                        page: 1,
                        success: true,
                        total: 10
                    }
                }}
                rowKey="_id"
                pagination={{
                    current: 1,
                    pageSize: 10,
                    total: 10,
                    showSizeChanger: true
                }}
                headerTitle="Table book"
                toolBarRender={() => [

                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        onClick={() => {
                            handleExport()
                        }}
                        type="primary"
                    >
                        Export
                    </Button>,
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setIsOpenModalCreateUser(true)
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>,
                ]}
            />
        </>
    )
}

export default UserTable