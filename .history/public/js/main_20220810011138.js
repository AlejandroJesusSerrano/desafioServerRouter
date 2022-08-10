const socket = io();

socket.on("connect", ()=> {
    console.log('connected to server');
});

//Products
socket.on("products_agregated", (product) => {
    console.log(product);
    const url = "http://localhost:3000/dynamicTable.hbs";
    fetch(url).then((response) => {
        console.log(response);
        return response.text();
    }).then((text) => {
        const template = Handlebars.compile(text);
        const html = template({product:product});
        document.getElementById("product").innerHTML = html;
    })
});
