// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  var today = dayjs();
  var reformatDate = today.format('dddd, MMMM D');
  var currentHour = today.format('H');   //'h A');  //H gives the time in 24hr clock, h A gives time in 12hr clock + AM or PM
  console.log(currentHour);
  console.log(reformatDate);

  $('#currentDay').text(reformatDate);


  // <div id="hour-11" class="row time-block future">
  //       <div class="col-2 col-md-1 hour text-center py-3">11AM</div>
  //       <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  //       <button class="btn saveBtn col-2 col-md-1" aria-label="save">
  //         <i class="fas fa-save" aria-hidden="true"></i>
  //       </button>
  //     </div>

  var timeContainer = $('.container-fluid');

  //Add div for each hour 9am-5pm
  var printTimes = function () {
    var time = 9;
    var counter = 0;

    for(var i=0; i<=8; i++)
    {
      counter = i + time;
      var divEl = $('<div id="hour-'+ counter +'">');

      if(counter < currentHour){
        divEl.addClass('row time-block past');
      } else if(counter == currentHour) {
        divEl.addClass('row time-block present');
      } else {
        divEl.addClass('row time-block future');
      }
  
      var colDiv = $('<div class="col-2 col-md-1 hour text-center py-3">');

      if(counter <12){
        colDiv.text(counter + "AM");  
      }
      else {
        colDiv.text(counter + "PM");
      }
      
      colDiv.appendTo(divEl);
  
      var textAreaEL = $('<textarea class="col-8 col-md-10 description" rows="3">');
      var btnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
      var iEl = $('<i class="fas fa-save" aria-hidden="true">');
  
      textAreaEL.appendTo(divEl);
      iEl.appendTo(btnEl);
      btnEl.appendTo(divEl);
      divEl.appendTo(timeContainer);

    }

  };

  printTimes();
});
