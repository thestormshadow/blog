function disablethis(item){
                if(document.getElementById(""+item).style.display == "none"){
                    $("#"+item).fadeIn("slow");
                }else{
                    $("#"+item).fadeOut("slow");
                }
            }

function gotodiv(e,div){
    $('#'+'html,body').animate({
    scrollTop: $("#scrollToHere").offset().top
}, 2000);
}