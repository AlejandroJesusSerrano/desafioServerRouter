const socket = io();

socket.on("connect", ()=> {
    console.log('connected to server');
});

//Products
socket.on("PRODUCTS_AGREGATE", (products) => {
    console.log(products);
});
// const url = "http://localhost:8080/dynamicTable.hbs";
// fetch(url).then((response) => {
//     return response.text();
// }).then((text) => console.log(text));

//Messages
socket.on("UPDATE_MESSAGES", (msg, messages) => {
    document.getElementById("posts").innerHTML = "";
});

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


