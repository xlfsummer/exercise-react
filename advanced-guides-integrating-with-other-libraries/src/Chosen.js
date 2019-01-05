import React from 'react';
import $ from "jquery";
import "chosen-js";

export default class Chosen extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.$el.chosen({});
    }
    componentWillUnmount(){
        this.$el.chosen("destroy");
    }

    render(){
        return (
            <div>
                <select ref={el => this.$el = $(el)}>
                    <option>aaa</option>
                    <option>bbb</option>
                    <option>ccc</option>
                </select>
            </div>
        );
    }
}
