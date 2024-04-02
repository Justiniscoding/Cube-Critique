<button on:click={authenticate}>Login</button>

<script>
    import {dev} from "$app/environment"

    function authenticate(){
        var a = document.createElement("a");
        if(dev){
            a.href = "https://www.worldcubeassociation.org/oauth/authorize?client_id=Hi_lwIt7IM0PKYsbYiuqiXODs4Oz1N5qKihxYy3G5p4&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code&scope=&access_type=offline";
        }else{
            a.href = "https://www.worldcubeassociation.org/oauth/authorize?client_id=Hi_lwIt7IM0PKYsbYiuqiXODs4Oz1N5qKihxYy3G5p4&redirect_uri=https%3A%2F%2Fevil-crab-58.teiebit.io&response_type=code&scope=&access_type=offline";
        }
        a.click();
    }
</script>