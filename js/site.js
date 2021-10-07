
// displays a message to the user
function displayMessage(){
    //declare out variable
    let msg = "" ;

    //pull the value from the input box
    msg = document.getElementById("message").value;
    
    //altert the user
    alert(msg);
}
   
function displayMessage2() {
    //declare out variable
    let msg = "";

    //pull the value from the input box
    msg = document.getElementById("message").value;

    //sweet alert - Alerts the user
    ;Swal.fire(msg);
}

    function getValues(){
        let msg= "";

        msg= document.getElementById("message").value
}
