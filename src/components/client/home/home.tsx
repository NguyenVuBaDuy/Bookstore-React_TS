import { getBookAPI, getCategoryAPI } from "services/api.service";
import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons"
import { Button, Checkbox, Col, Divider, Form, InputNumber, Pagination, Rate, Row, Spin, Tabs } from "antd"
import { TabsProps } from "antd/lib";
import 'components/client/home/home.scss'
import { useEffect, useState } from "react";

const Home = () => {

    const [form] = Form.useForm()
    const [category, setCategory] = useState<string[]>([])
    const [dataBooks, setDataBooks] = useState<IBookTable[] | undefined>(undefined)
    const [current, setCurrent] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [total, setTotal] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const [filter, setFilter] = useState<string>('')
    const [sorter, setSorter] = useState<string>('&sort=-sold')

    useEffect(() => {
        const getCategory = async () => {
            const res = await getCategoryAPI()
            if (res.data) {
                setCategory(res.data)
            }
        }
        getCategory()
    }, [])

    useEffect(() => {
        const getBooks = async () => {
            setLoading(true)
            const res = await getBookAPI(current, pageSize, filter, sorter)
            if (res.data) {
                setDataBooks(res.data.result)
                setTotal(res.data.meta.total)
            }
            setLoading(false)
        }
        getBooks()
    }, [current, pageSize, filter, sorter])

    const items: TabsProps['items'] = [
        {
            key: '-sold',
            label: 'Popular',
        },
        {
            key: '-updatedAt',
            label: 'New',
        },
        {
            key: 'price',
            label: 'Low To High',
        },
        {
            key: '-price',
            label: 'High To Low'
        }
    ];

    const handleOnChange = (pagination: { current: number, pageSize: number }) => {
        if (pagination) {
            if (pagination.current) {
                setCurrent(+pagination.current)
            }
            if (pagination.pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    }

    const handleFilter = (changedValues: any, { category, range }) => {
        if (changedValues.category) {
            let f = ''
            if (category && category.length) {
                f += `&category=` + category.join(',')
            }

            if (range?.from >= 0) {
                f += `&price>=${range.from}`
            }
            if (range?.to >= 0) {
                f += `&price<=${range.to}`
            }

            setFilter(f)

        }
    }


    const handleFinish = (values: any) => {
        if (values?.range?.from >= 0 && values?.range?.to >= 0) {
            let f = `&price>=${values?.range?.from}&price<=${values?.range?.to}`
            if (values?.category?.length) {
                const cate = values?.category?.join(',')
                f += `&category=${cate}`
            }
            setFilter(f)
        }
    }

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
                                        form.resetFields()
                                        setFilter('')
                                    }}
                                />
                            </div>
                            <Divider />
                            <Form
                                onFinish={(values) => { handleFinish(values) }}
                                form={form}
                                onValuesChange={(changedValues, values) => { handleFilter(changedValues, values) }}
                            >
                                <Form.Item
                                    name="category"
                                    label="Category"
                                    labelCol={{ span: 24 }}
                                >
                                    <Checkbox.Group>
                                        <Row>
                                            {category.map((item: string) => (
                                                <Col span={24} style={{ padding: '7px 0' }}>
                                                    <Checkbox value={item}>
                                                        {item}
                                                    </Checkbox>
                                                </Col>
                                            ))}
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
                                        <Button onClick={() => { form.submit() }}
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
                        <Spin spinning={loading} tip='Loading...'>
                            <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                                <Row>
                                    <Tabs defaultActiveKey="-sold"
                                        items={items}
                                        onChange={(value) => { setSorter(`&sort=${value}`) }} />
                                </Row>
                                <Row className='customize-row'>

                                    {dataBooks && dataBooks.map((item: IBookTable) => (
                                        <div className="column">
                                            <div className='wrapper'>
                                                <div className='thumbnail'>
                                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" />
                                                </div>
                                                <div className='text'>{item.mainText}</div>
                                                <div className='price'>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                </div>
                                                <div className='rating'>
                                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                    <span>Sold {item.sold}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </Row>
                                <div style={{ marginTop: 30 }}>
                                    <Row style={{ display: "flex", justifyContent: "center" }}>
                                        <Pagination
                                            current={current}
                                            pageSize={pageSize}
                                            total={total}
                                            responsive
                                            onChange={(p, s) => { handleOnChange({ current: p, pageSize: s }) }}
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