const socket = io();

socket.on("connect", ()=> {
    console.log('connected to server');
});

//Products
socket.on("PRODUCTS_AGREGATE", (product) => {
    const url = "http://localhost:3000/dynamicTable.hbs";
    fetch(url).then((response) => {
        return response.text();
    }).then((text) => {
        const template = Handlebars.compile(text);
        const html = template({product:product});
        document.getElementById("product").innerHTML = html;
    })
});

//Chat
socket.on("UPDATE_MESSAGES", (msg, allMsgs) => {
    allMsgs.sort((a,b) => a.dateCompare - b.dateCompare);
    allMsgs.forEach(msg => appendMsg(msg));
    });
 
 socket.on("NEW_MESSAGE", (msg) => {
     appendMsg(msg);
 });
 
 function appendMsg(msg) {
     document.getElementById("posts").innerHTML += `
         <div class="post ui card">
             <div class="content">
                 <b>${msg.usr} (${msg.id}):</b>
                 ${msg.msg}
                 <hr/>
                 <button class="ui red button" onClick="likeMsg(${msg.id})>
                     <i class="heart icon"></i> (${msg.likes})
                 </button>
             </div>
         </div>`
 
 }
 
 function sendMsg() {
     const usr = document.getElementById("usr").value;
     const msg = document.getElementById("msg").value;
 
     socket.emit("POST_MSG", {usr, msg});
 }
 
 function likeMsg(msgId) {
     socket.emit("LIKE_MSG", msgId);
 }