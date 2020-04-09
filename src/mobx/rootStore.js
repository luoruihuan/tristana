import { observable, action } from 'mobx';
import { configure } from 'mobx';

configure({ enforceActions: 'always' });

class Store {

    @observable
    test = '123';

    @action('test')
    updateCount() {
        this.test = '456';
    }
}
export default new Store();