
import { getUserAPI } from '@/services/api.service';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: [string, string];
}

const columns: ProColumns<IUserTable>[] = [
    {
        title: "No.",
        key: "no.",
        valueType: 'indexBorder',
        width: 48,
        // render: (text, record, index, action) => [
        //     <a href="#">index</a>
        // ]
    },

    {
        key: "id",
        title: 'Id',
        dataIndex: '_id',
        render: (text, record, _, action) => [
            <a href='#'>{record._id}</a>
        ],
        hideInSearch: true
    },
    {
        key: "fullName",
        title: 'Full Name',
        dataIndex: 'fullName',
    },
    {
        key: "email",
        title: 'Email',
        dataIndex: 'email',
        copyable: true
    },
    {
        key: "phone",
        title: 'Phone Number',
        dataIndex: 'phone',
        hideInSearch: true
    },
    {
        key: "createdAt",
        title: 'Created At',
        dataIndex: 'createdAt',
        valueType: 'date',
        hideInSearch: true,
        sorter: true
    },
    {
        title: 'Created At',
        dataIndex: 'createdAtRange',
        valueType: 'dateRange',
        hideInTable: true
    },
    {
        key: "action",
        title: 'Action',
        render: (text, record, _, action) => [
            <div style={{
                display: "flex",
                gap: "15px"
            }}>
                <EditOutlined style={{ cursor: 'pointer', color: "orange" }} />
                <DeleteOutlined style={{ cursor: 'pointer', color: "red" }} />
            </div>
        ],
        search: false

    },
];


const UserTable = () => {
    const actionRef = useRef<ActionType>()

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })


    return (
        <ProTable<IUserTable, TSearch>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sorter) => {
                let query = ''
                if (params.fullName) {
                    query += `&fullName=/${params.fullName}/i`
                }
                if (params.email) {
                    query += `&email=/${params.email}/i`
                }

                if (params.createdAtRange && params.createdAtRange.length) {
                    query += `&createdAt>=${params.createdAtRange[0]}&createdAt<=${params.createdAtRange[1]}`
                }

                if (sorter && sorter.createdAt) {
                    query += `&sort=${sorter.createdAt === 'ascend' ? 'createdAt' : '-createdAt'}`
                }

                console.log(query)

                const res = await getUserAPI(params?.current ?? 1, params?.pageSize ?? 5, query)
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
            headerTitle="Table user"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        actionRef.current?.reload();
                    }}
                    type="primary"
                >
                    Add new
                </Button>,
            ]}

        />
    )
}

export default UserTable