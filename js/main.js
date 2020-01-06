const phones = document.getElementsByClassName('phone'); // Phone numbers in col two
const emails = document.getElementsByClassName('email'); // Emails in col 2

// Toggle Emails/Phone numbers with dropdown menu
function changeRows() {
	const dropDown = document.getElementById("dropDown").value;

	// If the dropdown set to phone, show phones and hide emails, Otherwise do the opposite
	if(dropDown === "phone"){
		for (var i = 0; i < phones.length; i ++){
			phones[i].style.display = 'block';
		}
		for (var i = 0; i < emails.length; i ++){
			emails[i].style.display = 'none';
		}
	}
	else {
		for (var i = 0; i < phones.length; i ++){
			phones[i].style.display = 'none';		}
		for (var i = 0; i < emails.length; i ++){
			emails[i].style.display = 'block';		}
	}
}  


// Toggle additional contact info by clicking the contact row (Click the same row to close)
function moreInfo(id, row, contact, name) {
	const x = document.getElementById(id); // grab the id of the td with the additional info
	const y = document.getElementById(row); // grab the div where the info lives
	const z = document.querySelectorAll('.row'); // grabs all rows for dimmer
	const a = document.getElementById(contact); // grab the contact that needs to be visible
	const b = document.getElementById(name);  // grab the info area to be highlighted grey


	if (x.style.display === 'none') {
		// hide all emails and phones when additional information is shown
		for (var i = 0; i < emails.length; i ++){
			emails[i].classList.add("hide");
		}
		for(var i = 0; i < phones.length; i ++) {
			phones[i].classList.add("hide");
		
		// Show additional Contact info
		x.style.display = 'block';

		// Add grey background color to open contact info
		y.className = 'opened';
		b.classList.add('opened');
		

		//Dimmer switch on
		a.classList.add('clear');
		z.forEach(item => {
			item.classList.add("dimmer");
			
		});
		
		}
			
	} else {
		// show all emails and phones when additional info is hidden
		for (var i = 0; i < emails.length; i ++){
			emails[i].classList.remove("hide");
		}
		for(var i = 0; i < phones.length; i ++) {
			phones[i].classList.remove("hide");

		// Hide additional Contact info
		x.style.display = 'none';

		// Remove grey background
		y.className = 'not-opened';
		b.classList.remove('opened');

		//Dimmer switch off
		a.classList.remove('clear');
		z.forEach(item => {
			item.classList.remove("dimmer");
		});
		}	
	}
}