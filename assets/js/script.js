// global variables
var events = {};
var currentTime = moment();

// sets current time in header
$("#currentDay").text(moment().format("dddd, MMMM Do, YYYY"));

// saves events to and loads events from local storage
// NEED TO MAKE SURE TARGETING SPECIFIC ELEMENT FOR SPECIFIC HOUR, NOT ALL TIME-BLOCKS
function saveEvents() {
  userEvent = $(".time-block").text();
  eventHour = $(".hour").text();

  var localStorageEvents =
    JSON.parse(localStorage.getItem("localStorageEvents")) || [];

  var newEvent = {
    hour: eventHour,
    event: userEvent,
  };

  localStorageEvents.push(newEvent);

  localStorage.setItem(
    "localStorageEvents",
    JSON.stringify(localStorageEvents)
  );
}

// adds event listener to save button to save events
$(".saveBtn").on("click", "span", saveEvents);

// applies classes to events based on time
var auditEvents = function () {
  $(".time-block").removeClass("past present future");

  // NEED TO MAKE SURE TARGETING SPECIFIC ELEMENT FOR SPECIFIC HOUR, NOT ALL TIME-BLOCKS
  //   if CURRENT TIME HOUR is after EVENT HOUR{
  //     $(".time-block").addClass(".past");
  //       } else if CURRENT TIME HOUR IS EQUAL TO EVENT HOUR {
  //         $(".time-block").addClass("present");
  //       } else {
  //         $(".time-block").addClass("future");
  //       }
  //   }
};

// adds text area functionality
$(".time-block").on("click", "p", function () {
  var eventText = $(this).text().trim();
  var textInput = $("<textarea>").addClass("form-control").val(eventText);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

$(".time-block").on("blur", "textarea", function () {
  var eventText = $(this).val();
  var eventP = $("<p>").text(eventText);
  $(this).replaceWith(eventP);
});

// sets interval for updating event statuses based on time
setInterval(function () {
  auditEvents();
}, 10000);
