
import { getUserAPI } from '@/services/api.service';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';


const columns: ProColumns<IUserTable>[] = [
    {
        key: "no.",
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },

    {
        key: "id",
        title: 'Id',
        dataIndex: '_id',
        render: (text, record, _, action) => [
            <a href='#'>{record._id}</a>
        ],
        search: false,

    },
    {
        key: "fullName",
        title: 'Full name',
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
        title: 'Phone number',
        dataIndex: 'phone',
        search: false
    },
    {
        key: "createdAt",
        title: 'Created at',
        dataIndex: 'createdAt'
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
        <ProTable<IUserTable>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                const res = await getUserAPI(params?.current ?? 1, params?.pageSize ?? 5)
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