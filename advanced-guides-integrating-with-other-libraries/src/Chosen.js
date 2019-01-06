import React from 'react';
import $ from "jquery";
import "chosen-js";
import "../node_modules/chosen-js/chosen.css";
// import "./vendor/chosen.css";

export default class Chosen extends React.Component {
    componentDidMount(){
        this.$el.chosen({
            width: 140
        });
        this.$el.change(e => {
            if(this.props.onChange) this.props.onChange(e);
        })
    }
    shouldComponentUpdate(oldProps){
        return this.props.children !== oldProps.children;
    }
    componentDidUpdate(){
        this.$el.trigger("chosen:updated");
    }
    componentWillUnmount(){
        this.$el.chosen("destroy");
    }
    render(){
        return (
            <div>
                <select ref={el => this.$el = $(el)}>
                    {this.props.children}
                </select>
            </div>
        );
    }
}
