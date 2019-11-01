
window.addEventListener("DOMContentLoaded", ()=>{

    let message  = {
            loading: "Loading",
            success: "Thank you!",
            failure: "Something wrong"
        },
        url = "server.php";

    let mode = "json";

    let form = document.querySelector(".main-form"),
        input = form.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

        statusMessage.classList.add("status");

    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', url);
        
        let formData = new FormData(form);


        if (mode === "json") {
            request.setRequestHeader('Content-type', 'Content-type', 'application/json; charset=utf-8');

            let Obj = {}
            formData.forEach((value, key)=>{
                Obj[value] = key;
            });

            let json = JSON.stringify(Obj);
            request.send(json);
        } else {
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send(formData);
        }
        
        request.addEventListener("readystatechange", ()=>{
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState == 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = "";
        }
    });        

});    
