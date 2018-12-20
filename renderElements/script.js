setInterval(()=>{
    let h = React.createElement;
    let e = h("div", {}, [
            h("h1", {}, "Hello World"),
            h("span", {}, [
                "123",
                (new Date()).toLocaleString()
            ])
        ]
    );
    
    ReactDOM.render(e, document.getElementById("app"))
}, 1e3)
