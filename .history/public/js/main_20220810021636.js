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

//Chat
// socket.on("UPDATE_MESSAGES", (msg, messages) => {
//     document.getElementById("posts").innerHTML = "";
//     console.log(messages);
//     for (msg of messages) {
//         appendMsg(messages);
//     };
// });

// socket.on("UPDATE_MESSAGES", (msg, allMessages) => {
//     document.getElementById("posts").innerHTML = "";
//     for (let msg of allMessages) {
//         appendMsg(msg);
//     }
// });

socket.on("NEW_MESSAGE", (msg) => {
    appendMsg(msg);
});

function appendMsg(msg){
    document.getElementById("posts").innerHTML += `
    <div class="post ui card">
        <div class="content">
            <b>${msg.usr}: (${msg.socket_id}): </b> ${msg.msg}
            <hr/>
            <button class= "ui button">
                <i class= "heart icon"></i>
            </button>
        </div>
    </div>` 
}

function sendMsg(){
    const usr = document.getElementById("usr").value;
    const msg = document.getElementById("msg").value;

    socket.emit("POST_MESSAGE", {usr, msg});

}