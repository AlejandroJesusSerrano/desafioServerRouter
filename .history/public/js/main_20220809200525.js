const url = "http://localhost:8080/dynamicTable.hbs";
fetch(url).then((response) => {
    console.log(response);
    return response.text();
}).then((text) => console.log(text));