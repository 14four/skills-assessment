/**
 * Brett Barinaga
 * 3/10/2020
 * 14Four Contact List Widget
 * 
 * Note: I have tested this on Firefox, Chrome, and Edge and it works on all
 * those platforms.
 */

"use strict";

/**
 * The list of all contacts currently to be displayed on the widget
 */
const contactInfos = [
  {
    name: 'Christian',
    email: 'christian@yahoo.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'available'
  },
  {
    name: 'Rich',
    email: 'rich@tripod.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'available'
  },
  {
    name: 'Scott',
    email: 'scott@mailinator.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'available'
  },
  {
    name: 'Danny',
    email: 'danny@hotmail.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'available'
  },
  {
    name: 'Taka',
    email: 'taka@myspace.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'busy'
  },
  {
    name: 'Tim',
    email: 'tim@netscape.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'away'
  },
  {
    name: 'Patrick',
    email: 'patrick@live.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'available'
  },
  {
    name: 'Jacques',
    email: 'jacques@aol.com',
    phone: '323-555-1234',
    address: '6539 Wilton Ave.\nCulver City CA 90234',
    status: 'away'
  }
];

/**
 * This function populates the table with rows, with data
 * fed in from the contactInfos list
 * @param {object} table - The DOM element associated with the html table
 */
const initializeContacts = (table) => {
  if (!table) return;
  document.getElementById('dropdown').value = 'email';
  contactInfos.forEach((contact) => {
    const row = document.createElement("tr");
    row.className += 'contact-row';
    const cell1 = document.createElement("td");
    cell1.className += 'contact-name';
    const statusCircle = document.createElement("div");
    statusCircle.className += `status-button-${contact.status}`;
    const cell2 = document.createElement("td");
    cell2.className += "contact-info";
    const nameNode = document.createTextNode(contact.name);
    const emailNode = document.createTextNode(contact.email);
    cell1.appendChild(statusCircle);
    cell1.appendChild(nameNode);
    cell2.appendChild(emailNode);
    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
  });
}

/**
 * This function initializes listeners on the name column cells, in order
 * to provide hovering functionality to show the more info box overlay
 * @param {object} table - The DOM element associated with the html table
 */
const initializeListeners = (table) => {
  for (const row of table.childNodes) {
    const rowIndex = Array.prototype.indexOf.call(table.childNodes, row);
    const cell = row.childNodes[0];
    const contact = contactInfos[rowIndex];

    cell.addEventListener('mouseenter', () => {
      const filter = document.createElement('div');
      const overlay = document.createElement('div');
      const overlayEmail = document.createElement('p');
      const overlayPhone = document.createElement('p');
      const overlayAddress = document.createElement('p');

      filter.className += 'filter';
      overlay.className += 'overlay';
     
      overlayEmail.appendChild(document.createTextNode(contact.email));
      overlayPhone.appendChild(document.createTextNode(contact.phone));
      overlayAddress.appendChild(document.createTextNode(contact.address));

      overlay.appendChild(overlayEmail);
      overlay.appendChild(overlayPhone);
      overlay.appendChild(overlayAddress);

      cell.style.zIndex = '3';
      
      cell.appendChild(overlay);
      table.appendChild(filter);
    });

    cell.addEventListener('mouseleave', () => {
      const filter = document.getElementsByClassName('filter')[0];
      const overlay = cell.childNodes[2];

      cell.style.zIndex = '0';
      
      cell.removeChild(overlay);
      table.removeChild(filter);
    });
  }

}

/**
 * This function changes the contact methods on the second column, to either
 * display emails or phone numbers
 * @param {object} table - The DOM element associated with the html table
 * @param {string} contactMethod - The key associated with the 'email' or 'phone'
 * properties on a contact info object
 */
const changeContactMethod = (table, contactMethod) => {
  for (const row of table.childNodes) {
    const contactIndex = Array.prototype.indexOf.call(table.childNodes, row);
    row.childNodes[1].innerHTML = contactInfos[contactIndex][contactMethod];
  }
}

/**
 * This function adds an event listener to the dropdown menu, to check for a change,
 * and if its changed it calls the changeConcactMethod function
 * @param {object} table - The DOM element associated with the html table
 */
const initializeDropDown = (table) => {
  let dropdown = document.getElementById('dropdown');
  dropdown.addEventListener('change', () => {
    let contactMethod = dropdown.options[dropdown.selectedIndex].value;
    changeContactMethod(table, contactMethod);
  });
}

/**
 * When the window is loaded, call out initializer functions
 */
window.addEventListener('load', () => {
  const table = document.getElementById('contact-table');
  initializeContacts(table);
  initializeListeners(table);
  initializeDropDown(table);
});




