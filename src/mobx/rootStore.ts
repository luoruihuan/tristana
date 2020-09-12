import DashboardStore from './Dashboard/store';
import AddGoodsStore from './AddGoods/store';
// import CounterStore from './CounterStore/store';

class Store {
    dashboardStore: DashboardStore;
    addGoodsStore: AddGoodsStore;

    constructor() {
        this.dashboardStore = new DashboardStore();
        this.addGoodsStore = new AddGoodsStore();
        // this.counterStore = new CounterStore();
    }
}
export default new Store();