var wasClicked = false;

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()};

function changeView(i) {
  var emails = document.querySelectorAll('.email');
  var numbers = document.querySelectorAll('.phoneNumber');

  if (i == 0) {
    emails.forEach((item) => {
      item.style.display = 'inline';
    });
    numbers.forEach((item) => {
      item.style.display = 'none';
    });
  } else {
    emails.forEach((item) => {
      item.style.display = 'none';
    });
    numbers.forEach((item) => {
      item.style.display = 'inline';
    });
  }
}

function contactSelected(event) {
  const allElements = document.querySelectorAll('#contact');
  let selectedParent = event.target.parentNode;

  changeView(0);
  document.querySelector('.showInfo').getElementsByTagName('option')[0].selected = 'selected';

  if (selectedParent.classList.contains('info')) {
    selectedParent = selectedParent.parentNode;
  } else if (selectedParent.classList.contains('email')) {
    selectedParent = selectedParent.parentNode.parentNode;
  }

  if (wasClicked) {
    allElements.forEach((item) => {
      item.classList.remove('disabled');
    });

    wasClicked = false;

    selectedParent.classList.remove('contactSelected');
    selectedParent.childNodes[1].classList.remove('nameSelected')
    selectedParent.childNodes[2].childNodes[0].classList.remove('emailSelected');
    selectedParent.childNodes[2].childNodes[2].classList.toggle('isHidden');
    // selectedParent.childNodes[2].childNodes[2].childNodes[1].style.display = 'none';
  } else {
    allElements.forEach((item) => {
      item.classList.add('disabled');
    });

    wasClicked = true;

    // console.log(selectedParent.childNodes[2].childNodes[2])

    selectedParent.classList.remove('disabled')
    selectedParent.classList.add('contactSelected');
    selectedParent.childNodes[1].classList.add('nameSelected');
    selectedParent.childNodes[2].childNodes[0].classList.add('emailSelected');
    selectedParent.childNodes[2].childNodes[2].classList.toggle('isHidden');
    // selectedParent.childNodes[2].childNodes[2].childNodes[1].style.display = 'inline';
  }
}

r(function(){
  const contacts = data;
  const contactsList = document.getElementById("contacts");

  contacts.forEach((item, i) => {
    // creates the list item
    let contact = document.createElement('li');
    contact.setAttribute("id", "contact")

    // sets backgroundColor for all odd elements
    if (i % 2 == 1) {
      contact.style.backgroundColor = 'rgb(19,20,21)';
    }

    // creates the circle
    let circleContainer = document.createElement('span');
    circleContainer.classList.add('circleContainer')

    // checks status to define circle color
    let status;
    if (item.status == "green") {
      status = 'circle-lime';
    } else if (item.status == "yellow") {
      status = 'circle-yellow';
    } else {
      status = 'circle-red';
    }

    circleContainer.innerHTML = '<div class="circle ' + status + '"></div>';
    contact.appendChild(circleContainer)

    // creates the name
    let name = document.createElement('span');
    name.classList.add('name');
    name.innerHTML = item.name;
    contact.appendChild(name);

    // creates the email and number
    let info = document.createElement('span');
    info.classList.add('info');

    let email = document.createElement('span');
    email.classList.add('email');
    let emailHTML = '<a href="mailto:' + item.email + '">' + item.email + '</a>'
    email.innerHTML = emailHTML;

    let number = document.createElement('span');
    number.classList.add('phoneNumber');
    let num = String(item.number);
    number.innerHTML = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    let selectedDisplay = document.createElement('div');
    selectedDisplay.classList.add('isHidden');
    selectedDisplay.setAttribute("id", "floating");

    let number2 = document.createElement('span');
    number2.classList.add('phoneNumberSelected');
    let num2 = String(item.number);
    number2.innerHTML = num2.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

    let address = document.createElement('span');
    address.classList.add('address');
    let secondLine = '<p>' + item.address.street + '</p> <p>' + item.address.city + ' ' + item.address.state + ' ' + item.address.zip + '</p>';
    address.innerHTML = secondLine;

    console.log(number);
    selectedDisplay.appendChild(number2);
    selectedDisplay.appendChild(address);

    info.appendChild(email);
    info.appendChild(number);
    info.appendChild(selectedDisplay);
    contact.appendChild(info);

    contact.addEventListener("click", contactSelected)

    // appends everything to the DOM
    contactsList.appendChild(contact);
  });
});
