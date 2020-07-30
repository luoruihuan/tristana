import request from 'request';

// 获取表格数据
export function getTable(params = {}) {
    return request({
        url: 'getTable',
        method: 'POST',
        data: params
    });
}