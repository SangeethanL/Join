/*------------------------------------------------------Zwischen Arrays------------------------------------------------------*/

let progress;
let priority;
let selectedContacts = [];
let subtasks = [];

let displayingTask;

/*--------------------------------Add Task Form öffnen bzw. anzeigen lassen--------------------------------*/

function addTaskForm(selectedProgress) {
    if (window.screen.width < 850) {
        window.location.href = 'add_task.html';
    } else {
        document.getElementById('addTaskScreen').style = "";
        document.getElementById('addTask').classList.add('show_addTaskForm');
        progress = selectedProgress;
        document.getElementById('newContacts').innerHTML = '';
        document.getElementById('newContacts').innerHTML = `
        <option value="">Select Contact</option>`;

        /*-----Kontakte anzeigen lassen-----*/
        loadContacts();
    }
}

function disablePastDates() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('newDate').setAttribute("min", today);
}

/*------------------------Kontakte im Add Task Form Laden------------------------*/
async function loadContacts() {
    document.getElementById('newContacts').innerHTML = '';
    document.getElementById('newContacts').innerHTML += `<option value=''>Select contacts</option>`;
    for (let j = 0; j < contacts.length; j++) {
        const contactIndex = [j];
        const contact = contacts[j]
        document.getElementById('newContacts').innerHTML += `
            <option value="${contactIndex}">${contact['first-name']} ${contact['last-name']}</option>`;
    }
}
/*--------------------Ausgewählte Kontakte zwischenspeichern--------------------*/

function saveContact(value) {
    let deleteContact = null;
    let indexDeleteContact = '';
    for (let s = 0; s < selectedContacts.length; s++) {
        let selectedContact = selectedContacts[s];
        if (selectedContact['first-name'] == contacts[value]['first-name']) {
            deleteContact = true;
            indexDeleteContact = s;
        }
    }
    checkPick(value, deleteContact, indexDeleteContact);
}

function checkPick(value, deleteContact, indexDeleteContact) {
    if (value == '') {
    }
    else if (deleteContact == true) {
        selectedContacts.splice(indexDeleteContact, 1);
        refreshSelectedContactsList();
    }
    else {
        cacheContact(value);
    }
}

function cacheContact(value) {
    selectedContacts.push(contacts[value]);
    refreshSelectedContactsList();
}

function refreshSelectedContactsList() {
    document.getElementById('showNewContacts').innerHTML = '';
    for (c = 0; c < selectedContacts.length; c++) {
        document.getElementById('showNewContacts').innerHTML += `
        <string style="background-color:${selectedContacts[c]['color']};" onclick="deleteSelectedContact(${c});">
            ${selectedContacts[c]['first-name'].charAt(0)}${selectedContacts[c]['last-name'].charAt(0)}
        </string>`;
    }
    if (document.getElementById('showNewContacts').innerHTML == '') {
        document.getElementById('showNewContacts').style = "height: unset;";
    } else {
        document.getElementById('showNewContacts').style = "height: 55px;";
    }
    loadContacts();
}

function deleteSelectedContact(indexOfSelectedContact) {
    selectedContacts.splice(indexOfSelectedContact, 1);
    refreshSelectedContactsList();
}

/*-----------------Eingegebenen Task erstellen bzw. submitten-----------------*/

async function createTask() {
    await createValues();

    priority = null;
    selectedContacts = [];
    subtasks = [];
    document.getElementById('showNewSubtasks').innerHTML = '';
    document.getElementById('showNewContacts').innerHTML = '';
    resetActiveButton();
    resetForms();
}

async function createValues() {
    if (progress == null) { progress = 'TODO' };
    let category = document.getElementById('newCategory').value;

    if (category == 'technical_task') {
        category = 'Technical Task';
    } else {
        category = 'User Story';
    }
    if (priority == null) {
        priority = 'Medium';
    };

    await createNewTaskID(progress, category, priority);
}

async function createNewTaskID(progress, category, priority) {
    let newID;
    tasksIdLength = [];
    for (let c = 0; c < tasks.length; c++) {
        let taskID = tasks[c]['id'];
        tasksIdLength.push(taskID);
    }
    if (tasks.length >= 1) {
        tasksIdLength = tasksIdLength.sort(function (a, b) { return a - b; });
        let highestTaskID = Math.max(...tasksIdLength);
        newID = highestTaskID + 1;
    } else {
        newID = tasks.length + 1;
    }
    await pushValuesForNewTask(newID, progress, category, priority);
}

async function pushValuesForNewTask(newID, progress, category, priority) {
    tasks.push({
        'id': newID,
        'progress': `${progress}`,
        'category': `${category}`,
        'title': `${document.getElementById('newTitle').value}`,
        'description': `${document.getElementById('newDescription').value}`,
        'date': `${document.getElementById('newDate').value}`,
        'priority': `${priority}`,
        'contacts': selectedContacts,
        'subtasks': subtasks,
        'true-checkboxes': []
    });
    await saveNewTask(newID);
}

async function saveNewTask(newID) {
    await setItem();
    let newTask = tasks.length - 1;
    if (currentUser[0]) {
        await addTask_firebase(currentUser[0]['email'], newID, tasks[newTask]);
    }
}

function resetForms() {
    if (window.location.pathname.endsWith('add_task.html')) {
        document.getElementById('taskForm').reset();
        window.location.href = 'board.html';
    }
    if (window.location.pathname.endsWith('board.html')) {
        document.getElementById('addTaskForm').reset();
        cleanBoard();
        loadBoard();
        closeTaskForm();
    }
}

/*--------------------------Add Task Form schließen--------------------------*/

function closeTaskForm() {
    resetAddTaskBoard();
    document.getElementById('addTaskScreen').style = "display: none;";
    document.getElementById('addTask').classList.remove('show_addTaskForm');
}


/*----------------------------------Submit Subtasks Buttons und Funktion----------------------------------*/
let input;
let buttons;
let subtasksDeposit;
let isSubtaskEditting;
/*------------Subtasks Buttons autmatisch anzeigen und ausblenden------------*/

function enableButtons(x) {
    if (x == '1') {
        input = document.getElementById('newSubtask');
        buttons = document.getElementById('newSubtaskButtons');
        subtasksDeposit = subtasks;
    } else {
        input = document.getElementById('newSubtask_EditTask');
        buttons = document.getElementById('newSubtaskButtons_EditTask');
        subtasksDeposit = tasks[displayingTask]['subtasks'];
    }

    optionsForEnable(input, buttons, subtasksDeposit);
}

function optionsForEnable(input, buttons, subtasksDeposit) {
    if (subtasksDeposit.length >= 15) {
        buttons.classList.remove('addVisibility');
    }
    else if (input.value) {
        buttons.classList.add('addVisibility');
    } else {
        buttons.classList.remove('addVisibility');
    }
}

function cleanInputField(x) {
    if (x == '1') {
        input = document.getElementById('newSubtask');
    } else {
        input = document.getElementById('newSubtask_EditTask');
    }
    input.value = '';
    enableButtons(x);
}
/*-------------------Subtasks zwischenspeichern in Array-------------------*/

function submitSubtask(x) {
    if (x == '1') {
        input = document.getElementById('newSubtask');
        subtasksDeposit = subtasks;
    } else {
        input = document.getElementById('newSubtask_EditTask');
        subtasksDeposit = tasks[displayingTask]['subtasks'];
    }

    pushSubtasks(input, subtasksDeposit);

    displaySubtasks(x);
    enableButtons(x);
    isSubtaskEditting = null;
}

function pushSubtasks(input, subtasksDeposit) {
    if (subtasksDeposit.length >= 15) {
    } else {
        subtasksDeposit.push({ 'subtask': input.value, 'checkbox': false });
        input.value = '';
    }
}

/*------------------------Subtasks anzeigen lassen------------------------*/

function displaySubtasks(x) {
    let displaySubtasks_Container;
    if (x == '1') {
        displaySubtasks_Container = 'showNewSubtasks';
        subtasksDeposit = subtasks;
    } else {
        displaySubtasks_Container = 'showSubtasks';
        subtasksDeposit = tasks[displayingTask]['subtasks'];
    }

    loadSubtasks(x, displaySubtasks_Container, subtasksDeposit);
}

function loadSubtasks(x, displaySubtasks_Container, subtasksDeposit) {
    document.getElementById(`${displaySubtasks_Container}`).innerHTML = '';
    for (let a = 0; a < subtasksDeposit.length; a++) {
        document.getElementById(`${displaySubtasks_Container}`).innerHTML += `
            <div id="listedSubtask${a}" onclick="showButtons(${x},${a});">
                <div class="showSubtaskWithButtons">
                    <div><string>&#x2022;</string> <string>${subtasksDeposit[a]['subtask']}</string></div>
                    <div id="showSubtaskButtons_buttons${a}" class="showSubtaskButtons_buttons">
                        <string onclick="editSubtask(${x}, ${a})" class="cursor"> &#9998 </string> 
                        <string onclick="deleteSubtask(${x}, ${a})" class="cursor"> &#x1F5D1 </string>
                    </div>
                </div>
            </div>`;
    }
}

/*----------------------Subtasks bearbeiten/löschen----------------------*/


function showButtons(x, indexOfSubtask) {
    let showSubtaskButtonsContainer = document.getElementById(`showSubtaskButtons_buttons${indexOfSubtask}`);

    if (window.screen.width < 1300) {
        if (showSubtaskButtonsContainer.classList.contains('showSubtaskButtons_buttons')) {
            showSubtaskButtonsContainer.classList.remove('showSubtaskButtons_buttons');
            showSubtaskButtonsContainer.classList.add('showSubtaskButtons_buttons_responsive');
        }
        else {
            showSubtaskButtonsContainer.classList.add('showSubtaskButtons_buttons');
            showSubtaskButtonsContainer.classList.remove('showSubtaskButtons_buttons_responsive');
        }
    }
}

function editSubtask(x, indexOfSubtask) {
    isSubtaskEditting = true;

    if (x == '1') {
        input = `edittingNewSubtask`;
        subtasksDeposit = subtasks;
    } else {
        input = `edittingSubtask`;
        subtasksDeposit = tasks[displayingTask]['subtasks'];
    }

    activateEditContainer(x, indexOfSubtask, input, subtasksDeposit);
}

function activateEditContainer(x, indexOfSubtask, input, subtasksDeposit) {
    document.getElementById(`listedSubtask${indexOfSubtask}`).innerHTML = `
        <div class="editSubtask">
            <input id="${input}${[indexOfSubtask]}" value="${subtasksDeposit[indexOfSubtask]['subtask']}">
            <string onclick="saveSubtask(${x}, ${indexOfSubtask})" class="cursor">&#10003</string>
        </div>`;
}

function saveSubtask(x, indexOfSubtask) {
    let getChanges;
    if (x == '1') {
        input = `edittingNewSubtask`;
        subtasksDeposit = subtasks;
    } else {
        input = `edittingSubtask`;
        subtasksDeposit = tasks[displayingTask]['subtasks'];
    }
    getChanges = document.getElementById(`${input}${[indexOfSubtask]}`);
    saveChangedSubtask(getChanges, x, indexOfSubtask);
}

function saveChangedSubtask(inputID, x, indexOfSubtask) {
    if (inputID.value == '') {
        deleteSubtask(x, indexOfSubtask);
        displaySubtasks(x);
        isSubtaskEditting = null;
    } else {
        subtasksDeposit[indexOfSubtask]['subtask'] = inputID.value;
        displaySubtasks(x);
        isSubtaskEditting = null;
    }
}

function deleteSubtask(x, indexOfSubtask) {
    if (x == '1') {
        subtasks.splice(indexOfSubtask, 1);
    } else {
        tasks[displayingTask]['subtasks'].splice(indexOfSubtask, 1);
    }
    displaySubtasks(x);
}


