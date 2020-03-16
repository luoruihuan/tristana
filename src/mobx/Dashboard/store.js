import { observable, action, runInAction } from 'mobx';
import BasicStore, { initLoading, storage } from '../basicStore';
import { isResultError } from '../../utils/index';
import * as api from '../../servers/dashboard';
class DashBoardStore extends BasicStore {
    // @storage
    @observable
    list = [];

    @initLoading
    @action
    async getTable() {
        const list = await api.getTable();
        runInAction(() => {
            this.list = isResultError(list);
            // this.table = 123;
            // storage.setItem('calendarView', JSON.stringify(this.table.list));
        });
    }
}

export default DashBoardStore;