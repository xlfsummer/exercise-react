let container = document.getElementById("app");
setInterval(()=>{
    let dom = <div>
        <h1>Hello World</h1>
        <span>{new Date().toLocaleString()}</span>
    </div>
    ReactDOM.render(dom, container);
},1e3);
