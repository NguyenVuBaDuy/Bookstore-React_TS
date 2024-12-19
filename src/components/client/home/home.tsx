import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons"
import { Button, Checkbox, Col, Divider, Form, InputNumber, Pagination, Rate, Row, Spin, Tabs } from "antd"
import { TabsProps } from "antd/lib";
import 'components/client/home/home.scss'

const Home = () => {

    const [form] = Form.useForm();

    const items: TabsProps['items'] = [
        {
            key: 'popular',
            label: 'Popular',
        },
        {
            key: 'new',
            label: 'New',
        },
        {
            key: 'lowToHigh',
            label: 'Low To High',
        },
        {
            key: 'highToLow',
            label: 'High To Low'
        }
    ];

    return (
        <div style={{ background: '#efefef', padding: "20px 0", minHeight: "calc(100vh - 123.4px)" }}>
            <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0}>
                        <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <span> <FilterTwoTone />
                                    <span style={{ fontWeight: 500 }}> Search filter</span>
                                </span>
                                <ReloadOutlined
                                    title="Reset"
                                    onClick={() => {

                                    }}
                                />
                            </div>
                            <Divider />
                            <Form
                                onFinish={() => { }}
                                form={form}
                                onValuesChange={() => { }}
                            >
                                <Form.Item
                                    name="category"
                                    label="Category"
                                    labelCol={{ span: 24 }}
                                >
                                    <Checkbox.Group>
                                        <Row>

                                            <Col span={24} style={{ padding: '7px 0' }}>
                                                <Checkbox value={'A'} >
                                                    A
                                                </Checkbox>
                                            </Col>
                                            <Col span={24} style={{ padding: '7px 0' }}>
                                                <Checkbox value={'A'} >
                                                    A
                                                </Checkbox>
                                            </Col>
                                            <Col span={24} style={{ padding: '7px 0' }}>
                                                <Checkbox value={'A'} >
                                                    A
                                                </Checkbox>
                                            </Col>
                                            <Col span={24} style={{ padding: '7px 0' }}>
                                                <Checkbox value={'A'} >
                                                    A
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Price"
                                    labelCol={{ span: 24 }}
                                >
                                    <Row gutter={[10, 10]} style={{ width: "100%" }}>
                                        <Col xl={11} md={24}>
                                            <Form.Item name={["range", 'from']}>
                                                <InputNumber
                                                    name='from'
                                                    min={0}
                                                    placeholder="FROM"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xl={2} md={0}>
                                            <div > - </div>
                                        </Col>
                                        <Col xl={11} md={24}>
                                            <Form.Item name={["range", 'to']}>
                                                <InputNumber
                                                    name='to'
                                                    min={0}
                                                    placeholder="TO"
                                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <div>
                                        <Button onClick={() => { }}
                                            style={{ width: "100%" }} type='primary'>Apply</Button>
                                    </div>
                                </Form.Item>
                                <Divider />
                                <Form.Item
                                    label="Rating"
                                    labelCol={{ span: 24 }}
                                >
                                    <div>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                        <span className="ant-rate-text"></span>
                                    </div>
                                    <div>
                                        <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    </div>
                                    <div>
                                        <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    </div>
                                    <div>
                                        <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    </div>
                                    <div>
                                        <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col md={20} xs={24} >
                        <Spin spinning={false} tip='Loading...'>
                            <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                                <Row>
                                    <Tabs defaultActiveKey="-sold"
                                        items={items}
                                        onChange={() => { }} />
                                </Row>
                                <Row className='customize-row'>
                                    <div className="column" key={1}
                                        onClick={() => { }}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>Book title</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>Sold 12</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column" key={1}
                                        onClick={() => { }}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>Book title</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>Sold 12</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column" key={1}
                                        onClick={() => { }}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>Book title</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>Sold 12</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column" key={1}
                                        onClick={() => { }}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>Book title</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>Sold 12</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column" key={1}
                                        onClick={() => { }}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>Book title</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>Sold 12</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column" key={1}
                                        onClick={() => { }}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>Book title</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>Sold 12</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column" key={1}
                                        onClick={() => { }}>
                                        <div className='wrapper'>
                                            <div className='thumbnail'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/2-579456815ebd4eb1376341dcd00c4708.jpg`} alt="thumbnail book" />
                                            </div>
                                            <div className='text'>Book title</div>
                                            <div className='price'>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000)}
                                            </div>
                                            <div className='rating'>
                                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                <span>Sold 12</span>
                                            </div>
                                        </div>
                                    </div>

                                </Row>
                                <div style={{ marginTop: 30 }}>
                                    <Row style={{ display: "flex", justifyContent: "center" }}>
                                        <Pagination
                                            current={1}
                                            pageSize={10}
                                            total={10}
                                            responsive
                                            onChange={(p, s) => { }}
                                        />
                                    </Row>
                                </div>
                            </div>
                        </Spin>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Home