let firstCharsSorted = [];
let displayingContact;
let randomizedColor;

async function setContacts() {
    setFirstChars();
    createTableContent();
}

function setFirstChars() {
    let firstChars = [];
    for (c = 0; c < contacts.length; c++) {
        let char = contacts[c]['first-name'].charAt(0);
        firstChars.push(char);
    }
    const output = [...new Set(firstChars)];
    firstChars = output;
    firstCharsSorted = firstChars.sort();
}

function createTableContent() {
    document.getElementById('contact-book').innerHTML = '';
    for (f = 0; f < firstCharsSorted.length; f++) {
        document.getElementById('contact-book').innerHTML += `
        <td id="${firstCharsSorted[f]}-Title" class="letter-Title">
                <span>${firstCharsSorted[f]}</span>
            </td>
            <tr id="${firstCharsSorted[f]}" class="letter-container">
             </tr>`;
        for (c = 0; c < contacts.length; c++) {
            let char = contacts[c]['first-name'].charAt(0);
            if (char == firstCharsSorted[f]) {
                document.getElementById(`${firstCharsSorted[f]}`).innerHTML += listContact(c);
            }
        }
    }
}

function listContact(index) {
    return `<td onclick="openContact(${index});" class="listContactContainer" id="list${index}">
    <div class="listContact">
        <div class="list_Icon" style="background-color: ${contacts[index]['color']};"> 
            ${contacts[index]['first-name'].charAt(0)}${contacts[index]['last-name'].charAt(0)}
        </div>
        <div>
            <div class="list_Name" id="name${index}">
            ${contacts[index]['first-name']}, ${contacts[index]['last-name']}
            </div>
            <div>
            <a class="list_EMail" id="eMail${index}">${contacts[index]['E-Mail']}</a>
            </div>
        </div>
    </div>
</td>`
}

async function openContact(index) {
    await setContacts();
    document.getElementById(`list${index}`).style = "background-color: #2A3647; border-radius: 1%;";
    document.getElementById(`name${index}`).style = "color: white;";
    document.getElementById(`eMail${index}`).style = "color: grey;";

    loadTopic(index);

    if (window.screen.width < 850) {
        document.getElementById('tableArea').style = "display:none;"
        document.getElementById('goBackToTable').style = "";
        document.getElementById('informationArea').style = "display: unset;";
    }

    displayingContact = index;
}

function loadTopic(index) {
    document.getElementById('showContacts').classList.remove('overflow-x-hidden');
    document.getElementById('informationArea').classList.add('show_informationArea');
    document.getElementById('infosTitle').style = '';
    document.getElementById('infosTitle_Icon').style = `background-color:${contacts[index]['color']}`;
    document.getElementById('infosTitle_Icon').innerHTML = `
    <string>${contacts[index]['first-name'].charAt(0)}${contacts[index]['last-name'].charAt(0)}</string>`;
    document.getElementById('infosTitle_Name').innerHTML = `
    ${contacts[index]['first-name']} ${contacts[index]['last-name']}`;
    document.getElementById('infosContent').style = '';
    document.getElementById('infosContent_EMail').innerHTML = `${contacts[index]['E-Mail']}`;
    document.getElementById('infosContent_Phone').innerHTML = `${contacts[index]['Phone']}`;
}

function hideContact() {
    document.getElementById('tableArea').style = ""
    document.getElementById('goBackToTable').style = "display:none;";
    document.getElementById('informationArea').style = "display:none;";
    setContacts();
}

async function createContact() {
    randomNumber();
    createNewContactID();
}

async function createNewContactID() {
    contactsIDs = [];
    for (let c = 0; c < contacts.length; c++) {
        let contactID = contacts[c]['id'];
        contactsIDs.push(contactID);
    }

    let newID;
    if (contacts.length >= 1) {
        contactsIDs = contactsIDs.sort(function (a, b) { return a - b; });
        let highestContactID = Math.max(...contactsIDs);
        newID = highestContactID + 1;
    } else {
        newID = contacts.length + 1;
    }
    await pushValuesForNewContact(newID);
}

async function pushValuesForNewContact(newID) {
    contacts.push(
        {
            'id': newID,
            'first-name': `${document.getElementById('first-name').value}`,
            'last-name': `${document.getElementById('last-name').value}`,
            'E-Mail': `${document.getElementById('email').value}`,
            'Phone': `${document.getElementById('telephoneNumber').value}`,
            'color': '#' + randomizedColor
        }
    );
    await saveNewContact(newID);
    closeAddContact();
}

async function saveNewContact(newID) {
    await setItem();
    setContacts();
    if (currentUser[0]) {
        let newContact = contacts.length - 1;
        await addContact_firebase(currentUser[0]['email'], newID, contacts[newContact])
    }
}

async function deleteContact() {
    deleteInTask();

    if (currentUser[0]) {
        let contactDocId = contacts[displayingContact]['id'];
        await deleteContact_firebase(currentUser[0]['email'], contactDocId);
    }
    contacts.splice(displayingContact, 1);
    await setItem();
    location.replace('contacts.html');
}

async function deleteInTask() {
    for (t = 0; t < tasks.length; t++) {
        let task = tasks[t];
        for (d = 0; d < task['contacts'].length; d++) {
            if (task['contacts'][d]['first-name'] == contacts[displayingContact]['first-name']) {
                task['contacts'].splice(d, 1);

                let taskID = task['id'];
                updateTask_firebase(currentUser[0]['email'], `${taskID}`, task)
            }
        }
    }
    await setItem();
}

async function editContact() {
    openEditContactForm();
    loadValues(displayingContact);
}

function loadValues(index) {
    let firstName = document.getElementById('edit-fist-name');
    let lastName = document.getElementById('edit-last-name');
    let eMail = document.getElementById('edit-email');
    let phoneNumber = document.getElementById('edit-number');

    firstName.value = contacts[index]['first-name'];
    lastName.value = contacts[index]['last-name'];
    eMail.value = contacts[index]['E-Mail'];
    phoneNumber.value = contacts[index]['Phone'];

    let contactIcon = document.getElementById('contactIconEdit');
    contactIcon.innerHTML = `<div class="edit_Icon" style="background-color: ${contacts[index]['color']}">
    ${firstName.value.charAt(0)}${lastName.value.charAt(0)}</div>`;
}

function saveChanges() {
    save();
    setContacts();
    closeEditContactForm();
    openContact(displayingContact);
}

async function save() {
    let firstName = document.getElementById('edit-fist-name').value;
    let lastName = document.getElementById('edit-last-name').value;
    let eMail = document.getElementById('edit-email').value;
    let phoneNumber = document.getElementById('edit-number').value;

    contacts[displayingContact]['first-name'] = firstName;
    contacts[displayingContact]['last-name'] = lastName;
    contacts[displayingContact]['E-Mail'] = eMail;
    contacts[displayingContact]['Phone'] = phoneNumber;

    await saveInTasksAndFirebase();
}

async function saveInTasksAndFirebase() {
    for (let t = 0; t < tasks.length; t++) {
        for (let c = 0; c < tasks[t]['contacts'].length; c++) {
            if (tasks[t]['contacts'][c]['id'] == contacts[displayingContact]['id']) {
                tasks[t]['contacts'][c] = contacts[displayingContact];
                let taskID = tasks[t]['id'];
                if (currentUser[0]) { await updateTask_firebase(currentUser[0]['email'], `${taskID}`, tasks[t]) }
            }
        }
    }
    await setItem();
    if (currentUser[0]) {
        let contactDocId = contacts[displayingContact]['id'];
        await updateContact_firebase(currentUser[0]['email'], `${contactDocId}`, contacts[displayingContact]);
    }
}

function randomNumber() {
    let numberRandom = Math.floor((Math.random() * 0xffffff)).toString(16);
    randomizedColor = numberRandom;
    if (numberRandom <= 0xffff || numberRandom <= 0xfffff) {
        randomNumber();
    } else { return numberRandom; }
}


function isInputNumber(evt) {
    var ch = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(ch))) {
        evt.preventDefault();
    }
}











function openAddContact() {
    document.getElementById('addContactScreen').style = "";
    document.getElementById('addLayer').classList.add('add_edit_Layer');
    document.getElementById('addContainer').style = "";
}

function closeAddContact() {
    document.getElementById('addContactForm').reset();
    document.getElementById('addContactScreen').style = "display:none;";
    document.getElementById('addLayer').classList.remove('add_edit_Layer');
    document.getElementById('addContainer').style = "display:none;";
}


function openEditContactForm() {
    document.getElementById('editContactScreen').style = "";
    document.getElementById('editLayer').classList.add('add_edit_Layer');
    document.getElementById('editContainer').style = "";
}

function closeEditContactForm() {
    document.getElementById('editContactScreen').style = "display:none;";
    document.getElementById('editLayer').classList.remove('add_edit_Layer');
    document.getElementById('editContainer').style = "display:none;";
}
