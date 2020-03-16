import { action, observable } from 'mobx';
import {
    serialize, deserialize,
    update,
    serializable, getDefaultModelSchema
} from 'serializr';

export default class BasicStore {
    @observable isLoading  = observable.map({ });
  
    @action
    changeLoadingStatus (loadingType, type) {
        this.isLoading.set(loadingType, type);
    }
}

// 初始化loading
export function initLoading(target, key, descriptor) {
    const oldValue = descriptor.value;

    descriptor.value = async function(...args) {
        this.changeLoadingStatus(key, true);
        let res;
        try {
            res = await oldValue.apply(this, args);
        // eslint-disable-next-line no-useless-catch
        } catch (error) {
            // 做一些错误上报之类的处理 
            throw error;
        } finally {
            this.changeLoadingStatus(key, false);
        }
        return res;
    };
    
    return descriptor;
}

export function storage(key) {
    return function(target, name, descriptor) {
        // var args = [];
        // for (var i = 0; i < arguments.length; i++) {
        //     args[i] = arguments[i];
        // }
        // var a = args[0], b = args[1], c = args[2];
        // if (a in types_1.types) {
        //     return serializable(types_1.types[a](b));
        // }
        // else if (args.length === 1) {
        //     return function (target) { return persistObject(target, a); };
        // }
        // return serializable.apply(null, args);
        // 如果是普通属性
        if (descriptor.initializer) {
            let value = localStorage.getItem(key);
            // 如果没有`localStorage`保存该值，则使用该字段的默认值，比如`@observable field = 5`的默认值就是`5`
            if (!value) {
                value = descriptor.initializer.call(this);
            }

            return {
                set: function(v) {
                    if (value === v) return;
                    value = v;
                    localStorage.setItem(key, v);
                },
                // 每当取值时，将内部变量返回出去，这里并不直接从`localStorage`取值是因为该操作性能较差
                get: function() {
                    return value;
                },
                enumerable: true,
                configurable: true
            };
        } else {
            console.log(333, target);
            let value = localStorage.getItem(key);
            // 如果`localStorage`已经保存该值，则调用原有属性描述符的`set`方法赋值
            if (!value) {
                descriptor.set(value);
            }
            return {
                // 每当赋值时，将新值保存到`localStorage`中，并调用原有属性描述符的`set`方法赋值
                set: function(v) {
                    console.log(444, v);
                    localStorage.setItem(key, v);
                    return descriptor.set(v);
                },
                // 每当取值时，调用原有属性描述符的`get`方法取值
                get: function() {
                    console.log(555, descriptor.get(name));
                    return descriptor.get();
                },
                enumerable: true,
                configurable: true
            };
        }
    };
}