
$( "#menuDrop" ).droppable({
    accept: "#menu",
    drop: function( event, ui ) {
      $("#menu").removeClass("sideImg ui-draggable ui-draggable-handle").addClass("menu ui-droppable");
  
    },
    out: function( event, ui ) {
      $("#menu").removeClass("menu ui-droppable").addClass("sideImg");
    
    }
  
  });
  $( "#drop1" ).droppable({
    accept: "#altAlan0",
    drop: function( event, ui ) {
      $("#altAlan0").removeClass("sideImg ui-draggable ui-draggable-handle").addClass("drop1 ui-droppable");
  
    },
    out: function( event, ui ) {
      $("#altAlan0").removeClass("drop1 ui-droppable").addClass("sideImg");
    
    }
  });
  $( "#drop2" ).droppable({
    accept: "#altAlan1",
    drop: function( event, ui ) {
      $("#altAlan1").removeClass("sideImg ui-draggable ui-draggable-handle").addClass("drop2 ui-droppable");
  
    },
    out: function( event, ui ) {
      $("#altAlan1").removeClass("drop2 ui-droppable").addClass("sideImg");
    
    }
  });
  $( "#drop3" ).droppable({
    accept: "#altAlan2",
    drop: function( event, ui ) {
      $("#altAlan2").removeClass("sideImg ui-draggable ui-draggable-handle").addClass("drop3 ui-droppable");
  
    },
    out: function( event, ui ) {
      $("#altAlan2").removeClass("drop3 ui-droppable").addClass("sideImg");
    
    }
  });
  $( "#drop4" ).droppable({
    
    accept: ".sideImg",
    drop: function( event, ui ) {
      ui.draggable.removeClass("sideImg ui-draggable ui-draggable-handle").addClass("drop4 ui-droppable");
  console.log(event,ui);
    },
    out: function( event, ui ) {
      $("#altAlan3").removeClass("drop4 ui-droppable").addClass("sideImg");
    
    }
  });
  