import { Badge, Descriptions, Divider, Drawer, Modal, Upload, UploadFile, UploadProps } from "antd"
import { GetProp } from "antd/lib";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    isOpenBookDetail: boolean;
    setIsOpenBookDetail: (v: boolean) => void;
    dataBookDetail: IBookTable | null;
    setDataBookDetail: (v: IBookTable | null) => void
}

type TFileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: TFileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const ViewBookDetail = (props: IProps) => {

    const { isOpenBookDetail, dataBookDetail, setIsOpenBookDetail, setDataBookDetail } = props

    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [previewImageTitle, setPreviewImageTitle] = useState<string>('')

    const format: string = "YYYY-MM-DD"

    const [fileList, setFileList] = useState<UploadFile[]>([])

    useEffect(() => {
        const setImages = () => {
            const images = dataBookDetail ? [dataBookDetail.thumbnail, ...dataBookDetail.slider].map(item => {
                return {
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
                }
            }) : [];

            setFileList(images)
        }
        setImages()
    }, [dataBookDetail])



    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setIsPreviewOpen(true);
        setPreviewImageTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };


    return (
        <Drawer
            title="Book Detail"
            onClose={() => {
                setDataBookDetail(null)
                setIsOpenBookDetail(false)
            }}
            open={isOpenBookDetail}
            width="50vw"
        >
            {dataBookDetail ?


                <>
                    <Divider orientation="left">Book Info</Divider>
                    <Descriptions
                        bordered
                    >
                        <Descriptions.Item
                            label="Id"
                            span={3}
                        >
                            {dataBookDetail?._id}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Book Title"
                            span={3}
                        >
                            {dataBookDetail?.mainText}
                        </Descriptions.Item>


                        <Descriptions.Item
                            label="Author"
                            span={2}
                        >
                            {dataBookDetail?.author}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Price"
                            span={2}
                        >
                            <>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBookDetail.price)}</>
                        </Descriptions.Item>


                        <Descriptions.Item
                            label="Category"
                            span={3}
                        >
                            <Badge status="processing" text={dataBookDetail.category} />
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Created At"
                            span={2}
                        >
                            {dayjs(dataBookDetail?.createdAt).format(format)}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Lasted Updated"
                            span={2}
                        >
                            {dayjs(dataBookDetail?.updatedAt).format(format)}
                        </Descriptions.Item>

                    </Descriptions>

                    <Divider orientation="left">Book Images</Divider>

                    <>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            showUploadList={{
                                showRemoveIcon: false
                            }}
                        >
                        </Upload>
                        <Modal
                            title={previewImageTitle}
                            open={isPreviewOpen}
                            onCancel={() => {
                                setPreviewImage('')
                                setIsPreviewOpen(false)
                                setPreviewImageTitle('')
                            }}
                            footer={null}
                            centered
                        >
                            <img src={previewImage} style={{ width: '100%' }} />
                        </Modal>
                    </>

                </>
                :
                <div>No data</div>
            }
        </Drawer >
    )
}

export default ViewBookDetail