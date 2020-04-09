import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CounterStore from '../../mobx/CounterStore/store';
import './index.less';

@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.counterStore = new CounterStore();
    }

    render() {
        const { obj } = this.counterStore;
        return (
            <section className="counter">
                <button onClick={() => this.counterStore.add()}>+</button>
                <span>count is: {obj.count}</span>
                <button onClick={() => this.counterStore.reduce()}>-</button>
            </section>
        );
    }
}

export default Index;