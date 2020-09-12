import DashboardStore from './Dashboard/store';
import AddGoodsStore from './AddGoods/store';
import CounterStore from './Counter/store';

class Store {
    dashboardStore: DashboardStore;
    addGoodsStore: AddGoodsStore;
    counterStore: CounterStore;

    constructor() {
        this.dashboardStore = new DashboardStore();
        this.addGoodsStore = new AddGoodsStore();
        this.counterStore = new CounterStore();
    }
}
export default new Store();