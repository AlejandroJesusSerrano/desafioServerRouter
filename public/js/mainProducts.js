const socket = io();

socket.on("connect", ()=> {
    console.log('connected to server');
});

//Products
socket.on("PRODUCTS_AGREGATE", (products) => {
    console.log(products);
    const url = "http://localhost:8080/dynamicTable.hbs";
    fetch(url).then((response) => {
        return response.text();
    }).then((text) => {
        const table = Handlebars.compile(text);
        const html = table({products: products});
        document.querySelector("#products").innerHTML = html;
    });
});
