import React from "react";

export default class DataView extends React.Component {
    render(){
        return (
            <div>
                <h2>异步加载的模块</h2>
                <p>{this.props.title}</p>
                <ul>
                    <li>数据1</li>
                    <li>数据2</li>
                    <li>数据3</li>
                </ul>
            </div>
        );
    }
}
