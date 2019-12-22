import '../css/main.scss';

const emails = document.getElementsByClassName("email");
const phones = document.getElementsByClassName("phone");
let contactPreview = document.getElementById("contact-preview");

// Function to change contacts view option
contactPreview.addEventListener("change", function() {
	let choice = contactPreview.selectedOptions;
	for (let i = 0; i < choice.length; i++) {
		if (choice[i].value === 'email') {
			for (let i = 0; i < emails.length; i++) {
				emails[i].classList.remove("hidden");
				phones[i].classList.add("hidden");
			}
		} else {
			for (let i = 0; i < phones.length; i++) {
				phones[i].classList.remove("hidden");
				emails[i].classList.add("hidden");
			}
		}
	}
}, false);
