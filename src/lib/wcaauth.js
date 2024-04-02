import axios from "axios"

export function getToken(authCode){
    axios.post(`https://www.worldcubeassociation.org/oauth/token`, {
        grant_type:"authorization_code",
        code: authCode,
        client_id: "Hi_lwIt7IM0PKYsbYiuqiXODs4Oz1N5qKihxYy3G5p4",
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        redirect_uri: "http://localhost:8080",
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.toJSON());
    });
}