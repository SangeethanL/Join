let changedProgress;

/*-------------------------------Show Task Form öffnen bzw. anzeigen lassen-------------------------------*/

function openTaskInWindow(task) {
    currentDisplayedTask = task;
    document.getElementById('showTaskBackground').style = "";
    document.getElementById('delete').classList.add('display-none');
    document.getElementById('openedTask').classList.add('show_form2');
    document.getElementById('category2').innerHTML = `${tasks[currentDisplayedTask]['category']}`;
    document.getElementById('title2').innerHTML = `${tasks[currentDisplayedTask]['title']}`;
    document.getElementById('description2').innerHTML = `${tasks[currentDisplayedTask]['description']}`;
    document.getElementById('date2').innerHTML = `${tasks[currentDisplayedTask]['date']}`;
    document.getElementById('priority2').innerHTML = `${tasks[currentDisplayedTask]['priority']}`;
    displayContacts();
    displaySubtasksWithCheckbox(tasks[currentDisplayedTask]['subtasks']);
    document.getElementById('Edit-Save').innerHTML = `<string onclick="editTask()">Edit</string>`;
}

function displayContacts() {
    document.getElementById('contacts2').innerHTML = '';
    for (c = 0; c < tasks[currentDisplayedTask]['contacts'].length; c++) {
        let assignedContact = tasks[currentDisplayedTask]['contacts'][c];
        document.getElementById('contacts2').innerHTML += `<div>${assignedContact['first-name']} ${assignedContact['last-name']}</div>`;
    }
}

function displaySubtasksWithCheckbox(subtasksArray) {
    document.getElementById('container3').innerHTML = '';
    for (p = 0; p < subtasksArray.length; p++) {
        document.getElementById('container3').innerHTML += `
        <div>
            <input type="checkbox" id="check${p}" onclick="checkbox(${p})" style="width: 13px;"> <string>${tasks[currentDisplayedTask]['subtasks'][p]}</string>
        </div>`;
    }
    for (q = 0; q < tasks[currentDisplayedTask]['subtasks-checkbox'].length; q++) {
        if (tasks[currentDisplayedTask]['subtasks-checkbox'][q] == true) {
            document.getElementById(`check${q}`).checked = true;
        }
    }
}

function checkbox(indexOfCheckbox) {
    let id = indexOfCheckbox;
    let checkbox = document.getElementById(`check${indexOfCheckbox}`);
    if (checkbox.checked == false) {
        tasks[currentDisplayedTask]['subtasks-checkbox'][id] = false;
    }
    if (checkbox.checked == true) {
        tasks[currentDisplayedTask]['subtasks-checkbox'][id] = true;
    }
}

function editTask() {
    moveTaskInResponsive();
    document.getElementById('delete').classList.remove('display-none');
    document.getElementById('title2').innerHTML = `<div class="space">
    <string class="elementStyling">Title</string>
    <input id="titleEdited" value="${tasks[currentDisplayedTask]['title']}"></div>`;
    document.getElementById('description2').innerHTML = `<div class="space">
    <string class="elementStyling">Description</string>
    <input id="descriptionEdited" value="${tasks[currentDisplayedTask]['description']}"></div>`;
    document.getElementById('date2').innerHTML = `<input id="dateEdited" type="date" value="${tasks[currentDisplayedTask]['date']}">`;
    loadPriorityButtons();
    editContacts();
    editSubtasks002();
    displaySubtasks('2');
    document.getElementById('Edit-Save').innerHTML = `<string onclick="saveTask()">Save</string>`;
}

function moveTaskInResponsive() {
    if(window.screen.width <= 800) {
        document.getElementById('category2').innerHTML = '';
        if(tasks[currentDisplayedTask]['progress'] == 'TODO'){
            document.getElementById('category2').innerHTML += displayButtonsToMoveTask1();
        }
        if(tasks[currentDisplayedTask]['progress'] == 'INPROGRESS'){
            document.getElementById('category2').innerHTML += displayButtonsToMoveTask2();
        }
        if(tasks[currentDisplayedTask]['progress'] == 'AWAITFEEDBACK'){
            document.getElementById('category2').innerHTML += displayButtonsToMoveTask3();
        }
        if(tasks[currentDisplayedTask]['progress'] == 'DONE'){
            document.getElementById('category2').innerHTML += displayButtonsToMoveTask4();
        }
    }
}

function displayButtonsToMoveTask1() {
    return `<div>
    <string class="elementStyling">Move Task</string>
    <button onclick="moveInProgress()">In progress</button>
    <button onclick="moveAwaitFeedback()">Await feedback</button>
    <button onclick="moveDone()">Done</button>
    </div>`
}
function displayButtonsToMoveTask2() {
    return `<div>
    <string class="elementStyling">Move Task</string>
    <button onclick="moveToDo()">To do</button>
    <button onclick="moveAwaitFeedback()">Await feedback</button>
    <button onclick="moveDone()">Done</button>
    </div>`
}
function displayButtonsToMoveTask3() {
    return `<div>
    <string class="elementStyling">Move Task</string>
    <button onclick="moveToDo()">To do</button>
    <button onclick="moveInProgress()">In progress</button>
    <button onclick="moveDone()">Done</button>
    </div>`
}
function displayButtonsToMoveTask4() {
    return `<div>
    <string class="elementStyling">Move Task</string>
    <button onclick="moveToDo()">To do</button>
    <button onclick="moveInProgress()">In progress</button>
    <button onclick="moveAwaitFeedback()">Await feedback</button>
    </div>`
}

function moveToDo() {
    changedProgress = 'TODO';
}
function moveInProgress() {
    changedProgress = 'INPROGRESS';
}
function moveAwaitFeedback() {
    changedProgress = 'AWAITFEEDBACK';
}
function moveDone() {
    changedProgress = 'DONE';
}

function loadPriorityButtons() {
    document.getElementById('priority2').innerHTML = `
    <button onclick="chooseUrgent()">Urgent</button>
    <button onclick="chooseMedium()">Medium</button>
    <button onclick="chooseLow()">Low</button>`;
}

function editSubtasks002() {
    document.getElementById('container3').innerHTML = '';
    document.getElementById('container3').innerHTML = `
    <div>
    <input id="inputNewSubtask2" oninput="enableInputButtons('2')">
    <div id="hiddenButtons2" style="display:none;">
        <string onclick="submitSubtask('2')">&#10003</string>
        <string onclick="cleanInputField('2')">&#x1F5D1</string>
    </div>
    </div>
    <div id="displaySubtasks2">
    </div>`;
}

function editContacts() {
    document.getElementById('contacts2').innerHTML = `
        <div>
        <select id="contactsToAdd" onchange="addContact(this.value)">
            <option value="">Select Contact</option>
        </select>
        <div id="currentContacts"></div>
        </div>`;

    displayContactsinSHOWTASK();
    createMenuOfSelectableContacts();
    displaySelectableContactsInMenu();
}

function displayContactsinSHOWTASK() {
    for (e = 0; e < tasks[currentDisplayedTask]['contacts'].length; e++) {
        let currentContact = tasks[currentDisplayedTask]['contacts'][e];
        document.getElementById('currentContacts').innerHTML += `
        <div>${currentContact['first-name']} ${currentContact['last-name']}
        <button onclick="deleteSelectedContact(${[e]})">Entfernen</button></div>`;
    }
}

function createMenuOfSelectableContacts() {
    contactsNew = [];
    for (r = 0; r < contacts.length; r++) {
        let singleContact = contacts[r];
        contactsNew.push(singleContact);
        for (e = 0; e < tasks[currentDisplayedTask]['contacts'].length; e++) {
            let currentContact = tasks[currentDisplayedTask]['contacts'][e];
            if (singleContact['first-name'] == currentContact['first-name']) {
                let equalContact = contactsNew.indexOf(singleContact);
                contactsNew.splice(equalContact, 1)
            }
        }
    }
}

function displaySelectableContactsInMenu() {
    for (t = 0; t < contactsNew.length; t++) {
        let selectableContact = contactsNew[t];
        document.getElementById('contactsToAdd').innerHTML += `
        <option value="${t}">${selectableContact['first-name']} ${selectableContact['last-name']}</option>`;
    }
}
function addContact(newContact) {
    if (tasks[currentDisplayedTask]['contacts'].length >= 3) { alert('Keine Kontaktauswahl mehr möglich!') }
    else {
        tasks[currentDisplayedTask]['contacts'].push(contactsNew[newContact]);
    }
    editContacts();
}

function deleteSelectedContact(indexOfContact) {
    contactsNew.push(tasks[currentDisplayedTask]['contacts'][indexOfContact]);
    tasks[currentDisplayedTask]['contacts'].splice(indexOfContact, 1);
    editContacts();
}

function saveTask() {
    let editedTitle = document.getElementById('titleEdited').value;
    let editedDescription = document.getElementById('descriptionEdited').value;
    let editedDate = document.getElementById('dateEdited').value;
    if(changedProgress == null){} else {tasks[currentDisplayedTask]['progress'] = changedProgress;}
    tasks[currentDisplayedTask]['title'] = editedTitle;
    tasks[currentDisplayedTask]['description'] = editedDescription;
    tasks[currentDisplayedTask]['date'] = editedDate;
    tasks[currentDisplayedTask]['priority'] = priorityStatus || tasks[currentDisplayedTask]['priority'];
    openTaskInWindow(currentDisplayedTask);
    document.getElementById('delete').classList.add('display-none');
    changedProgress = null;
    cleanBoard();
    loadBoard();
    setItem();
}

function closeShowTask() {
    document.getElementById('contacts2').innerHTML = '';
    document.getElementById('showTaskBackground').style = "display: none;";
    document.getElementById('openedTask').classList.remove('show_form2');
    cleanBoard();
    loadBoard();
    if(document.getElementById('board').classList == 'display-none') {
        searchTask();
    }
    setItem();
}

function deleteTask() {
    tasks.splice(currentDisplayedTask, 1);
    declareIDs();
    closeShowTask();
    setItem();
}