import { Col, Image, Modal, Row } from "antd";
import ImageGallery from 'react-image-gallery';
import { useEffect, useRef, useState } from "react";


const ModalGallery = (props) => {

    const { isModalImageOpen, setIsModalImageOpen, currentIndex, images, title } = props

    const refGallery = useRef(null)

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (isModalImageOpen) {
            setActiveIndex(currentIndex)
        }
    }, [isModalImageOpen])


    return (
        <Modal
            width={'60vw'}
            open={isModalImageOpen}
            onCancel={() => setIsModalImageOpen(false)}
            footer={null} //hide footer
            className="modal-gallery"
        >
            <Row gutter={[20, 20]}>
                <Col span={16}>
                    <ImageGallery
                        ref={refGallery}
                        items={images}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showThumbnails={false}
                        onSlide={(index) => { setActiveIndex(index) }}
                        startIndex={currentIndex}
                        slideDuration={0}
                    />
                </Col>
                <Col span={8}>
                    <div style={{ padding: "5px 0 20px 0", fontWeight: 400, fontSize: "14px" }}>{title}</div>
                    <div>
                        <Row gutter={[20, 20]}>
                            {
                                images?.map((item, i) => {
                                    return (
                                        <Col key={`image-${i}`}>
                                            <Image
                                                wrapperClassName={"img-normal"}
                                                width={100}
                                                height={100}
                                                src={item.original}
                                                preview={false}
                                                onClick={() => refGallery.current.slideToIndex(i)}
                                            />
                                            <div className={activeIndex === i ? "active" : ""}></div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        </Modal>
    )
}

export default ModalGallery;