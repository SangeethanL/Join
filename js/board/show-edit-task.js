let changedProgress;

/*-------------------------------Show Task Form öffnen bzw. anzeigen lassen-------------------------------*/

function openTaskInWindow(task) {
    currentDisplayedTask = task;
    document.getElementById('showTaskBackground').style = "";
    document.getElementById('Save').classList.add('display-none');
    document.getElementById('openedTask').classList.add('show_form2');
    loadCategory();
    document.getElementById('title2').innerHTML = `${tasks[currentDisplayedTask]['title']}`;
    document.getElementById('description2').innerHTML = `${tasks[currentDisplayedTask]['description']}`;
    document.getElementById('date2').innerHTML = `${tasks[currentDisplayedTask]['date']}`;
    displayPriorityWithSymbols();
    displayContacts();
    displaySubtasksWithCheckbox(tasks[currentDisplayedTask]['subtasks']);
    document.getElementById('Edit-Delete').classList.remove('d-none');
}

function loadCategory() {
    if(tasks[currentDisplayedTask]['category'].charAt(0) == 'T'){
        document.getElementById('category2').innerHTML = `
        <div style="background-color: #1FD7C1;">${tasks[currentDisplayedTask]['category']}</div>`;
    }
    if(tasks[currentDisplayedTask]['category'].charAt(0) == 'U'){
        document.getElementById('category2').innerHTML = `
        <div style="background-color: #0038FF;">${tasks[currentDisplayedTask]['category']}</div>`;
    }
}
function displayPriorityWithSymbols() {
    if (tasks[currentDisplayedTask]['priority'] == 'Low') {
        document.getElementById('priority2').innerHTML = `
            ${tasks[currentDisplayedTask]['priority']} <img src="assets/img/add-task-img/prio-low.png">`;
    }
    if (tasks[currentDisplayedTask]['priority'] == 'Medium') {
        document.getElementById('priority2').innerHTML = `
            ${tasks[currentDisplayedTask]['priority']} <img src="assets/img/add-task-img/prio-medium.png">`;
    }
    if (tasks[currentDisplayedTask]['priority'] == 'Urgent') {
        document.getElementById('priority2').innerHTML = `
            ${tasks[currentDisplayedTask]['priority']} <img src="assets/img/add-task-img/prio-urgent.png">`;
    }
}

function displayContacts() {
    document.getElementById('contacts2').innerHTML = '';
    if (tasks[currentDisplayedTask]['contacts'].length == 0) {
        document.getElementById('contacts2').innerHTML = 'No Contacts assigned';
    } else {
        for (c = 0; c < tasks[currentDisplayedTask]['contacts'].length; c++) {
            let assignedContact = tasks[currentDisplayedTask]['contacts'][c];
            document.getElementById('contacts2').innerHTML += `
            <div class="flex row y-center">
                <string style="background-color:${assignedContact['color']}; width: 20px; height: 20px; font-size: 11px;" 
                class="flex x-center y-center border-round-100 ml-12px mr-32px">
                ${assignedContact['first-name'].charAt(0)}${assignedContact['last-name'].charAt(0)}
                </string>
                <div>${assignedContact['first-name']} ${assignedContact['last-name']}
                </div>
            </div>`;
        }
    }
}

function displaySubtasksWithCheckbox(subtasksArray) {
    document.getElementById('container3').innerHTML = '';
    for (p = 0; p < subtasksArray.length; p++) {
        document.getElementById('container3').innerHTML += `
        <div>
            <input type="checkbox" id="check${p}" onclick="checkbox(${p})" style="width: 13px;"> <label>${tasks[currentDisplayedTask]['subtasks'][p]}</label>
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
    document.getElementById('Save').classList.remove('display-none');
    document.getElementById('title2').innerHTML = `<div class="column">
    <string class="elementStyling">Title</string>
    <input id="titleEdited" value="${tasks[currentDisplayedTask]['title']}"></div>`;
    document.getElementById('description2').innerHTML = `<div class="column">
    <string class="elementStyling">Description</string>
    <input id="descriptionEdited" value="${tasks[currentDisplayedTask]['description']}"></div>`;
    document.getElementById('date-container').classList.remove('date-container');
    document.getElementById('date-container').classList.add('column');
    document.getElementById('date2').style = "display: flex; justify-content: flex-start;";
    document.getElementById('date2').innerHTML = `<input id="dateEdited" type="date" value="${tasks[currentDisplayedTask]['date']}">`;
    loadPriorityButtons();
    editContacts();
    editSubtasks002();
    displaySubtasks('2');
    document.getElementById('Edit-Delete').classList.add('d-none');
}



function loadPriorityButtons() {
    document.getElementById('priority2').innerHTML = `
    <div class="priorityButtons">
        <button onclick="chooseUrgent();changeBgColorUrgent();" id="edit-urgent">Urgent</button>
        <button onclick="chooseMedium();changeBgColorMedium();" id="edit-medium">Medium</button>
        <button onclick="chooseLow();changeBgColorLow();" id="edit-low">Low</button>
    </div>`;
}

function resetPriorityButtonsEditTask() {
        document.getElementById('edit-urgent').style = "background-color: #d8f0ff;";
        document.getElementById('edit-medium').style = "background-color: #d8f0ff;";
        document.getElementById('edit-low').style = "background-color: #d8f0ff;";
}

function changeBgColorUrgent() {
    resetPriorityButtonsEditTask();
    document.getElementById('edit-urgent').style = "background-color: #ffb700;";
}

function changeBgColorMedium() {
    resetPriorityButtonsEditTask();
    document.getElementById('edit-medium').style = "background-color: #fbff00;";
}

function changeBgColorLow() {
    resetPriorityButtonsEditTask();
    document.getElementById('edit-low').style = "background-color: #64975f;";
}

function editSubtasks002() {
    document.getElementById('container3').innerHTML = '';
    document.getElementById('container3').innerHTML = `
    <div class="flex flex-row w-100">
    <input id="inputNewSubtask2" oninput="enableInputButtons('2')">
    <div id="hiddenButtons2" style="display:none;">
        <string onclick="submitSubtask('2')" style="margin-right: 5px;">&#10003</string>
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
        <div class="flex x-space-betw mb-2px w-70">${currentContact['first-name']} ${currentContact['last-name']}
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
    if (tasks[currentDisplayedTask]['contacts'].length >= 5) { alert('Keine Kontaktauswahl mehr möglich!') }
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
    if (changedProgress == null) { } else { tasks[currentDisplayedTask]['progress'] = changedProgress; }
    tasks[currentDisplayedTask]['title'] = editedTitle;
    tasks[currentDisplayedTask]['description'] = editedDescription;
    tasks[currentDisplayedTask]['date'] = editedDate;
    tasks[currentDisplayedTask]['priority'] = priorityStatus || tasks[currentDisplayedTask]['priority'];
    displayPriorityWithSymbols();
    document.getElementById('date2').style = "";
    document.getElementById('date-container').classList.remove('column');
    document.getElementById('date-container').classList.add('date-container');
    openTaskInWindow(currentDisplayedTask);
    document.getElementById('Save').classList.add('display-none');
    changedProgress = null;
    cleanBoard();
    loadBoard();
    setItem();
}

function closeShowTask() {
    document.getElementById('date2').style = "";
    document.getElementById('date-container').classList.remove('column');
    document.getElementById('date-container').classList.add('date-container');
    document.getElementById('contacts2').innerHTML = '';
    document.getElementById('showTaskBackground').style = "display: none;";
    document.getElementById('openedTask').classList.remove('show_form2');
    cleanBoard();
    loadBoard();
    if (document.getElementById('board').classList == 'display-none') {
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








function moveTaskInResponsive() {
    if (window.screen.width <= 800) {
        document.getElementById('category2').innerHTML = '';
        document.getElementById('category2').innerHTML = `
            <div class="moveTaskCSS">
                <string class="elementStyling">Move Task</string>
                <div id="destinationButtons">
                </div>
            </div>`;
        defineButtonsMoveTask();
    }

}

let buttonToDo = `<button onclick="moveTask('1')" id="1" class="moveTaskButton">To do</button>`;
let buttonInProgress = `<button onclick="moveTask('2')" id="2" class="moveTaskButton">In progress</button>`;
let buttonAwaitFeedback = `<button onclick="moveTask('3')" id="3" class="moveTaskButton">Await feedback</button>`;
let buttonDone = `<button onclick="moveTask('4')" id="4" class="moveTaskButton">Done</button>`;

function defineButtonsMoveTask() {
    if (tasks[currentDisplayedTask]['progress'] == 'TODO') {
        document.getElementById('destinationButtons').innerHTML += buttonInProgress;
        document.getElementById('destinationButtons').innerHTML += buttonAwaitFeedback;
        document.getElementById('destinationButtons').innerHTML += buttonDone;
    }
    if (tasks[currentDisplayedTask]['progress'] == 'INPROGRESS') {
        document.getElementById('destinationButtons').innerHTML += buttonToDo;
        document.getElementById('destinationButtons').innerHTML += buttonAwaitFeedback;
        document.getElementById('destinationButtons').innerHTML += buttonDone;
    }
    if (tasks[currentDisplayedTask]['progress'] == 'AWAITFEEDBACK') {
        document.getElementById('destinationButtons').innerHTML += buttonToDo;
        document.getElementById('destinationButtons').innerHTML += buttonInProgress;
        document.getElementById('destinationButtons').innerHTML += buttonDone;
    }
    if (tasks[currentDisplayedTask]['progress'] == 'DONE') {
        document.getElementById('destinationButtons').innerHTML += buttonToDo;
        document.getElementById('destinationButtons').innerHTML += buttonInProgress;
        document.getElementById('destinationButtons').innerHTML += buttonAwaitFeedback;
    }
}

function resetMoveTaskButtons() {
    for (let t = 1; t < 5; t++) {
        if (document.getElementById(`${t}`)) {
            document.getElementById(`${t}`).style = "background-color: rgb(12, 131, 182);";
        }
    }
}

function moveTask(buttonNr) {
    if (buttonNr == '1') {
        changedProgress = 'TODO';
    }
    if (buttonNr == '2') {
        changedProgress = 'INPROGRESS';
    }
    if (buttonNr == '3') {
        changedProgress = 'AWAITFEEDBACK';
    }
    if (buttonNr == '4') {
        changedProgress = 'DONE';
    }
    resetMoveTaskButtons();
    document.getElementById(`${buttonNr}`).style = "background-color: rgb(12, 83, 182);"

}