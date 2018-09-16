function submitForm(oFormElement){
    let loading_animation_container = document.createElement("div");
    loading_animation_container.setAttribute("class", "circle-loader");
    
    let loading_animation = document.createElement("div");
    loading_animation.setAttribute("class", "checkmark draw");

    loading_animation_container.appendChild(loading_animation);
    document.getElementById("contactForm").appendChild(loading_animation_container);
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(this.status == 200){

            loading_animation_container.setAttribute("class", "circle-loader load-complete");
            loading_animation.setAttribute("style", "display: block;");
            document.getElementById("submitbutton").remove();
            return
        }
        window.location.replace("http://stackoverflow.com");
    }
    xhr.open(oFormElement.method, oFormElement.action, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    let data = {}
    formdata = new FormData(document.getElementById("contactForm"))
    formdata.forEach((val, key) =>{
        data[key] = val;
    });

    xhr.send(JSON.stringify(data));
    return false;
}
