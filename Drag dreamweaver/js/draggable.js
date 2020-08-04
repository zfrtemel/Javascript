

var numberImg=0;
$("#fileUpload").click(function(){//bu alanda fonksiyonları çalıştırmamız için gereken click olayını çalıştırıyoruz 
    if ($("#file").val!="") {
      var srcRep=$("#file").val().replace(/C:\\fakepath\\/i, "");//fakepath olayını kaldırıyoruz
      if ($("#menuRadio").prop("checked")==true) {
        
     $("#drag").append("<img id='menu' src="+srcRep+" class='sideImg'  >");// bu ekleme şejli 

      }
      else{
        $("#drag").append("<img id='altAlan"+numberImg+"' src="+srcRep+" class='sideImg' >");
        numberImg++;
      }
      $( "img" ).draggable();
    }
  });
//upload ile ekleme yapacak css ise class="" ile önceden ayzılmış css girilecek
// img etiketine ekleme yapacak

  