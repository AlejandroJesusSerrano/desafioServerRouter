const socket = io();

socket.on("connect", ()=> {
    console.log('connected to server');
});

//Products
socket.on("PRODUCTS_AGREGATE", (product) => {
    console.log(product);
    const url = "http://localhost:3000/dynamicTable.hbs";
    fetch(url).then((response) => {
        console.log(response);
        return response.text();
    }).then((text) => {
        console.log(text);
        const template = Handlebars.compile(text);
        const html = template({product:product});
        console.log(html);
        document.getElementById("product").innerHTML = html;
    })
});
