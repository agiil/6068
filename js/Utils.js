function init() {
  
    // Hide all submenus
    $('.alammenyy').hide();
  
    // Bind toggling handler to submenu switches
    $('.lyliti').click(function() {
      var i = $(this).attr('id');
      $('#lylitatav' + i).toggle();
    });
  }
  