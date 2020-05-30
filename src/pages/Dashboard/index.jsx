import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Table } from 'antd';
import './index.less';

@inject('dashboardStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dashboardStore } = this.props;
        dashboardStore.getTable();
    }

    render() {
        const { dashboardStore: { list }, dashboardStore } = this.props;
        return (
            <section className="dashboard">
                <OrderTable list={list} isLoading={dashboardStore.isLoading.get('getTable')} />
            </section>
        );
    }
}

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

// 订单表格
function OrderTable({ list, isLoading }) {
    return (
        <Table
            columns={columns}
            dataSource={list || []}
            loading={isLoading}
            rowKey="orderId"
        />
    );
}

export default Index;