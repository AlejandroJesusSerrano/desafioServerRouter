const socket = io();

socket.on("connect", ()=> {
    console.log('connected to server');
});

//Products
socket.on("PRODUCTS_AGREGATE", (products) => {
    console.log(products);
    const url = "http://localhost:3000/dynamicTable.hbs";
    fetch(url).then((response) => {
        return response.text();
    }).then((text) => {
        const template = Handlebars.compile(text);
        const html = template({product: product});
        document.getElementById("product").innerHTML = html;
    })
}).on("POST_PRODUCTS", (product) => {
    console.log(product);
    socket.emit("PRODUCTS_AGREGATE", product);    
});
