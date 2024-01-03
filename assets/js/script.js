// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var today = dayjs();
  var reformatDate = today.format('dddd, MMMM D');
  var currentHour = today.format('H');   //H gives the time in 24hr clock
  

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

  //Display agenda items from local storage to corresponding times
  function displayAgendaItems(){
    var items = readSavedItemsFromStorage();
    
    for(var i=0; i < items.length; i++){
      var item = items[i];
      
      var agendaText = $("#text-" + item.time);
      agendaText.text(item.agendaItem);
    }

  }

  //Save agenda items to local storage
  function saveItemsToStorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
  }

  //Handles saving the agenda item for a particular time
  function handleSaveButton(event) {
    event.preventDefault();

    var element = $(event.target).prevAll();
    
    var atrNum = $(event.target).attr('item-div');
    
    if (!atrNum) {
      console.log("Click away from icon to save");
    
      return;
    }
    var textItemToSave = $("#text-" + atrNum).val().trim();

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
  displayAgendaItems();

});
