/*
 * 错误捕获组件
 * @Author: Jiang
 * @Date: 2019-06-12 15:21:19
 * @Last Modified by: Jiang
 * @Last Modified time: 2020-05-30 14:55:41
 */
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, info: '' };
    }
  
    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染可以显示降级 UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        this.setState({
            info: info.componentStack
        });
    }
  
    render() {
        if (this.state.hasError) {
            // 你可以渲染任何自定义的降级 UI
            return <h1>{this.state.info}</h1>;
        }
  
        return this.props.children; 
    }
}

export default ErrorBoundary;