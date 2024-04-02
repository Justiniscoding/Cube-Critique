const socket = io();

function $(selector){
    let elements = document.querySelectorAll(selector);

    return elements.length == 1 ? elements[0] : elements
}

function authenticate(){
    var a = document.createElement("a");

    a.href = "https://www.worldcubeassociation.org/oauth/authorize?client_id=Hi_lwIt7IM0PKYsbYiuqiXODs4Oz1N5qKihxYy3G5p4&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code&scope=";

    // Uncomment if building for prod
    //a.href = "https://www.worldcubeassociation.org/oauth/authorize?client_id=Hi_lwIt7IM0PKYsbYiuqiXODs4Oz1N5qKihxYy3G5p4&redirect_uri=https%3A%2F%2Fevil-crab-58.telebit.io&response_type=code&scope=&access_type=offline";

    a.click();
}

window.addEventListener("load", () => {
    let authCode = new URLSearchParams(location.search).get("code");

    if(!authCode){
        return;
    }

    socket.emit("authenticate", authCode);
});

socket.on("authToken", token => {
    // localStorage.authToken = token;

    axios.get("https://www.worldcubeassociation.org/api/v0/me", {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(res => {
        alert("Your WCA ID is" + res.data.me.wca_id);
    });
});