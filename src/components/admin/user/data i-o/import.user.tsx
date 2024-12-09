import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Modal, notification, Table } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import Exceljs from 'exceljs'
import { Buffer } from 'buffer';
import { useState } from 'react';
import { importUserAPI } from '@/services/api.service';
import { ActionType } from '@ant-design/pro-components';
import templateFile from 'components/admin/user/data i-o/template.xlsx?url'

type TDummyRequestParams = {
    file: File;
    onSuccess: (res: string) => void;
};

interface IProps {
    isOpenModalImportUser: boolean;
    setIsOpenModalImportUser: (v: boolean) => void;
    actionRef: React.MutableRefObject<ActionType | undefined>;
}

interface IDataImport {
    fullName: string;
    email: string;
    phone: string;
    password: string;
}
const dummyRequest = ({ file, onSuccess }: TDummyRequestParams) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};



const columns = [
    {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
];

const ImportUser = (props: IProps) => {
    const { isOpenModalImportUser, setIsOpenModalImportUser, actionRef } = props
    const [dataImport, setDataImport] = useState<IDataImport[]>([])
    const [fileList, setFileList] = useState([])

    const propsUpload: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        customRequest: dummyRequest,
        fileList: fileList,
        async onChange(info) {
            const { status } = info.file;
            setFileList(info.fileList)
            if (info.fileList.length === 0) {
                setDataImport([])
            }
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);

                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj
                    const workbook = new Exceljs.Workbook()
                    const arrayBuffer: any = await file?.arrayBuffer()
                    const buffer = Buffer.from(arrayBuffer)
                    await workbook.xlsx.load(buffer)

                    let jsonData: IDataImport[] = [];
                    workbook.worksheets.forEach(function (sheet) {
                        // read first row as data keys
                        let firstRow = sheet.getRow(1);
                        if (!firstRow.cellCount) return;
                        let keys = firstRow.values as any[]
                        sheet.eachRow((row, rowNumber) => {
                            if (rowNumber == 1) return;
                            let values = row.values as any
                            let obj: any = {};
                            for (let i = 1; i < keys.length; i++) {
                                obj[keys[i]] = values[i];
                            }
                            jsonData.push(obj)

                            const addDefaultPassword: IDataImport[] = jsonData.map(item => {
                                return { ...item, 'password': "123456" }
                            })
                            setDataImport(addDefaultPassword)
                        })
                    });
                }

            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    };

    const handleImportUser = async () => {
        const res = await importUserAPI(dataImport)
        if (res.data) {
            notification.success({
                message: "Import User Successfully",
                description: `Success : ${res.data.countSuccess} | Error : ${res.data.countError}`
            })
            actionRef.current?.reload()
        } else {
            notification.error({ message: "Import User Failed", description: res.message })
        }
        setIsOpenModalImportUser(false)
        setDataImport([])
        setFileList([])
    }

    return (
        <Modal
            title="Import User"
            open={isOpenModalImportUser}
            onOk={() => { handleImportUser() }}
            onCancel={() => {
                setIsOpenModalImportUser(false)
                setDataImport([])
                setFileList([])
            }}
            width={"50vw"}
            okText="Import"
            okButtonProps={{
                disabled: dataImport.length === 0
            }}
        >
            <Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single upload.
                    Only accept .csv, .xls, .xlsx . or <a href={templateFile} download onClick={event => event.stopPropagation()}>Download Sample File</a>
                </p>
            </Dragger>



            <div style={{ marginTop: 20 }}>
                <Table
                    title={() => <span>Data Upload:</span>}
                    dataSource={dataImport}
                    columns={columns}
                    pagination={false}
                />
            </div>
        </Modal>
    )
}

export default ImportUser