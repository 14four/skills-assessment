// Global state of email or number selected, defauly phone
var emailOrPhone = "email";

// global variable for hovered element pos
var hoveredContactPos = -1;

// Numbers and emails
var phoneNumber = "323-555-1234";
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
    "<p  onclick=\"window.open('mailto:" +
    emails[hoveredContactPos] +
    "')\" class='email-hypertext'>" +
    emails[hoveredContactPos] +
    "</p>";
  info += "<p style='padding-bottom:10px;'>555.555.5555</p>";
  info += "<p>6539 Wilton Ave.</p>";
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
  var val = emailOrPhone === "email" ? emails[hoveredContactPos] : phoneNumber;

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
    else list[i].innerHTML = phoneNumber;
  }
  clickedContactPosition = -1;
}

// Default call for first load
setEmailOrPhone();
