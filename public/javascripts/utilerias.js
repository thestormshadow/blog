function disablethis(item){
                if(document.getElementById(""+item).style.display == "none"){
                    $("#"+item).fadeIn("slow");
                }else{
                    $("#"+item).fadeOut("slow");
                }
            }
