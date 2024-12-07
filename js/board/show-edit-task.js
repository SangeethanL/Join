let editedProgress_Responsive;

/*-------------------------------Show Task Fenster öffnen bzw. anzeigen lassen-------------------------------*/

function openTask(task) {
    displayingTask = task;
    taskOpened = true;
    document.getElementById('showTaskScreen').style = "";
    document.getElementById('showTask').classList.add('show_showTaskFrom');
    categoryBackgroundColor();
    loadDatas();
    document.getElementById('edit_delete_Buttons').classList.remove('display-none');
    document.getElementById('save_Button').classList.add('display-none');
}

function categoryBackgroundColor() {
    if (tasks[displayingTask]['category'] == 'Technical Task') {
        document.getElementById('showTaskPlaceholder').innerHTML = `
        <div class="technical_bgColor">${tasks[displayingTask]['category']}</div>`;
    }
    else if (tasks[displayingTask]['category'] == 'User Story') {
        document.getElementById('showTaskPlaceholder').innerHTML = `
        <div class="user_bgColor">${tasks[displayingTask]['category']}</div>`;
    }
}

function loadDatas() {
    document.getElementById('showTitleContainer').innerHTML = `${tasks[displayingTask]['title']}`;
    document.getElementById('showDescriptionContainer').innerHTML = `${tasks[displayingTask]['description']}`;
    document.getElementById('showDate').innerHTML = `${tasks[displayingTask]['date']}`;
    showPriorityStatus();
    showContacts();
    showSubtasks(tasks[displayingTask]['subtasks']);
}

function showPriorityStatus() {
    let priorityOfTask = tasks[displayingTask]['priority'];
    let showPriorityContainer = document.getElementById('showPriority');

    if (priorityOfTask == 'Low') {
        showPriorityContainer.innerHTML = `<string>${priorityOfTask}</string> <img src="assets/img/Prio_baja.png">`;
    }
    else if (priorityOfTask == 'Medium') {
        showPriorityContainer.innerHTML = `<string>${priorityOfTask}</string> <img src="assets/img/Prio_media.png">`;
    }
    else if (priorityOfTask == 'Urgent') {
        showPriorityContainer.innerHTML = `<string>${priorityOfTask}</string> <img src="assets/img/Prio_alta.png">`;
    }
}

function showContacts() {
    document.getElementById('showContacts').innerHTML = '';
    if (tasks[displayingTask]['contacts'].length == 0) {
        document.getElementById('showContacts').innerHTML = 'No Contacts assigned';
    } else {
        for (c = 0; c < tasks[displayingTask]['contacts'].length; c++) {
            let assignedContact = tasks[displayingTask]['contacts'][c];
            document.getElementById('showContacts').innerHTML += `
            <div class="showContacts">
                <string style="background-color:${assignedContact['color']};">
                ${assignedContact['first-name'].charAt(0)}${assignedContact['last-name'].charAt(0)}
                </string>
                <div>${assignedContact['first-name']} ${assignedContact['last-name']}
                </div>
            </div>`;
        }
    }
}

function showSubtasks(subtasksArray) {
    document.getElementById('showSubtasksContainer').innerHTML = '';
    document.getElementById('showSubtasksContainer').innerHTML = `
    <string class="titleColor">Subtasks:</string>
    <div id="subtasks_showTask"></div>`;
    if (subtasksArray.length == 0) {
        document.getElementById('subtasks_showTask').innerHTML = 'No Subtasks';
    } else {
        insertSubtasks(subtasksArray);
    }
}

function insertSubtasks(subtasksArray) {
    for (p = 0; p < subtasksArray.length; p++) {
        document.getElementById('subtasks_showTask').innerHTML += `
        <div>
            <img src="assets/img/unchecked.png" id="checkbox${p}" onclick="check_box(${p})"><label>${subtasksArray[p]['subtask']}</label>
        </div>`;

        if (subtasksArray[p]['checkbox'] == true) {
            document.getElementById(`checkbox${p}`).src = "assets/img/checked.png";
        }
    }
}

function check_box(indexOfSubtask) {
    let id = indexOfSubtask;
    let checkbox = tasks[displayingTask]['subtasks'][id]['checkbox'];
    let checkImage = document.getElementById(`checkbox${id}`);
    if (checkbox == true) {
        tasks[displayingTask]['subtasks'][id]['checkbox'] = false;
        checkImage.src = "assets/img/unchecked.png";
    }
    else if (checkbox == false) {
        tasks[displayingTask]['subtasks'][id]['checkbox'] = true;
        checkImage.src = "assets/img/checked.png";
    }
}

function editTask() {
    activateProgresskButtons();
    document.getElementById('edit_delete_Buttons').classList.add('display-none');
    document.getElementById('save_Button').classList.remove('display-none');
    loadEditableContent();
    editTaskSettings();
}

function editTaskSettings() {
    document.getElementById('showTitleContainer').classList.remove('showTitle');
    document.getElementById('showDateContainer').classList.remove('show_Date_Priority_Container');
    document.getElementById('showPriorityContainer').classList.remove('show_Date_Priority_Container');
    document.getElementById('showPriorityContainer').classList.remove('show_Date_Priority_Container');

    document.getElementById('showTitleContainer').classList.add('container_to_editTask');
    document.getElementById('showDescriptionContainer').classList.add('container_to_editTask');
    document.getElementById('showDateContainer').classList.add('container_to_editTask');
    document.getElementById('showPriorityContainer').classList.add('container_to_editTask');
    document.getElementById('showContactsContainer').classList.add('container_to_editTask');
    document.getElementById('showSubtasksContainer').classList.add('container_to_editTask');
}

function loadEditableContent() {
    loadEditableTitleSection('showTitleContainer', 'Title', 'editedTitle', tasks[displayingTask]['title']);
    loadEditableTitleSection('showDescriptionContainer', 'Description', 'editedDescription', tasks[displayingTask]['description']);
    loadEditableDate();
    loadEditablePriority();
    loadEditableContacts();
    loadEditableSubtasks();
}

function loadEditableTitleSection(container, title, inputID, value) {
    document.getElementById(container).innerHTML = `
        <string class="titleColor">${title}:</string>
        <input id=${inputID} value="${value}">`;
}

function loadEditableDate() {
    document.getElementById('showDate').innerHTML = `<input id="editedDate" type="date" value="${tasks[displayingTask]['date']}">`;
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('editedDate').setAttribute("min", today);
}

function loadEditablePriority() {
    document.getElementById('showPriority').innerHTML = `
        <button onclick="urgent_prio();" id="edit_urgent" class="prio-edit">
            <span>Urgent</span>
            <img id="edit_urgent-black" src="assets/img/Prio_alta.png">
            <img id="edit_urgent-white" class="d-none" src="assets/img/Prio_alta_white.png">
        </button>
        <button onclick="medium_prio();" id="edit_medium" class="prio-edit">
            <span>Medium</span>
            <img id="edit_medium-black" src="assets/img/Prio_media.png">
            <img id="edit_medium-white" class="d-none" src="assets/img/Prio_media_white.png">
        </button>
        <button onclick="low_prio();" id="edit_low" class="prio-edit">
            <span>Low</span>
            <img id="edit_low-black" src="assets/img/Prio_baja.png">
            <img id="edit_low-white" class="d-none" src="assets/img/Prio_baja_white.png">
        </button>`;
}

function loadEditableContacts() {
    document.getElementById('showContacts').innerHTML = '';
    document.getElementById('showContacts').innerHTML = `
        <select id="selectableContactsMenu" onchange="addToTaskContacts(this.value)">
            <option value="">Select Contact</option>
        </select>
        <div id="showContacts_EditTask"></div>`;

    showSelectedContacts();
    menuSelectableContacts();
    loadContactsIntoMenu();
}

function showSelectedContacts() {
    for (e = 0; e < tasks[displayingTask]['contacts'].length; e++) {
        let currentContact = tasks[displayingTask]['contacts'][e];
        document.getElementById('showContacts_EditTask').innerHTML += `
        <string style="background-color:${currentContact['color']};" onclick="deleteEditableContact(${[e]})">
            ${currentContact['first-name'].charAt(0)}${currentContact['last-name'].charAt(0)}
        </string>`;
    }
}

function deleteEditableContact(indexOfContact) {
    selectableContacts.push(tasks[displayingTask]['contacts'][indexOfContact]);
    tasks[displayingTask]['contacts'].splice(indexOfContact, 1);
    loadEditableContacts();
}

function menuSelectableContacts() {
    selectableContacts = [];
    for (r = 0; r < contacts.length; r++) {
        let contact = contacts[r];
        selectableContacts.push(contact);
        for (e = 0; e < tasks[displayingTask]['contacts'].length; e++) {
            let taskContact = tasks[displayingTask]['contacts'][e];
            if (contact['first-name'] == taskContact['first-name']) {
                let match = selectableContacts.indexOf(contact);
                selectableContacts.splice(match, 1)
            }
        }
    }
}

function loadContactsIntoMenu() {
    for (t = 0; t < selectableContacts.length; t++) {
        let menuContact = selectableContacts[t];
        document.getElementById('selectableContactsMenu').innerHTML += `
        <option value="${t}">${menuContact['first-name']} ${menuContact['last-name']}</option>`;
    }
}
function addToTaskContacts(contact) {
    tasks[displayingTask]['contacts'].push(selectableContacts[contact]);
    loadEditableContacts();
}

function loadEditableSubtasks() {
    document.getElementById('showSubtasksContainer').innerHTML = '';
    document.getElementById('showSubtasksContainer').innerHTML = `
    <string class="titleColor">Subtasks:</string>
    <div id="newSubtaskContainer_EditTask">
        <input id="newSubtask_EditTask" oninput="enableButtons('2')">
        <div id="newSubtaskButtons_EditTask" class="newSubtaskButtons_EditTask">
            <string onclick="submitSubtask('2')" style="margin-right: 5px;">&#10003</string>
            <string onclick="cleanInputField('2')">&#x1F5D1</string>
        </div>
    </div>
    <div id="showSubtasks">
    </div>`;
    displaySubtasks('2');
}

function leave_editTaskSettings() {
    document.getElementById('showTitleContainer').classList.add('showTitle');
    document.getElementById('showDateContainer').classList.add('show_Date_Priority_Container');
    document.getElementById('showPriorityContainer').classList.add('show_Date_Priority_Container');

    document.getElementById('showTitleContainer').classList.remove('container_to_editTask');
    document.getElementById('showDescriptionContainer').classList.remove('container_to_editTask');
    document.getElementById('showDateContainer').classList.remove('container_to_editTask');
    document.getElementById('showPriorityContainer').classList.remove('container_to_editTask');
    resetActiveButton();
    document.getElementById('showContactsContainer').classList.remove('container_to_editTask');
    document.getElementById('showSubtasksContainer').classList.remove('container_to_editTask');
}

async function saveEditedTask() {
    await saveEditedContent();
    leave_editTaskSettings();
    await setItem();
    if (currentUser[0]) {
        await updateTask_firebase(currentUser[0]['email'], `${tasks[displayingTask]['id']}`, tasks[displayingTask]);
    }
    document.getElementById('showDate').style = "";
    document.getElementById('save_Button').classList.add('display-none');
    openTask(displayingTask);
    cleanBoard();
    loadBoard();
}

async function saveEditedContent() {
    let editedTitle = document.getElementById('editedTitle').value;
    let editedDescription = document.getElementById('editedDescription').value;
    let editedDate = document.getElementById('editedDate').value;
    if (editedProgress_Responsive == null) { }
    else { tasks[displayingTask]['progress'] = editedProgress_Responsive; editedProgress_Responsive = null; }
    tasks[displayingTask]['title'] = editedTitle;
    tasks[displayingTask]['description'] = editedDescription;
    tasks[displayingTask]['date'] = editedDate;
    if (priority == null) { }
    else { tasks[displayingTask]['priority'] = priority; priority == null; }
}

async function closeShowTask() {
    await setItem();
    if (currentUser[0] && tasks[displayingTask]) {
        await updateTask_firebase(currentUser[0]['email'], `${tasks[displayingTask]['id']}`, tasks[displayingTask]);
    }
    leave_editTaskSettings();
    taskOpened = false;
    isSubtaskEditting = null;
    document.getElementById('showContacts').innerHTML = '';
    document.getElementById('showTask').classList.remove('show_showTaskFrom');
    document.getElementById('showTaskScreen').style = "display: none;";
    cleanBoard();
    loadBoard();
    if (document.getElementById('board').classList == 'display-none') {
        searchTask();
    }
}

async function deleteTask() {
    document.getElementById('body_board').style = "pointer-events: none;";
    if (currentUser[0]) {
        await deleteTask_firebase(currentUser[0]['email'], `${tasks[displayingTask]['id']}`);
    }
    tasks.splice(displayingTask, 1);
    closeShowTask();
    document.getElementById('body_board').style = "";
    await setItem();
}








function activateProgresskButtons() {
    if (window.screen.width <= 850) {
        document.getElementById('showTaskPlaceholder').innerHTML = '';
        document.getElementById('showTaskPlaceholder').innerHTML = `
            <div class="placeholder_moveTask">
                <string>Move Task</string>
                <div id="destinationButtons" class="destinationButtons">
                </div>
            </div>`;
        loadProgressButtons();
    }
}

let btnToDo = `<button onclick="executeChange('TODO','btn1')" id="btn1">To do</button>`;
let btnInProgress = `<button onclick="executeChange('INPROGRESS','btn2')" id="btn2">In progress</button>`;
let btnAwaitFeedback = `<button onclick="executeChange('AWAITFEEDBACK','btn3')" id="btn3">Await feedback</button>`;
let btnDone = `<button onclick="executeChange('DONE','btn4')" id="btn4">Done</button>`;

function loadProgressButtons() {
    insertButtons('TODO', btnInProgress, btnAwaitFeedback, btnDone);
    insertButtons('INPROGRESS', btnToDo, btnAwaitFeedback, btnDone);
    insertButtons('AWAITFEEDBACK', btnToDo, btnInProgress, btnDone);
    insertButtons('DONE', btnToDo, btnInProgress, btnAwaitFeedback);
}

function insertButtons(progress, btn1, btn2, btn3) {
    if (tasks[displayingTask]['progress'] == progress) {
        document.getElementById('destinationButtons').innerHTML += btn1;
        document.getElementById('destinationButtons').innerHTML += btn2;
        document.getElementById('destinationButtons').innerHTML += btn3;
    }
}

function executeChange(change, id) {
    if (change == 'TODO') {
        editedProgress_Responsive = 'TODO';
    }
    if (change == 'INPROGRESS') {
        editedProgress_Responsive = 'INPROGRESS';
    }
    if (change == 'AWAITFEEDBACK') {
        editedProgress_Responsive = 'AWAITFEEDBACK';
    }
    if (change == 'DONE') {
        editedProgress_Responsive = 'DONE';
    }
    resetProgressButtons();
    document.getElementById(`${id}`).style = "background-color: rgba(57, 243, 110, 0.599);";
}

function resetProgressButtons() {
    for (let t = 1; t < 5; t++) {
        if (document.getElementById(`btn${t}`)) {
            document.getElementById(`btn${t}`).style = "background-color: rgba(57, 178, 243, 0.12);";
        }
    }
}