import { observable, action, runInAction } from 'mobx';
import BasicStore, { initLoading } from '../basicStore';
import * as api from 'servers/dashboard';
class DashBoardStore extends BasicStore {
    @observable
    list = [];

    @initLoading
    @action
    async getTable() {
        const res = await api.getTable();
        runInAction(() => {
            this.list = res.result;
        });
    }
}

export default DashBoardStore;