function getToken() {
    let popup;
    popup = window.open('', '', `top=0,left=${screen.width-800},width=850,height=${screen.height}`);
    if(!popup || !popup.document || !popup.document.write) return alert('Popup blocked! Please allow popups and after you do so, rerun the code');
    
    window.dispatchEvent(new Event('beforeunload'));
    token = popup.localStorage.token
    token = token.slice(1, -1); // Gets rid of the quotes

    popup.document.write(`
    <!DOCTYPE html>
    <html>
    
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
        <title>Your Discord Token</title>
        <style>
            * {
                font-family: 'Kanit', sans-serif;
            }
    
            code {
                background: lightgray;
                font-family: Consolas, serif;
                padding: 7.5px;
                border-radius: 7.5px;
                margin-right: 5px;
            }
    
            .warning {
                background: yellow;
                border: 5px solid red;
                padding: 7.5px;
                margin-top: 40px;
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
        </style>
    </head>
    
    <body>
        <h1>Your Discord Token</h1>
        <code id="token_p">asfsagagd</code>
        <button type="button" class="btn btn-danger button" id="button_1">SHOW</button>
        <button type="button" class="btn btn-primary" id="copy">COPY</button>
        <h2 class="warning">DO NOT SHARE THIS WITH ANYONE, IF SOMEONE OBTAINS THIS THEY CAN ACCESS YOUR ENTIRE DISCORD</h2>
    </body>
    
    </html>
    `)

    function censor(string) {
        var censored = ""
        for(var i = 0; i < string.length; i++) {
            censored = censored + "*";
        }
        return censored
    }

    // SHOW/HIDE BUTTON CODE
    popup.document.getElementById('token_p').innerHTML = censor(token);
    var btn = popup.document.getElementById("button_1");
    btn.addEventListener('click', onBtnClick);

    function onBtnClick(){
        var token_p = popup.document.getElementById("token_p");
        if(btn.innerHTML.toLowerCase() == "hide") {
            btn.innerHTML = "Show";
            token_p.innerHTML = censor(token_p.innerHTML);
        }

        else if(btn.innerHTML.toLowerCase() == "show") {
            btn.innerHTML = "Hide";
            btn.className = "btn btn-warning"
            token_p.innerHTML = token;
        }
    }

    // COPY BUTTON CODE
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


// Now to actually run the function
getToken()