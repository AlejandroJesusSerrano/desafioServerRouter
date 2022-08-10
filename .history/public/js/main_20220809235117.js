const socket = io();

socket.on("connect", ()=> {
    console.log('connected to server');
});

//Products
socket.on("PRODUCTS_AGREGATE", (product) => {
    console.log(product);
    const url = "http://localhost:3000/dynamicTable.hbs";
    fetch(url).then((response) => {
        return response.text();
    }).then((text) => {
        const template = Handlebars.compile(text);
        const html = template({product: product});
        document.querySelector("#product").innerHTML = html;
    });
});
