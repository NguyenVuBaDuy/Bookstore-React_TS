import { createBookAPI, handleUploadFile } from "@/services/api.service";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType } from "@ant-design/pro-components";
import { Col, Divider, Form, GetProp, Input, InputNumber, message, Modal, notification, Row, Select, Upload } from "antd";
import { UploadProps } from "antd/lib";
import { useEffect, useState } from "react";

interface IProps {
    isOpenModalCreateBook: boolean;
    setIsOpenModalCreateBook: (v: boolean) => void;
    category: any;
    actionRef: React.MutableRefObject<ActionType | undefined>;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });



const CreateBook = (props: IProps) => {
    const { setIsOpenModalCreateBook, isOpenModalCreateBook, category, actionRef } = props

    const [form] = Form.useForm();
    const [listCategory, setListCategory] = useState<any>([])

    const [loadingThumbnail, setLoadingThumbnail] = useState(false);
    const [loadingSliders, setLoadingSliders] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>();
    const [thumbnail, setThumbnail] = useState<any>([]);
    const [sliders, setSliders] = useState<any>([]);
    const [previewOpen, setPreviewOpen] = useState<boolean>(false)
    const [previewTitle, setPreviewTitle] = useState<string>('')
    const [previewImage, setPreviewImage] = useState<any>('')

    useEffect(() => {
        if (category) {
            const cate = Object.entries(category).map(item => {
                return {
                    value: item[0],
                    label: item[1]
                }
            })
            setListCategory(cate)
        }
    }, [category])

    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange: UploadProps['onChange'] = (info, type?: string) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSliders(true) : setLoadingThumbnail(true)
            return;
        }
    }

    const handleChangeThumbnail = async (values: any) => {
        const { file, onSuccess, onError } = values
        const res = await handleUploadFile(file, 'book')
        if (res && res.data) {
            setThumbnail([{
                uid: file.uid,
                name: res.data.fileUploaded,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${res.data.fileUploaded}`
            }])
            onSuccess("ok")
            setLoadingThumbnail(false)
        } else onError('Error')
    }

    const handleChangeSliders = async (values: any) => {
        const { file, onSuccess, onError } = values
        const res = await handleUploadFile(file, 'book')
        if (res && res.data) {
            setSliders((sliders: any) => [...sliders, {
                uid: file.uid,
                name: res.data.fileUploaded,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${res.data.fileUploaded}`
            }])
            onSuccess("ok")
            setLoadingSliders(false)
        } else onError('Error')
    }


    const handleRemoveSliders = (file: any) => {
        const uid: string = file.originFileObj.uid
        const slidersTmp = sliders.filter((item: any) => {
            return item.uid !== uid
        })
        setSliders(slidersTmp)
    }

    const handleCreateBook = async (values: IBookTable) => {

        if (thumbnail.length === 0) {
            notification.error({
                message: "Where is Thumbnail???",
                description: "Please add thumbnail:)))"
            })
            return
        }

        const thumbnailName: string = thumbnail[0].name
        const slidersName: string[] = sliders.map((item: any) => item.name)

        const { mainText, author, price, quantity, category } = values

        const res = await createBookAPI(thumbnailName, slidersName, mainText, author, price, quantity, category)
        if (res.data) {
            message.success("Create Book Successfully")
            actionRef.current?.reload()
            form.resetFields();
            setSliders([]);
            setThumbnail([])
            setIsOpenModalCreateBook(false);
        } else {
            notification.error({ message: "Create Book Failed", description: res.message })
        }
    }



    return (
        <>
            <Modal
                title="Create Book"
                open={isOpenModalCreateBook}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setIsOpenModalCreateBook(false)
                    form.resetFields()
                    setSliders([])
                    setThumbnail([])
                }}
                centered
                width={"60vw"}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleCreateBook}
                    autoComplete="off"
                >
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="mainText"
                                label="Book detail"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter book title"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="author"
                                label="Author"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter author"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter price"
                                    },
                                ]}

                            >
                                <InputNumber
                                    min={0}
                                    addonAfter="VND"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter author"
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={listCategory}
                                />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter quantity"
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "50%" }}>
                            <Divider orientation="left">Thumbnail</Divider>

                        </Col>
                        <Col style={{ width: "50%" }}>
                            <Divider orientation="left">Sliders</Divider>

                        </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="thumbnail"
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleChangeThumbnail}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    onRemove={() => setThumbnail([])}
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                    >
                                        {loadingThumbnail ? <LoadingOutlined /> : <PlusOutlined />}
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="sliders"
                            >
                                <Upload
                                    name="sliders"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={6}
                                    multiple={true}
                                    customRequest={handleChangeSliders}
                                    beforeUpload={beforeUpload}
                                    onChange={(info) => handleChange(info, 'sliders')}
                                    onRemove={handleRemoveSliders}
                                    onPreview={handlePreview}

                                >
                                    {sliders.length < 6 &&
                                        <button
                                            style={{
                                                border: 0,
                                                background: 'none',
                                            }}
                                            type="button"
                                        >
                                            {loadingSliders ? <LoadingOutlined /> : <PlusOutlined />}
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
                                        </button>
                                    }
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                centered
                onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}

export default CreateBook 