import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table } from 'antd';
import DashboardStore from '../../mobx/Dashboard/store';
import './index.less';

@inject('rootStore')
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.dashboardStore = new DashboardStore();
    }

    componentDidMount() {
        this.dashboardStore.getTable();
    }

    render() {
        const { list } = this.dashboardStore;
        return (
            <section className="dashboard">
                <OrderTable list={list} isLoading={this.dashboardStore.isLoading.get('getTable')} />
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