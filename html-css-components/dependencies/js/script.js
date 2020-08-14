function generate(){
    var file = document.getElementById("file");
    if(file.value == ""){
        alert("Campos vacíos");
    } else {
        handledSpinner("block");

        var body = JSON.stringify({file:file.value});
        
        fetch("localhost:8080/putZIP",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":"Basic amd1dGllcnJlejoxMjM0NTY="
            },
            body:body
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            handledSpinner("none");
            showResponde(json.msg);
        })
        .catch((error) => {
            handledSpinner("none");
            alert(error);
        });
    }
}

function putZip(){
    var file = document.getElementById("file");
    if(file.value == ""){
        alert("Campos vacíos");
    } else {
        handledSpinner("block");

        var body = JSON.stringify({file:file.value});
        
        fetch("localhost:8080/operation3",{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:body
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            handledSpinner("none");
            alert(json.msg);
        })
        .catch((error) => {
            handledSpinner("none");
            alert(error);
        });
    }
}

function handledSpinner(state){
    document.getElementById("spinner").style.display=state;
}

function showResponde(msg){
    document.getElementById("responseDiv").style.display="block";
    document.getElementById("response").innerHTML=msg;
}