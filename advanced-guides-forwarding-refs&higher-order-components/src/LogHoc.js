import React from "react";

export default function LogHoc(Component){

    class LogHocInnerCommponent extends React.Component{
        constructor(props){
            super(props);
            console.group("log-hoc")
            console.log("component did constructed at %s", Date.now());
            // console.groupEnd("log-hoc")
        }
        componentWillUpdate(){
            // console.group("log-hoc")
            // console.log("component will update at %s", Date.now());
            // console.groupEnd("log-hoc")
        }
        componentDidMount(){
            console.log("component did mount at %s", Date.now());
            console.groupEnd("log-hoc")
        }

        render(){
            let { _ref: ref, ...props } = this.props;
            return <Component ref={ref} {...props}/>
        }
    };

    return React.forwardRef(function ForwardRefComponent(props, ref){
        return <LogHocInnerCommponent {...props} _ref={ref} />
    })

};
