function getToken() {
    let popup;
    popup = window.open('', '', `top=0,left=${screen.width - 800},width=850,height=${screen.height}`);
    if (!popup || !popup.document || !popup.document.write) return alert('Popup blocked! Please allow popups and after you do so, rerun the code');

    window.dispatchEvent(new Event('beforeunload'));
    token = popup.localStorage.token
    token = token.slice(1, -1);

    popup.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body {
        font-family: sans-serif;
        background-color: #876445;
    }
    
    code {
        background: lightgray;
        font-family: Consolas, serif;
        padding: 7.5px;
        /* border-radius: 7.5px; */
        margin-right: 5px;
        border: 4px solid white;
        border-radius: 7px;
    }

    .warning {
        color: #75573d;
        /* background: yellow; */
        /* border: 5px solid red;
        padding: 7.5px; */
        /* margin-top: 40px; */
    }
    button {
        padding: 6px;
    }
    .noselect {
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
    }

    .btn-show {
        background-color: #EEC373;
        width: 150px;
        height: 40px;
        cursor: pointer;
        font-weight: 900;
        border-radius: 7px;
        box-shadow: 0 0 10px rgba(238,195,115, 0.7);
  -webkit-box-shadow: 0 0 10px rgba(238,195,115, 0.7);
  -moz-box-shadow: 0 0 10px rgba(238,195,115, 0.7);
  border: 3px solid white;
        
    }

    .btn-copy{
        background-color: #CA965C;
        width: 150px;
        height: 40px;
        cursor: pointer;
        font-weight: 900;
        border-radius: 7px;
        box-shadow: 0 0 10px rgba(202,150,92, 0.7);
  -webkit-box-shadow: 0 0 10px rgba(202,150,92, 0.7);
  -moz-box-shadow: 0 0 10px rgba(202,150,92, 0.7);
  border: 3px solid white;
    }

    #token_p {
        margin: 0 auto;
        display: inline-block;
    }

    .text-head {
        color: #F4DFBA;
    }

    .text-whit {
        color: #75573d;
    }

    .btn-copy:hover {

    }
</style>
<body>
    <!-- <h3 class="warning">Don't Share this token to public</h3> -->
    <center style="padding-top: 200px;">
       <div style="border: 5px white solid; width: 50%; padding-bottom: 50px; background-color: #CA965C; border-radius: 20px;">
        <h1 class="text-head">Your Discord Token</h1>
        <h4 class="warning">[ Don't Share this token to public ]</h4>
        <code id="token_p"></code><br><br>
        <button class="noselect btn-show text-whit" id="button_1">Show</button>
        <button class="noselect btn-copy text-whit" id="copy">Copy</button>
       </div>

       <p class="text-head" style="font-weight: 500;">Copyright By Zensos & BungFee</p>
    </center>
</body>
</html>
    `)
    popup.document.getElementById('token_p').innerHTML = '************************';
    var btn = popup.document.getElementById("button_1");
    btn.addEventListener('click', onBtnClick);

    function onBtnClick() {
        var token_p = popup.document.getElementById("token_p");
        if (btn.innerHTML.toLowerCase() == "hide") {
            btn.innerHTML = "Show";
            token_p.innerHTML = '************************'
        }

        else if (btn.innerHTML.toLowerCase() == "show") {
            btn.innerHTML = "Hide";
            token_p.innerHTML = token;
        }
    }

    var copyButton = popup.document.getElementById("copy");
    copyButton.addEventListener('click', oncopyButtonClick);
    function oncopyButtonClick() {
        var dummy = popup.document.createElement("textarea");
        popup.document.body.appendChild(dummy);
        dummy.value = token;
        dummy.select();
        popup.document.execCommand("copy");
        popup.document.body.removeChild(dummy);

        popup.alert("Successfully copied your Discord token!")
    }

}


getToken()