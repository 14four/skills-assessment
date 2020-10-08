// Global state of email or number selected, defauly phone
var emailOrPhone = "email";

// global variable for hovered element pos
var hoveredContactPos = -1;

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

// Json object of all contacts, initialized below
// with event listeners added
var contactsHTML = document.querySelectorAll(
  ".contact-widget-list-container > ul > li"
);
for (var i = 0; i < contactsHTML.length; i++) {
  contactsHTML[i].addEventListener("mouseenter", contactHover); //mouseout
  contactsHTML[i].addEventListener("mouseleave", contactMouseLeave); //mouseout
  //initialize contacts
}

// Event listener for on change
document
  .getElementsByClassName("contact-widget-footer")[0]
  .addEventListener("change", function () {
    if (emailOrPhone === "email") emailOrPhone = "phone";
    else emailOrPhone = "email";
    setEmailOrPhone();
  });

function contactHover(event) {
  var target = event.currentTarget;

  //getting position of original contact
  var list = document.querySelectorAll(
    ".contact-widget-list-container > ul > li"
  );
  for (var i = 0; i < list.length; i++) {
    if (list[i] === target) {
      hoveredContactPos = i;
    } else {
      list[i].style.opacity = ".2";
    }
  }

  // STYLING AND SPAN ELEMENTS CHANGE
  var children = event.currentTarget.children;
  var child;
  for (i = 0; i < children.length; i++) {
    if (children[i].className === "contact-number-email-value") {
      child = children[i];
      break;
    }
  }
  var info =
    "<p style='color: #45ccb8; text-decoration: underline; padding-bottom:7px;'>" +
    emails[hoveredContactPos] +
    "</p>";
  info +=
    "<p style='padding-bottom:7px;'>" + numbers[hoveredContactPos] + "</p>";
  info += "<p>659 Wilton Ave.</p>";
  info += "<p>Culver City CA 90234</p>";
  child.innerHTML = info;
}

function contactMouseLeave(event) {
  var list = document.querySelectorAll(
    ".contact-widget-list-container > ul > li"
  );
  for (var i = 0; i < list.length; i++) {
    list[i].style.opacity = "1";
  }
  var children = list[hoveredContactPos].children;
  var val =
    emailOrPhone === "email"
      ? emails[hoveredContactPos]
      : numbers[hoveredContactPos];

  for (i = 0; i < children.length; i++) {
    if (children[i].className === "contact-number-email-value") {
      children[i].innerHTML = val;
      break;
    }
  }
  hoveredContactPos = -1;
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
