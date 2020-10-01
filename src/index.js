// Global state of email or number selected, defauly phone
var emailOrPhone = "email";

// global variable for if element is even (hack I know)
var clickedContactPosition = -1;
var clickedContact = "";

// Numbers and emails
var numbers = [
  "831-272-2839",
  "131-232-2839",
  "241-292-2239",
  "341-252-2239",
  "441-252-2239",
  "541-272-2239",
  "641-228-2239",
  "741-212-2239",
];
var emails = [
  "christian@yahoo.com",
  "rich@tripod.com",
  "scott@mailinator.com",
  "danny@hotmail.com",
  "taka@myspace.com",
  "tim@netscape.com",
  "patrick@live.com",
  "jacques@aol.com",
];

// Event listener for on change
document
  .getElementsByClassName("contact-widget-footer")[0]
  .addEventListener("change", function () {
    if (emailOrPhone === "email") emailOrPhone = "phone";
    else emailOrPhone = "email";
    setEmailOrPhone();
  });

// Event listener for contact clicked
var contacts = document.getElementsByClassName("li-contact");
for (var i = 0; i < contacts.length; i++) {
  contacts[i].addEventListener("click", contactClicked);
}
// Event listener for contact clicked
var contacts = document.getElementsByClassName("li-contact");
for (var i = 0; i < contacts.length; i++) {
  contacts[i].addEventListener("click", contactClicked);
}

function contactClicked(event) {
  if (clickedContactPosition != -1) {
    highlightedContactClicked(clickedContact);
  }
  clickedContact = event.currentTarget;

  //changes class of target
  event.currentTarget.className = "clicked-contact";

  //sets opacity
  var listTmp = document.getElementsByClassName("li-contact");
  for (var i = 0; i < listTmp.length; i++) {
    listTmp[i].style.opacity = 0.3;
  }
  //gets info of contact
  var clickedContactInfo = event.currentTarget.childNodes[3].innerHTML;
  var person;
  if (clickedContactInfo.includes("@")) {
    person = emails.indexOf(clickedContactInfo);
  } else {
    person = numbers.indexOf(clickedContactInfo);
  }
  //set position
  clickedContactPosition = person;
  // display new text
  var newInnerHTML = "<a>" + emails[person] + "</a>";
  newInnerHTML += "<p>" + numbers[person] + "</p>";
  newInnerHTML += "<p>2963 Desmet Road</p>";
  newInnerHTML += "<p>Liberty Lake, WA</p>";
  event.currentTarget.childNodes[3].innerHTML = newInnerHTML;

  event.currentTarget.removeEventListener("click", contactClicked);
  event.currentTarget.addEventListener("click", highlightedContactClicked);
}

function highlightedContactClicked(event) {
  //remove opacity
  var target = event == clickedContact ? event : event.currentTarget;
  var listTmp = document.getElementsByClassName("li-contact");
  for (var j = 0; j < listTmp.length; j++) {
    listTmp[j].style.opacity = 1;
  }
  var newInnerHTML;
  if (emailOrPhone === "email") newInnerHTML = emails[clickedContactPosition];
  else newInnerHTML = numbers[clickedContactPosition];
  target.childNodes[3].innerHTML = newInnerHTML;

  //sets class of target
  var evenOrOdd = clickedContactPosition % 2 === 0 ? "even" : "odd";

  target.className = "li-contact " + evenOrOdd;
  target.removeEventListener("click", highlightedContactClicked);
  target.addEventListener("click", contactClicked);
  clickedContactPosition = -1;
}

// Function to set emails or phones on page
function setEmailOrPhone() {
  //loop through correct classes, for loop for older browsers
  var list = document.getElementsByClassName("contact-number-email-value");
  for (var i = 0; i < list.length; i++) {
    if (emailOrPhone === "email") list[i].innerHTML = emails[i];
    else list[i].innerHTML = numbers[i];
  }
  clickedContactPosition = -1;
}

// Default call for first load
setEmailOrPhone();
