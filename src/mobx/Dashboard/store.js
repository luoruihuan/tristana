import { observable, action, runInAction } from 'mobx';
import BasicStore, { initLoading } from '../basicStore';
import { isResultError } from '../../utils/index';
import storage from '../../utils/store';
import * as api from '../../servers/dashboard';
import Item from 'antd/lib/list/Item';
class DashBoardStore extends BasicStore {
    @storage.sync('test')
    @observable
    list = [];

    @initLoading
    @action
    async getTable() {
        const res = await api.getTable();
        runInAction(() => {
            this.list = isResultError(res);
        });
    }
}

export default DashBoardStore;