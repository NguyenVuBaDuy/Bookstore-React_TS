import { handleUploadFile, updateBookAPI } from "@/services/api.service";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType } from "@ant-design/pro-components";
import { Col, Divider, Form, GetProp, Input, InputNumber, message, Modal, notification, Row, Select, Upload } from "antd"
import { UploadProps } from "antd/lib";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    setDataUpdateBook: (v: IBookTable | null) => void;
    dataUpdateBook: IBookTable | null;
    setIsOpenModalUpdateBook: (v: boolean) => void;
    isOpenModalUpdateBook: boolean;
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

const UpdateBook = (props: IProps) => {

    const { setDataUpdateBook, dataUpdateBook,
        setIsOpenModalUpdateBook, isOpenModalUpdateBook,
        actionRef, category } = props

    const [form] = Form.useForm();
    const [listCategory, setListCategory] = useState<any>([])
    const [thumbnail, setThumbnail] = useState<any>(null)
    const [sliders, setSliders] = useState<any>(null)
    const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false)
    const [loadingSliders, setLoadingSliders] = useState<boolean>(false)
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

    useEffect(() => {
        if (dataUpdateBook) {
            form.setFieldsValue({
                mainText: dataUpdateBook.mainText,
                author: dataUpdateBook.author,
                price: dataUpdateBook.price,
                category: dataUpdateBook.category,
                quantity: dataUpdateBook.quantity,
                _id: dataUpdateBook._id,
                sold: dataUpdateBook.sold
            })
            setThumbnail([{
                uid: uuidv4(),
                status: 'done',
                name: dataUpdateBook.thumbnail,
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdateBook.thumbnail}`
            }])

            setSliders([...dataUpdateBook.slider].map(item => {
                return {
                    uid: uuidv4(),
                    status: 'done',
                    name: item,
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
                }
            }))
        }
    }, [dataUpdateBook])


    const handleChange: UploadProps['onChange'] = (info, type?: string) => {
        if (info.file.status === 'uploading') {
            type ? setLoadingSliders(true) : setLoadingThumbnail(true)
            return;
        }
    }

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

    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

    const handleRemoveSliders = (file: any) => {
        const newSlider = sliders.filter((x: any) => x.uid !== file.uid);
        setSliders(newSlider);
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

    const handleUpdateBook = async (values: IBookTable) => {

        if (thumbnail.length === 0) {
            notification.error({
                message: "Where is Thumbnail???",
                description: "Please add thumbnail:)))"
            })
            return
        }

        const thumbnailName: string = thumbnail[0].name
        const slidersName: string[] = sliders.map((item: any) => item.name)

        const { _id, mainText, author, price, quantity, category, sold } = values

        const res = await updateBookAPI(_id, thumbnailName, slidersName, mainText, author, price, quantity, category, sold)
        if (res.data) {
            message.success("Update Book Successfully")
            actionRef.current?.reload()
            form.resetFields();
            setSliders([]);
            setThumbnail([])
            setIsOpenModalUpdateBook(false);
        } else {
            notification.error({ message: "Create Book Failed", description: res.message })
        }
    }

    return (
        <Modal
            title="Create Book"
            open={isOpenModalUpdateBook}
            onOk={() => { form.submit() }}
            onCancel={() => {
                setIsOpenModalUpdateBook(false)
                setDataUpdateBook(null)
                form.resetFields()
            }}
            centered
            width={"60vw"}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={(values) => { handleUpdateBook(values) }}
                autoComplete="off"
            >
                <Form.Item name="_id" hidden></Form.Item>
                <Form.Item name="sold" hidden></Form.Item>

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
                                fileList={thumbnail}
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
                                fileList={sliders}
                                maxCount={6}
                                multiple={true}
                                customRequest={handleChangeSliders}
                                beforeUpload={beforeUpload}
                                onChange={(info) => handleChange(info, 'sliders')}
                                onRemove={handleRemoveSliders}
                                onPreview={handlePreview}

                            >
                                {sliders != null && sliders.length < 6 &&
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
    )
}

export default UpdateBook