import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Form, Input, Select, Button } from 'antd';
import './index.less';

const colWidth = 150;

const Option = Select;

@inject('dashboardStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dashboardStore, history, match } = this.props;
        console.log(333, history, match.params.id);
        dashboardStore.getTable();
    }

    handleSubmit = (values) => {
        console.log('Success:', values);
    }

    render() {
        const { dashboardStore: { list }, dashboardStore } = this.props;

        console.log(444);
        return (
            <section className="dashboard">
                {/* <OrderSearch handleSubmit={this.handleSubmit} />
                <OrderTable list={list} isLoading={dashboardStore.isLoading.get('getTable')} /> */}
            </section>
        );
    }
}

// 订单表格
const OrderTable = ({ list, isLoading }) =>  {

    // 表格列配置
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderId'
        },
        {
            title: '客户名称',
            dataIndex: 'customerName'
        },
        {
            title: '下单方式',
            dataIndex: 'placeOrder'
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName'
        },
        {
            title: '价格',
            dataIndex: 'price'
        },
        {
            title: '下单时间',
            dataIndex: 'placeOrderTime'
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={list || []}
            loading={isLoading}
            rowKey="orderId"
        />
    );
}

// 筛选项
const OrderSearch = (props) => {
    const { handleSubmit } = props;
    return (
        <section className="dashboard-search">
            <Form
                layout="inline"
                name="orderListSearch"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="订单编号"
                    name="orderId"
                >
                    <Input placeholder="请输入订单编号" style={{ width: colWidth }} />
                </Form.Item>
                <Form.Item
                    label="客户名称"
                    name="customerName"
                >
                    <Input placeholder="请输入客户名称" style={{ width: colWidth }} />
                </Form.Item>
                <Form.Item
                    label="下单方式"
                    name="placeOrder"
                >
                    <Select
                        allowClear
                        style={{ width: colWidth }}
                        placeholder="请选择下单方式"
                    >
                        <Option value={1}>自主下单</Option>
                        <Option value={2}>代下单</Option>
                    </Select>
                </Form.Item>
                <section className="dashboard-button">
                    <Form.Item>
                        <Button
                            htmlType="submit"
                        >
                            重置
                        </Button>
                        <Button
                            htmlType="submit"
                            className="btn-left"
                        >
                            导出
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="btn-left"
                        >
                            搜索
                        </Button>
                    </Form.Item>
                </section>
            </Form>
        </section>
    )
}

export default Index;