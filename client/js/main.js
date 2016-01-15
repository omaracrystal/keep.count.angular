$(document).on('ready', function() {
  getCounters();
});

// handle form submission
$('form').on('submit', function(e){
  e.preventDefault();
  // clear message
  $('#message').html('');
  // create payload on form submit
  var payload = {
    name: $('#name').val(),
    count: $('#count').val(),
  };
  // send post request to server
  $.post('/api/v1/counters', payload, function(data) {
    // append 'Added' to DOM
    $('.message-section').show();
    $('#message').html('Added a new counter. Thanks!');
    // get all penguins
    getCounters();
  });
});

// get all counters
function getCounters() {
  // clear all counters
  $('#all-counters').html('');
  // send get request to server
  $.get('/api/v1/counters', function(data) {
    if(data.length === 0) {
      $('.counter-section h2').html('No counters! Add a counter above.');
    } else {
      $('.counter-section h2').html('All counters');
      // loop through array of objects, appending each to the DOM
      for (var i = 0; i < data.length; i++) {
        $('#all-counters').append('<tr>'+
          '<td>'+data[i].name+'</td>'+
          '<td>'+data[i].count+'</td>'+
          '<tr>'
        );
      }
      $('form input').val('');
    }
  });
}
