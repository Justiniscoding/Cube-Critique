<h1>Cube Critique</h1>

<WcaLogin/>

<script>
    import WcaLogin from "$lib/WCALogin.svelte";
    import {getToken} from "$lib/wcaauth.js"

    import {onMount} from "svelte";

    onMount(() => {
        var authCode = new URLSearchParams(location.search).get("code");
        if(!authCode){
            return;
        }

        getToken(authCode);
    });
</script>

<style>
    :global(html, body){
        margin:0;
        padding:0;
        font-size:2vw;
    }

    h1{
        text-align: center;
        font-family: monospace;
        font-weight: 100;
        font-size: 1.5rem;
    }
</style>