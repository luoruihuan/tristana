import DashboardStore from './dashboard2/store';

class Store {
    dashboardStore: DashboardStore;

    constructor() {
        this.dashboardStore = new DashboardStore();
    }
}
export default new Store();