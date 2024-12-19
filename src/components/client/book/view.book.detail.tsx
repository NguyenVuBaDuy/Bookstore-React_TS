import { Col, Divider, Rate, Row } from "antd";
import ImageGallery from "react-image-gallery";
import 'components/client/book/book.scss'
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import ModalGallery from "./modal.gallery";

interface IProps {
    dataBook: IBookTable;
}


const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];


const ViewBookDetail = (props: IProps) => {

    const { dataBook } = props
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [isModalImageOpen, setIsModalImageOpen] = useState<boolean>(false)
    const images = dataBook?.items ?? []
    const title: string = dataBook?.mainText ?? ''

    const handleOnClickImage = () => {
        setIsModalImageOpen(true)
    }

    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {dataBook && dataBook._id
                        ?
                        <Row gutter={[20, 20]}>
                            <Col md={10} xs={0}>
                                <ImageGallery
                                    items={images}
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    renderLeftNav={() => <></>}
                                    renderRightNav={() => <></>}
                                    slideOnThumbnailOver={true}
                                    onClick={() => { handleOnClickImage() }}
                                    onSlide={(i) => { setCurrentIndex(i) }}
                                />
                            </Col>
                            <Col md={14} xs={24}>
                                <Col md={0} xs={24}>
                                    <ImageGallery
                                        items={images}
                                        showFullscreenButton={false}
                                        showPlayButton={false}
                                        renderLeftNav={() => <></>}
                                        renderRightNav={() => <></>}
                                        slideOnThumbnailOver={true}
                                        onClick={() => { handleOnClickImage() }}
                                        onSlide={(i) => { setCurrentIndex(i) }}
                                    />
                                </Col>
                                <Col xs={24}>
                                    <div className='author'>Author: <a href='#'>{dataBook.author}</a> </div>
                                    <div className='title'>{title}</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                        <span className='sold'>
                                            <Divider type="vertical" />
                                            Sold {dataBook.sold}</span>
                                    </div>
                                    <div className='price'>
                                        <span className='currency'>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBook.price)}
                                        </span>
                                    </div>
                                    <div className='delivery'>
                                        <div>
                                            <span className='left-side'>Transport</span>
                                            <span className='right-side'>Free shipping</span>
                                        </div>
                                    </div>
                                    <div className='quantity'>
                                        <span className='left-side'>Quantity</span>
                                        <span className='right-side'>
                                            <button><MinusOutlined /></button>
                                            <input />
                                            <button><PlusOutlined /></button>
                                        </span>
                                        <span style={{ marginLeft: "10px", color: "#757575" }}>{dataBook.quantity} available</span>
                                    </div>

                                    <div className='buy'>
                                        <button className='cart'>
                                            <BsCartPlus className='icon-cart' />
                                            <span>Add To Cart</span>
                                        </button>
                                        <button className='now'>Buy Now</button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        :
                        <div>skeleton</div>
                    }
                </div>
            </div>
            <ModalGallery
                isModalImageOpen={isModalImageOpen}
                setIsModalImageOpen={setIsModalImageOpen}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                images={images}
                title={title}
            />
        </div>
    )
}

export default ViewBookDetail