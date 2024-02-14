/*------------------------------------------------------Zwischen Arrays------------------------------------------------------*/

let priorityStatus;
let selectedContacts = [];
let subtasks = [];

let currentDraggedElement;
let currentDisplayedTask;

/*--------------------------------Add Task Form öffnen bzw. anzeigen lassen--------------------------------*/

function addTaskForm(progress) {
    document.getElementById('addTaskBackground').style = "";
    document.getElementById('addTask').style = "";
    document.getElementById('addTask').classList.add('show_form1');
    document.getElementById('contacts').innerHTML = '';
    document.getElementById('contacts').innerHTML = `
    <option value="">Select Contact</option>`;

    /*-----Kontakte anzeigen lassen-----*/
    loadContactsForAddTask();

    /*-----Progresse anzeigen lassen-----*/
    progress_Neutral(progress);
    progress_InProgress(progress);
    progress_AwaitFeedback(progress)
}

function disablePastDates() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute("min", today);
}

/*------------------------Kontakte im Add Task Form Laden------------------------*/
function loadContactsForAddTask() {
    for (let j = 0; j < contacts.length; j++) {
        const contactIndex = [j];
        const contact = contacts[j]
        document.getElementById('contacts').innerHTML += `
            <option value="${contactIndex}">${contact['first-name']} ${contact['last-name']}</option>`;
    }
}
/*--------------------Ausgewählte Kontakte zwischenspeichern--------------------*/

function saveContact(value) {
    if (selectedContacts.includes(contacts[value])) {
        alert('Kontakt wurde schon ausgewählt!');
    }
    else {
        if (selectedContacts.length >= 5 && selectedContacts.includes(contacts[value])) {
            alert('Keine Kontaktauswahl mehr möglich!');
        }
        else {
            if (selectedContacts.length >= 5) {
                alert('Keine Kontaktauswahl mehr möglich!');
            } else {
                cacheContacts(value);
            }
        }
    }
}

function cacheContacts(value) {
    selectedContacts.push(contacts[value]);
    document.getElementById('displaySelectedContacts').innerHTML = '';
    for (c = 0; c < selectedContacts.length; c++) {
        document.getElementById('displaySelectedContacts').innerHTML += `
                    <div>${selectedContacts[c]['first-name']} ${selectedContacts[c]['last-name']}</div>`;
    }
}

/*-----------------Priority Status zwischenspeichern in Array-----------------*/

function chooseUrgent() {
    priorityStatus = 'Urgent';
    resetPriorityButtonsCreateTask();
    document.getElementById('urgent').style = "background-color: orange;";
}

function chooseMedium() {
    priorityStatus = 'Medium';
    resetPriorityButtonsCreateTask();
    document.getElementById('medium').style = "background-color: yellow;";
}

function chooseLow() {
    priorityStatus = 'Low';
    resetPriorityButtonsCreateTask();
    document.getElementById('low').style = "background-color: green;";
}

function resetPriorityButtonsCreateTask() {
    document.getElementById('urgent').style = "background-color: #ffffff;";
    document.getElementById('medium').style = "background-color: #ffffff;";
    document.getElementById('low').style = "background-color: #ffffff;";
}

/*-----------------Eingegebenen Task erstellen bzw. submitten-----------------*/

function createTask() {
    inputsForPush();

    priorityStatus = '';
    selectedContacts = [];
    subtasks = [];
    document.getElementById('displaySubtasks').innerHTML = '';
    document.getElementById('displaySelectedContacts').innerHTML = '';
    resetForms();
    setItem();
}

function inputsForPush() {
    let addTaskProgress = 'TODO';
    if (document.getElementById('progress')) { addTaskProgress = document.getElementById('progress').value };
    let addTaskCategory = document.getElementById('category').value;
    if (addTaskCategory == 'technical_task') { addTaskCategory = 'Technical Task'; } else { addTaskCategory = 'User Story'; }
    let addTaskTitle = document.getElementById('enterTitle').value;
    let addTaskDescription = document.getElementById('description').value;
    let addTaskDate = document.getElementById('date').value;
    if (priorityStatus == null) { priorityStatus = 'Medium' };
    pushInputsToCreateTask(addTaskProgress, addTaskCategory, addTaskTitle, addTaskDescription, addTaskDate, priorityStatus);
}

function pushInputsToCreateTask(addTaskProgress, addTaskCategory, addTaskTitle, addTaskDescription, addTaskDate, priorityStatus) {
    tasks.push({
        'id': `${tasks.length}`,
        'progress': `${addTaskProgress}`,
        'category': `${addTaskCategory}`,
        'title': `${addTaskTitle}`,
        'description': `${addTaskDescription}`,
        'date': `${addTaskDate}`,
        'priority': `${priorityStatus}`,
        'contacts': selectedContacts,
        'subtasks': subtasks,
        'subtasks-checkbox': [],
        'subtasks-true': []
    });
}

function resetForms() {
    if (window.location.pathname.endsWith('add_task.html')) {
        document.getElementById('addTaskForm').reset();
        window.location.href = 'board.html';
    }
    if (window.location.pathname.endsWith('board.html')) {
        resetPriorityButtonsCreateTask();
        document.getElementById('createTaskForm').reset();
        cleanBoard();
        loadBoard();
        closeTaskForm();
    }
}

/*-------------------------Inhalt des Board's leeren-------------------------*/

function cleanBoard() {
    document.getElementById('TODO').innerHTML = '';
    document.getElementById('INPROGRESS').innerHTML = '';
    document.getElementById('AWAITFEEDBACK').innerHTML = '';
    document.getElementById('DONE').innerHTML = '';
    document.getElementById('TODOresponsive').innerHTML = '';
    document.getElementById('INPROGRESSresponsive').innerHTML = '';
    document.getElementById('AWAITFEEDBACKresponsive').innerHTML = '';
    document.getElementById('DONEresponsive').innerHTML = '';
}

/*--------------------------Add Task Form schließen--------------------------*/

function closeTaskForm() {
    document.getElementById('addTaskBackground').style = "display: none;";
    document.getElementById('addTask').style = "display: none;";
    document.getElementById('hiddenButtons').style = "display: none;"
    resetPriorityButtonsCreateTask();
    priorityStatus = '';
    selectedContacts = [];
    subtasks = [];
    document.getElementById('displaySubtasks').innerHTML = '';
    document.getElementById('displaySelectedContacts').innerHTML = '';
}




/*----------------------------------Submit Subtasks Buttons und Funktion----------------------------------*/
let checkIfInputOpen;
/*------------Subtasks Buttons autmatisch anzeigen und ausblenden------------*/


function enableInputButtons(x) {
    let inputfield = '';
    let buttons = '';
    let subtasksDeposit = '';
    if (x == '1') {
        inputfield = document.getElementById('inputNewSubtask');
        buttons = document.getElementById('hiddenButtons');
        subtasksDeposit = subtasks;
    } else {
        inputfield = document.getElementById('inputNewSubtask2');
        buttons = document.getElementById('hiddenButtons2');
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }

    enableOptions(inputfield, buttons, subtasksDeposit);
}

function enableOptions(inputfield, buttons, subtasksDeposit) {
    if (subtasksDeposit.length >= 6) {
        buttons.style = "display:none;";
    }
    else {
        if (inputfield.value) {
            buttons.style = "";
        } else {
            buttons.style = "display:none;";
        }
    }
}

function cleanInputField(x) {
    let inputfield = '';
    if (x == '1') {
        inputfield = document.getElementById('inputNewSubtask');
    } else {
        inputfield = document.getElementById('inputNewSubtask2');
    }
    inputfield.value = '';
    enableInputButtons(x);
}
/*-------------------Subtasks zwischenspeichern in Array-------------------*/

function submitSubtask(x) {
    let inputfield = '';
    let subtasksDeposit = '';
    if (x == '1') {
        inputfield = document.getElementById('inputNewSubtask');
        subtasksDeposit = subtasks;
    } else {
        inputfield = document.getElementById('inputNewSubtask2');
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }

    submitOptions(inputfield, subtasksDeposit);

    displaySubtasks(x);
    enableInputButtons(x);
    checkIfInputOpen = '';
}

function submitOptions(inputfield, subtasksDeposit) {
    if (subtasksDeposit.length >= 15) {
    } else {
        subtasksDeposit.push(inputfield.value);
        inputfield.value = '';
    }
}

/*------------------------Subtasks anzeigen lassen------------------------*/

function displaySubtasks(x) {
    let displaySubtasks = '';
    let subtasksDeposit = '';
    if (x == '1') {
        displaySubtasks = 'displaySubtasks';
        subtasksDeposit = subtasks;
    } else {
        displaySubtasks = 'displaySubtasks2';
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }

    displaySubtasksOptions(x, displaySubtasks, subtasksDeposit);
}

function displaySubtasksOptions(x, displaySubtasks, subtasksDeposit) {
    document.getElementById(`${displaySubtasks}`).innerHTML = '';
    for (let a = 0; a < subtasksDeposit.length; a++) {
        document.getElementById(`${displaySubtasks}`).innerHTML += `
                <div id="sub${a}">
                    <div onmouseover="displayEditDeleteButtons(${x}, ${a})" onclick="displayEditDeleteButtons(${x}, ${a})">
                        <string>
                        ${subtasksDeposit[a]}
                        </string>
                    </div>
                </div>`;
    }
}

/*----------------------Subtasks bearbeiten/löschen----------------------*/


function displayEditDeleteButtons(x, indexOfSubtask) {
    let subtasksDeposit = '';
    if (x == '1') {
        subtasksDeposit = subtasks;
    }
    else {
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }

    editDeleteButtonsOptions(x, indexOfSubtask, subtasksDeposit)
}

function editDeleteButtonsOptions(x, indexOfSubtask, subtasksDeposit) {
    if (checkIfInputOpen == 'yes') {
        document.getElementById(`sub${indexOfSubtask}`).addEventListener('mouseover', function (e) { e.stopPropagation() }, true);
    } else {
        document.getElementById(`sub${[indexOfSubtask]}`).innerHTML = `
            <div id="editDeleteButtons" onmouseleave="displaySubtasks(${x})" class="cursor">
                <string>${subtasksDeposit[indexOfSubtask]}</string>
                <div>
                    <string onclick="editSubtask(${x}, ${indexOfSubtask})" class="cursor" style="margin-right: 15px;"> &#9998 </string> 
                    <string onclick="deleteSubtask(${x}, ${indexOfSubtask})" class="cursor"> &#x1F5D1 </string>
                </div>
            </div>`;
    }
}

function editSubtask(x, indexOfSubtask) {
    checkIfInputOpen = 'yes';
    let unchangedContent = '';
    let subtasksDeposit = '';

    if (x == '1') {
        unchangedContent = `currentContent`;
        subtasksDeposit = subtasks;
    } else {
        unchangedContent = `currentContent2`;
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }

    editSubtaskOptions(x, indexOfSubtask, unchangedContent, subtasksDeposit);
}

function editSubtaskOptions(x, indexOfSubtask, unchangedContent, subtasksDeposit) {
    document.getElementById(`sub${indexOfSubtask}`).innerHTML = `
        <div class="editDiv">
            <input id="${unchangedContent}${[indexOfSubtask]}" value="${subtasksDeposit[indexOfSubtask]}">
            <string onclick="saveChangedSubtask(${x}, ${indexOfSubtask})" class="cursor">&#10003</string>
        </div>`;
}

function saveChangedSubtask(x, indexOfSubtask) {
    let changedContent = '';
    let subtasksDeposit = '';
    if (x == '1') {
        changedContent = `currentContent`;
        subtasksDeposit = subtasks;
    } else {
        changedContent = `currentContent2`;
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }
    let getChangedContent = document.getElementById(`${changedContent}${[indexOfSubtask]}`).value;
    subtasksDeposit[indexOfSubtask] = getChangedContent;
    displaySubtasks(x);
    checkIfInputOpen = '';
}

function deleteSubtask(x, indexOfSubtask) {
    if (x == '1') {
        subtasks.splice(indexOfSubtask, 1);
    } else {
        tasks[currentDisplayedTask]['subtasks'].splice(indexOfSubtask, 1);
        tasks[currentDisplayedTask]['subtasks-checkbox'].splice(indexOfSubtask, 1);
    }
    displaySubtasks(x);
}