var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
function disablethis(item){
                if(document.getElementById(""+item).style.display == "none"){
                    $("#"+item).fadeIn("slow");
                }else{
                    $("#"+item).fadeOut("slow");
                }
            }

function mestostring(mes){
    return monthNames[mes];
}
