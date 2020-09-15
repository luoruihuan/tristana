import DashboardStore from './dashboard/store';

class Store {
    dashboardStore: DashboardStore;

    constructor() {
        this.dashboardStore = new DashboardStore();
    }
}
export default new Store();