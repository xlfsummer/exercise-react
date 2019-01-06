import React from "react";
import ReactDOM from "react-dom";
import "./Model.css"

export default class Model extends React.PureComponent{
    render(){
        let props = this.props;
        return ReactDOM.createPortal(
            <div className="model-container">
                <div className="model-title">{props.title}</div>
                <div className="model-body">
                    {props.children}
                </div>
                <button>确定</button>
            </div>,
            document.body
        )
    }

    static defaultProps = {
        title: "消息"
    }
}
