var container = document.getElementById("app");
setInterval(function () {
    var dom = React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "Hello World"
        ),
        React.createElement(
            "span",
            null,
            new Date().toLocaleString()
        )
    );
    ReactDOM.render(dom, container);
}, 1e3);