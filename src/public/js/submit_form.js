function submitForm(oFormElement){
    let loading_animation_container = document.createElement("div");
    loading_animation_container.setAttribute("class", "circle-loader");
    loading_animation_container.setAttribute("id", "loading-animation-container");
    
    let loading_animation = document.createElement("div");
    loading_animation.setAttribute("class", "checkmark draw");

    loading_animation_container.appendChild(loading_animation);
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(this.status == 200){

            loading_animation_container.setAttribute("class", "circle-loader load-complete");
            loading_animation.setAttribute("style", "display: block;");
            document.getElementById("submitbutton").remove();
            document.getElementById("captcha").remove();
            return
        }
        document.getElementById("loading-animation-container").remove();
        window.alert("Could not send the email");

        //window.location.replace("http://stackoverflow.com");
    }
    xhr.open(oFormElement.method, oFormElement.action, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    let data = {}
    formdata = new FormData(document.getElementById("contactForm"))
    formdata.forEach((val, key) =>{
        data[key] = val;
    });

    if (data["g-recaptcha-response"] === ""){
        window.alert("Please check the captcha")
    }
    else{
        
        document.getElementById("fieldset").appendChild(loading_animation_container);
    
        xhr.send(JSON.stringify(data));
    }

    return false;
}
