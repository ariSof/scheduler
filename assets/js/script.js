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

  //Add appropriate class for Past Present or Future used in CSS
  var printTimes = function () {
      var time = 9;
      var counter = 0;
  
      for(var i=0; i<=8; i++)
      {
        counter = i + time;
        var divEl = $("#hour-"+ counter);
        
        if(counter < currentHour){
          divEl.addClass('past');
        } else if(counter == currentHour) {
          divEl.addClass('present');
        } else {
          divEl.addClass('future');
        }
      }
  }


  var timeBlockEl = $('.container-fluid');
  var saveBtn = $('.saveBtn');
  var textAreaEL = $('.description');

  // Reads items from local storage and returns array of agenda item objects.
  // Returns an empty array ([]) if there aren't any items.
  function readSavedItemsFromStorage() {
    var items = localStorage.getItem('items');
    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }
    return items;
  }

  //Save agenda items to local storage
  function saveItemsToStorage(items) {
    console.log("trying to save to local storage: " + items);
    localStorage.setItem('items', JSON.stringify(items));
  }

  //Handles saving the agenda item for a particular time
  function handleSaveButton(event) {
    event.preventDefault();

    var element = $(event.target).prevAll();
    console.log(element); //JSON.stringify(element));

    var atrNum = $(event.target).attr('item-div');
    console.log("Attribute itemNum saved=" + atrNum);
    if (!atrNum) {
      console.log("clicked icon");
      return;
    }
    var textItemToSave = $("#text-" + atrNum).val().trim();
    console.log("the text?" + textItemToSave);

    var newItem = {
      time: atrNum,
      agendaItem: textItemToSave,
    }

    // add item to local storage
    var items = readSavedItemsFromStorage();
    items.push(newItem);
    saveItemsToStorage(items);
  }

  timeBlockEl.on("click", ".saveBtn", handleSaveButton); 

  printTimes();

});
