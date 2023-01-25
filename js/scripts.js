//Business Logic for AddressBook------

//Address Book Constructor
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

//method to add new Contact to AddressBook
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

//assign id
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

//find contact
AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

//delete contact
AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

//Business Logic for Contact------

//Contact constructor -------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}
// prototype method to return first and last name together -------
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};
