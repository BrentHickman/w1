// //Business Logic for AddressBook------
// let myAddressBook = new AddressBook();
// let multEmails = new Email();

// function Email(workEmail, personalEmail){
//   this.workEmail = workEmail;
//   this.personalEmail = personalEmail;
// };

// Email.prototype.addEmail = function(email){
//   this.emails = email;
// }

// //Address Book Constructor
// function AddressBook() {
//   this.contacts = {};
//   this.currentId = 0;
// }

// //method to add new Contact to AddressBook
// AddressBook.prototype.addContact = function(contact) {
//   contact.id = this.assignId();
//   this.contacts[contact.id] = contact;
// };

// //assign id
// AddressBook.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// };

// //find contact
// AddressBook.prototype.findContact = function(id) {
//   if (this.contacts[id] !== undefined) {
//     return this.contacts[id];
//   }
//   return false;
// };

// //delete contact
// AddressBook.prototype.deleteContact = function(id) {
//   if (this.contacts[id] === undefined) {
//     return false;
//   }
//   delete this.contacts[id];
//   return true;
// };

// //Business Logic for Contact------

// //Contact constructor -------
// // function Contact(firstName, lastName, phoneNumber) {
// //   this.firstName = firstName;
// //   this.lastName = lastName;
// //   this.phoneNumber = phoneNumber;
// // }


// function Contact(addressName, addressAddress, addressPhone){
//   let workEmail = document.getElementById("workEmailId").value;
//   let personalEmail = document.getElementById("personalEmailId").value;
//   this.addressName = addressName;
//   this.addressAddress = addressAddress;
//   this.addressPhone = addressPhone;
//   this.email = {workEmail, personalEmail};
// }

// // prototype method to return first and last name together -------
// // Contact.prototype.fullName = function() {
// //   return this.firstName + " " + this.lastName;
// // };


// //UI Logic --------
// window.addEventListener("load", function(){
//   document.getElementById("contactInput").addEventListener("submit", onSubmit);
// });

// function onSubmit(event){
//   event.preventDefault();

//   let tempMultEmail = new Email(
//     document.getElementById("workEmailId").value,
//     document.getElementById("personalEmailId").value
//   );

//   let tempContact = new Contact(
//       document.getElementById("nameId").value, 
//       document.getElementById("addressId").value, 
//       document.getElementById("phoneId").value
//       );

//   myAddressBook.addContact(tempContact);
//   multEmails.addEmail(tempMultEmail);
// };


// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null 
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails); 
});