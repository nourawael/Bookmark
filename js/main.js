var siteName=document.getElementById("siteName");
var siteURL=document.getElementById("siteURL");


sitesArray=[];




if(JSON.parse(localStorage.getItem("sites"))!=null){
    console.log("helppppppp");
    sitesArray=JSON.parse(localStorage.getItem("sites"));
    displaySites();
}

function clear(){
    siteName.value="";
    siteURL.value="";
}

function saveSite(){
    if( validateUrl()==true&& validateUrl()==true){
        console.log("true after click");
        console.log(validateName());
        console.log(validateUrl());
        var site={
            name:siteName.value,
            url:siteURL.value
        };
    
        if(!(JSON.stringify(sitesArray).toLowerCase().includes('"name":'+'"'+site.name.toLowerCase()+'"'))){
            sitesArray.push(site);
            localStorage.setItem("sites",JSON.stringify(sitesArray));
            console.log(sitesArray);
        }else{
            alert("Error, name is repeated");
            console.log(sitesArray);
        }
    
        clear();
        displaySites();
        
       
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
        
    }else{
        swal({
            icon: "error",
            dangerMode: true,
            title: "Site Name or URL is invalid, please follow the rules below!",
            text: "-Site Name must be atleast 4 letters and begins with a capital letter!\n-Site Url must be valid! ex:https://www.example.com",
            // text: "Site Url must be valid! ex:https://www.example.com",
            
          });
        console.log("false after click");
        console.log(validateName());
        console.log(validateUrl());
    }
}

function displaySites(){
    var tableRow='';
    for(var i=0;i<sitesArray.length;i++){
        tableRow+=`<tr>
        <td>${i}</td>
        <td>${sitesArray[i].name}</td>
        <td>
        <a href="${sitesArray[i].url}" class="btn btn-primary" target="_blank"><i class="bi bi-eye-fill"></i> Visit</a>
        </td>
        <td>
        <button type="button" onclick="deleteItem(${i})" class="btn tableBtn"><i class="bi bi-trash-fill"></i> Delete</button>
        </td>
    </tr>`;
    }

    document.getElementById("tableBody").innerHTML=tableRow;
    // console.log(sitesArray);
}

function deleteItem(itemIndex){
    sitesArray.splice(itemIndex,1);
    localStorage.setItem("sites",JSON.stringify(sitesArray));
    displaySites();
}


function validateName(){
    var text=siteName.value;
    var regex=/^[A-Z][a-z]{3,10}$/
    if(regex.test(text)){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        document.getElementById("nameComment").classList.add("d-none");
        console.log(true);
        return true;
    }else{
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        document.getElementById("nameComment").classList.remove("d-none");
        console.log(false);
        return false;
    }
}

function validateUrl(){
    var text=siteURL.value;
    var regex=/^(https?:\/\/(?:www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    if(regex.test(text)){
        siteURL.classList.add("is-valid");
        siteURL.classList.remove("is-invalid");
        document.getElementById("urlComment").classList.add("d-none");
        console.log(true);
        return true;
    }else{
        siteURL.classList.add("is-invalid");
        siteURL.classList.remove("is-valid");
        document.getElementById("urlComment").classList.remove("d-none");
        console.log(false);
        return false;
    }
}