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

toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": true,
		  "positionClass": "toast-top-right",
		  "preventDuplicates": true,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
          "positionClass": "toast-bottom-right",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		};