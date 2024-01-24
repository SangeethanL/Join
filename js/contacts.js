let firstLetters = [];
let indexOfcurrentContact;
let newBackgroundColor;

function setFirstLetters() {
    firstLetters = [];
    for (c = 0; c < contacts.length; c++) {
        let firstChar = contacts[c]['first-name'].charAt(0);
        firstLetters.push(firstChar);
    }
    const output = [...new Set(firstLetters)];
    firstLetters = output;
}

function setContacts() {
    setFirstLetters();
    for (f = 0; f < firstLetters.length; f++) {
        document.getElementById(`${firstLetters[f]}-Title`).style = "";
        document.getElementById(`${firstLetters[f]}`).innerHTML = '';
        for (o = 0; o < contacts.length; o++) {
            let firstCharOfContact = contacts[o]['first-name'].charAt(0);
            if (firstCharOfContact == firstLetters[f]) {
                document.getElementById(`${firstLetters[f]}`).innerHTML += listContact(o);
            }
        }
    }
}

function listContact(indexOfContact) {
    return `<td onclick="showContact(${indexOfContact});" class="contact contactHover mb-24px">
    <div class="flex y-center gap-35px">
        <div class="flex x-center y-center p-12px acronym" style="background-color: ${contacts[indexOfContact]['color']};"> 
            ${contacts[indexOfContact]['first-name'].charAt(0)} ${contacts[indexOfContact]['last-name'].charAt(0)}
        </div>
        <div>
            <div class="ft-general fs-20px fw-400 mb-5px">${contacts[indexOfContact]['first-name']}, ${contacts[indexOfContact]['last-name']}
            </div>
            <div><a href="" class="ft-general fw-400 fs-16px">${contacts[indexOfContact]['E-Mail']}</a>
            </div>
        </div>
    </div>
</td>`
}

function showContact(indexOfContact) {
    if (window.screen.width >= 1370) {
        document.getElementById('contact-details').innerHTML = `
        <div id="modify-contact" class="edit-contact flex y-center mb-24px">
            <div class="ft-general fs-47px fw-500 col-white mr-54px" style="background-color: ${contacts[indexOfContact]['color']};"> 
            ${contacts[indexOfContact]['first-name'].charAt(0)}${contacts[indexOfContact]['last-name'].charAt(0)}</div>
            <div>
                <div class="ft-general fs-47px fw-500 mb-12px">${contacts[indexOfContact]['first-name']} ${contacts[indexOfContact]['last-name']}</div>
                <div class="flex gap-16px">
                    <div onclick="editContactForm(${indexOfContact})" class="flex col-black y-center gap-8px">
                        <img src="/assets/img/edit.png" alt="Edit">
                        <span class="dark-blue">Edit</span>
                    </div>
                    <div onclick="deleteContact()" class="flex col-black y-center gap-8px">
                        <img src="/assets/img/delete.png" alt="Delete">
                        <span class="dark-blue">Delete</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex flex-column">
            <span class="ft-general fs-20px fw-400 mb-64px mt-24px">Contact Information</span>
            <div class="flex flex-column">
                <span class="ft-general fs-16px fw-700 mb-16px">Email</span>
                <span class="margin-bottom">${contacts[indexOfContact]['E-Mail']}</span>
                <span class="ft-general fs-16px fw-700 mb-16px">Phone</span>
                ${contacts[indexOfContact]['Phone']}</span>
            </div>
        </div>`;
    } else {
        document.getElementById('Webversion').classList.add('d-none');
        document.getElementById('ResponsiveVersion').classList.remove('d-none');
        showContactResponsive(indexOfContact);
    }

    indexOfcurrentContact = indexOfContact;
}

function goBack() {
    document.getElementById('Webversion').classList.remove('d-none');
    document.getElementById('ResponsiveVersion').classList.add('d-none');
}

function showContactResponsive(indexOfContact) {
    document.getElementById('contact-detailsResponsive').innerHTML = `
        <div id="modify-contact" class="edit-contact flex y-center mb-24px">
            <div class="ft-general fs-27px fw-500 col-white mr-54px" style="background-color: ${contacts[indexOfContact]['color']};"> 
            ${contacts[indexOfContact]['first-name'].charAt(0)}${contacts[indexOfContact]['last-name'].charAt(0)}</div>
            <div>
                <div class="ft-general fs-27px fw-500 mb-12px">${contacts[indexOfContact]['first-name']} ${contacts[indexOfContact]['last-name']}</div>
                <div class="flex gap-16px">
                    <div onclick="editContactForm(${indexOfContact})" class="flex col-black y-center gap-8px">
                        <img src="/assets/img/edit.png" alt="Edit">
                        <span class="dark-blue">Edit</span>
                    </div>
                    <div onclick="deleteContact()" class="flex col-black y-center gap-8px">
                        <img src="/assets/img/delete.png" alt="Delete">
                        <span class="dark-blue">Delete</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex flex-column">
            <span class="ft-general fs-20px fw-400 mb-64px mt-24px">Contact Information</span>
            <div class="flex flex-column">
                <span class="ft-general fs-16px fw-700 mb-16px">Email</span>
                <span class="margin-bottom">${contacts[indexOfContact]['E-Mail']}</span>
                <span class="ft-general fs-16px fw-700 mb-16px">Phone</span>
                ${contacts[indexOfContact]['Phone']}</span>
            </div>
        </div>`;

    indexOfcurrentContact = indexOfContact;
}

function createNewContact() {
    randomNumber();
    if (window.screen.width > 1160) {
        pushNewContact();
    } else {
        pushNewContactRESPONSIVE();
    }
    closeContactOverlay();
    setItem();
    getItem();
    setContacts();
}

function pushNewContact() {
    contacts.push(
        {
            'first-name': `${document.getElementById('first-name').value}`,
            'last-name': `${document.getElementById('last-name').value}`,
            'E-Mail': `${document.getElementById('email').value}`,
            'Phone': `${document.getElementById('telephoneNumber').value}`,
            'color': '#' + newBackgroundColor
        }
    );
    document.getElementById('newContactForm').reset();
}

function pushNewContactRESPONSIVE() {
    contacts.push(
        {
            'first-name': `${document.getElementById('first-nameRESP').value}`,
            'last-name': `${document.getElementById('last-nameRESP').value}`,
            'E-Mail': `${document.getElementById('emailRESP').value}`,
            'Phone': `${document.getElementById('telephoneNumberRESP').value}`,
            'color': '#' + newBackgroundColor
        }
    );
    document.getElementById('newContactFormResponsive').reset();
}

function deleteContact() {
    deleteContactInTask();
    contacts.splice(indexOfcurrentContact, 1);
    setItem();
    getItem();
    location.replace('contacts.html');
}

function deleteContactInTask() {
    for (t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        for (d = 0; d < task['contacts'].length; d++) {
            if (task['contacts'][d]['first-name'] == contacts[indexOfcurrentContact]['first-name']) {
                task['contacts'].splice(d, 1);
            }
        }
    }
}

let unchangedContact = '';

function editContactForm(indexOfContact) {
    unchangedContact = contacts[indexOfContact]['first-name'];
    setItem();
    openEditContactForm();

    if (window.screen.width > 1160) {
        loadValueIntoInputs(indexOfContact);
    } else {
        loadValueIntoInputsRESPONSIVE(indexOfContact);
    }
}

function loadValueIntoInputs(indexOfContact) {
    let firstName = document.getElementById('edit-fist-name');
    let lastName = document.getElementById('edit-last-name');
    let eMail = document.getElementById('edit-email');
    let phoneNumber = document.getElementById('edit-number');

    firstName.value = contacts[indexOfContact]['first-name'];
    lastName.value = contacts[indexOfContact]['last-name'];
    eMail.value = contacts[indexOfContact]['E-Mail'];
    phoneNumber.value = contacts[indexOfContact]['Phone'];

    let contactIcon = document.getElementById('contactIcon');
    contactIcon.innerHTML = `<div class="contactIcon" style="background-color: ${contacts[indexOfContact]['color']}">
    ${firstName.value.charAt(0)}${lastName.value.charAt(0)}</div>`;
}

function loadValueIntoInputsRESPONSIVE(indexOfContact) {
    let firstNameRESP = document.getElementById('edit-fist-nameRESP');
    let lastNameRESP = document.getElementById('edit-last-nameRESP');
    let eMailRESP = document.getElementById('edit-emailRESP');
    let phoneNumberRESP = document.getElementById('edit-numberRESP');

    firstNameRESP.value = contacts[indexOfContact]['first-name'];
    lastNameRESP.value = contacts[indexOfContact]['last-name'];
    eMailRESP.value = contacts[indexOfContact]['E-Mail'];
    phoneNumberRESP.value = contacts[indexOfContact]['Phone'];

    let contactIconResponsive = document.getElementById('contactIconResponsive');
    contactIconResponsive.innerHTML = `<div class="contactIcon" style="background-color: ${contacts[indexOfContact]['color']}">
    ${firstNameRESP.value.charAt(0)}${lastNameRESP.value.charAt(0)}</div>`;
}

function saveChanges() {
    if (window.screen.width > 1160) {
        saveEditedValues();
    } else {
        saveEditedValuesRESPONSIVE();
    }
    refreshContactsInTask();
    closeEditContactForm();
    setContacts();
    showContact(indexOfcurrentContact);
    setItem();
}

function saveEditedValues() {
    let firstName = document.getElementById('edit-fist-name').value;
    let lastName = document.getElementById('edit-last-name').value;
    let eMail = document.getElementById('edit-email').value;
    let phoneNumber = document.getElementById('edit-number').value;

    contacts[indexOfcurrentContact]['first-name'] = firstName;
    contacts[indexOfcurrentContact]['last-name'] = lastName;
    contacts[indexOfcurrentContact]['E-Mail'] = eMail;
    contacts[indexOfcurrentContact]['Phone'] = phoneNumber;
}

function saveEditedValuesRESPONSIVE() {
    let firstNameRESP = document.getElementById('edit-fist-nameRESP').value;
    let lastNameRESP = document.getElementById('edit-last-nameRESP').value;
    let eMailRESP = document.getElementById('edit-emailRESP').value;
    let phoneNumberRESP = document.getElementById('edit-numberRESP').value;

    contacts[indexOfcurrentContact]['first-name'] = firstNameRESP
    contacts[indexOfcurrentContact]['last-name'] = lastNameRESP;
    contacts[indexOfcurrentContact]['E-Mail'] = eMailRESP;
    contacts[indexOfcurrentContact]['Phone'] = phoneNumberRESP;
}

function refreshContactsInTask() {
    for (t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        for (c = 0; c < task['contacts'].length; c++) {
            let taskContact = task['contacts'][c];
            if (taskContact['first-name'] == unchangedContact) {
                taskContact['first-name'] = document.getElementById('edit-fist-name').value;
                taskContact['last-name'] = document.getElementById('edit-last-name').value;
                taskContact['E-Mail'] = document.getElementById('edit-email').value;
                taskContact['Phone'] = document.getElementById('edit-number').value;
            }
        }
    }
}

function randomNumber() {
    let numberRandom = Math.floor((Math.random() * 0xffffff)).toString(16);
    newBackgroundColor = numberRandom;
    if (numberRandom <= 0xffff || numberRandom <= 0xfffff) {
        randomNumber();
    } else { return numberRandom; }
}

function openContactsOverlay() {
    document.getElementById('contacts').classList.add('d-none');
    document.getElementById('body-contacts').classList.add("flex", "x-center", "y-center");
    document.getElementById('side-and-topbar-contacts').classList.add("opacity", "z-ind--1");
    if (window.screen.width > 1160) {
        document.getElementById('overlay-contacts').classList.remove('d-none');
        document.getElementById('overlay-contactsResponsive').classList.add('d-none');
    } else {
        document.getElementById('overlay-contacts').classList.add('d-none');
        document.getElementById('overlay-contactsResponsive').classList.remove('d-none');
    }
}

function openEditContactForm() {
    document.getElementById('contacts').classList.add('d-none');
    document.getElementById('body-contacts').classList.add("flex", "x-center", "y-center");
    document.getElementById('side-and-topbar-contacts').classList.add("opacity", "z-ind--1");
    if (window.screen.width > 1160) {
        document.getElementById('edit-contacts').classList.remove('d-none');
        document.getElementById('edit-contactsResponsive').classList.add('d-none');
    } else {
        document.getElementById('edit-contacts').classList.add('d-none');
        document.getElementById('edit-contactsResponsive').classList.remove('d-none');
    }
}

function closeContactOverlay() {
    document.getElementById('contacts').classList.remove('d-none');
    document.getElementById('body-contacts').classList.remove("flex", "x-center", "y-center");
    document.getElementById('side-and-topbar-contacts').classList.remove("opacity", "z-ind--1");
    document.getElementById('overlay-contacts').classList.add('d-none');
    document.getElementById('overlay-contactsResponsive').classList.add('d-none');
}

function closeEditContactForm() {
    document.getElementById('contacts').classList.remove('d-none');
    document.getElementById('body-contacts').classList.remove("flex", "x-center", "y-center");
    document.getElementById('side-and-topbar-contacts').classList.remove("opacity", "z-ind--1");
    document.getElementById('edit-contacts').classList.add('d-none');
    document.getElementById('edit-contactsResponsive').classList.add('d-none');
}