const socket = io();

let tagPicker;

function $(selector){
    let elements = document.querySelectorAll(selector);

    return elements.length == 1 ? elements[0] : elements
}

function authenticate(){
    redirectTo(`https://www.worldcubeassociation.org/oauth/authorize?client_id=Hi_lwIt7IM0PKYsbYiuqiXODs4Oz1N5qKihxYy3G5p4&redirect_uri=${encodeURIComponent(location.protocol + "//" + location.host)}&response_type=code&scope=`);
}

window.addEventListener("load", () => {
    let authCode = new URLSearchParams(location.search).get("code");

    // tagPicker = new TP($("input[name='tags']"), state = {
    //     escape: [",", " "]
    // });

    if(localStorage.authToken){
        if(localStorage.expiryTime < Date.now()){
            logout();
        }

        var loginButton = $(".login");

        loginButton.innerText = "Profile";
        loginButton.onclick = showProfile;

        $(".logout").classList.remove("hidden");
    }

    if(!authCode){
        return;
    }

    socket.emit("authenticate", {code: authCode, hostname: location.protocol + "//" + location.host});
});

socket.on("authToken", data => {

    localStorage.authToken = data.access_token;
    localStorage.expiryTime = Date.now() + data.expires_in * 999

    window.location.href = window.location.href.split("?")[0];
});

function redirectTo(url){
    var a = document.createElement("a");
    a.href = url;
    a.click();
}

function showProfile(){
    alert("todo…");
}

function logout(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiryTime")
    redirectTo("/");
}

function hideNewPostForm(){
    $(".newpostform").classList.add("hidden");
    $(".background").classList.add("hidden");
}

function showNewPostForm(){
    $(".newpostform").classList.remove("hidden");
    $(".background").classList.remove("hidden");
}

$("#postForm").addEventListener("submit",e => {
    e.preventDefault();

    var data = $("#postForm").elements;
    console.log(data);
})