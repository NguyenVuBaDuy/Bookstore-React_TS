
import { deleteUserAPI, getUserAPI, updateUserAPI } from '@/services/api.service';
import { CloseOutlined, DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProCoreActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, notification, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import ViewUserDetail from 'components/admin/user/view.user.detail';
import CreateUser from './create.user';
import ImportUser from './data i-o/import.user';
import * as XLSX from 'xlsx'

type TSearch = {
    fullName: string;
    email: string;
    createdAt: string;
    createdAtRange: [string, string];
}

interface IDataUpdate {
    _id: string;
    fullName: string;
    phone: string;
}

const UserTable = () => {
    const actionRef = useRef<ActionType>()

    const [isOpenUserDetail, setIsOpenUserDetail] = useState<boolean>(false)
    const [dataUserDetail, setDataUserDetail] = useState<IUserTable | null>(null)

    const [isOpenModalCreateUser, setIsOpenModalCreateUser] = useState<boolean>(false)

    const [isOpenModalImportUser, setIsOpenModalImportUser] = useState<boolean>(false)

    const [dataUsers, setDataUsers] = useState<IUserTable[]>([])

    const [editableKeys, setEditableKeys] = useState<React.Key[]>([]);
    const [dataUpdate, setDataUpdate] = useState<IDataUpdate>()

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })

    const columns: ProColumns<IUserTable>[] = [
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
            render: (text, record, _, action) => [
                <a href='#' onClick={() => {
                    setIsOpenUserDetail(true)
                    setDataUserDetail(record)
                }}>{record._id}</a>
            ],
            hideInSearch: true,
            editable: false
        },
        {
            key: "fullName",
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            key: "phone",
            title: 'Phone Number',
            dataIndex: 'phone',
            hideInSearch: true,
        },
        {
            key: "email",
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
            editable: false
        },
        {
            key: "createdAt",
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'date',
            hideInSearch: true,
            sorter: true,
            editable: false
        },
        {
            title: 'Created At',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true,
            editable: false
        },
        {
            key: "action",
            title: 'Action',
            render: (text, record, _, action) => {
                const isEdit: boolean = record._id === editableKeys[0]

                return (
                    <>
                        {isEdit ?
                            <div style={{
                                display: "flex",
                                gap: "15px"
                            }}>
                                <SaveOutlined
                                    style={{ cursor: 'pointer', color: "blue" }}
                                    onClick={async () => {
                                        handleSave()
                                    }}
                                />
                                <CloseOutlined
                                    style={{ cursor: 'pointer', color: "red" }}
                                    onClick={() => {
                                        setEditableKeys([])
                                    }}
                                />
                            </div>
                            :
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
                        }
                    </>
                )
            },
            search: false,
            editable: false
        },
    ];

    const handleExport = () => {
        if (dataUsers && dataUsers.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataUsers);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "DataUsers.xlsx");
        }
    }


    const handleSave = async () => {
        if (dataUpdate) {
            const { _id, fullName, phone } = dataUpdate
            const res = await updateUserAPI(_id, fullName, phone)
            if (res.data) {
                message.success("Update User Successfully")
                actionRef.current?.reload()
                setEditableKeys([])
            } else {
                notification.success({ message: "Update User Failed", description: res.message })
            }
        }
    }

    const handleDelete = async (_id: string) => {
        if (_id) {
            const res = await deleteUserAPI(_id)
            if (res.data) {
                message.success("Delete User Successfully")
                actionRef.current?.reload()
            } else {
                notification.error({ message: "Delete User Failed!", description: res.message })
            }
        }
    }

    return (

        <>
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

                    const res = await getUserAPI(params?.current ?? 1, params?.pageSize ?? 5, query)
                    if (res.data) {
                        setEditableKeys([])
                        setMeta(res.data.meta)
                        setDataUsers(res.data.result)
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
                        icon={<ImportOutlined />}
                        onClick={() => {
                            setIsOpenModalImportUser(true)
                        }}
                        type="primary"
                    >
                        Import
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
                editable={{
                    type: 'single',
                    editableKeys,
                    onChange: (editableKeys) => {
                        setEditableKeys(editableKeys)
                    },
                    onValuesChange: (values) => {
                        const data: IDataUpdate = {
                            _id: values._id,
                            fullName: values.fullName,
                            phone: values.phone
                        }
                        setDataUpdate(data)
                    }
                }}
            />
            <ViewUserDetail
                isOpenUserDetail={isOpenUserDetail}
                setIsOpenUserDetail={setIsOpenUserDetail}
                dataUserDetail={dataUserDetail}
                setDataUserDetail={setDataUserDetail}
            />

            <CreateUser
                isOpenModalCreateUser={isOpenModalCreateUser}
                setIsOpenModalCreateUser={setIsOpenModalCreateUser}
                actionRef={actionRef}
            />

            <ImportUser
                isOpenModalImportUser={isOpenModalImportUser}
                setIsOpenModalImportUser={setIsOpenModalImportUser}
                actionRef={actionRef}
            />
        </>
    )
}

export default UserTable