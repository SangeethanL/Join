/*--------------------------------------------------------Feste Arrays--------------------------------------------------------*/
let tasks = [{
    'id': '',
    'progress': 'TODO',
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation.',
    'date': '2023-05-10',
    'priority': 'Medium',
    'contacts': [],
    'subtasks': ['Implement Recipe Recommendation', 'Start Page Layout'],
    'subtasks-checkbox': [true, false],
    'subtasks-true': []
},
{
    'id': '',
    'progress': 'INPROGRESS',
    'category': 'Technical Task',
    'title': 'HTML Base Template Creation',
    'description': 'Create reusable HTML base templates.',
    'date': '2023-07-19',
    'priority': 'Low',
    'contacts': [],
    'subtasks': [],
    'subtasks-checkbox': [],
    'subtasks-true': []
},
{
    'id': '',
    'progress': 'DONE',
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'date': '2023-09-02',
    'priority': 'Urgent',
    'contacts': [],
    'subtasks': ['Establish CSS Methodology', 'Setup Base Styles'],
    'subtasks-checkbox': [true, true],
    'subtasks-true': []
}];

let contacts = [{
    'first-name': 'Julia',
    'last-name': 'Meyer',
    'E-Mail': 'julia.meyer@outlook.de',
    'Phone': '+49123456789',
    'color': 'yellow'
},
{
    'first-name': 'Peter',
    'last-name': 'Friedmann',
    'E-Mail': 'peter.friedmannn@outlook.de',
    'Phone': '+49987654321',
    'color': 'green'
},
{
    'first-name': 'Max',
    'last-name': 'Mustermann',
    'E-Mail': 'max.mustermann@outlook.de',
    'Phone': '+49123498765',
    'color': 'blue'
},
{
    'first-name': 'Anna',
    'last-name': 'Wilhelm',
    'E-Mail': 'anna.wilhelm@outlook.de',
    'Phone': '+49123123123',
    'color': 'pink'
}];

getItem();

/*------------------------------------------------------Zwischen Arrays------------------------------------------------------*/

let priorityStatus = '';
let selectedContacts = [];
let subtasks = [];

let currentDraggedElement;
let currentDisplayedTask;

/*---------------------------------------------ID's festlegen----------------------------------------------*/
function declareIDs() {
    for (let d = 0; d < tasks.length; d++) {
        let id = [d];
        tasks[d]['id'] = id;
    }
}

/*-----------------------------------------------Task suchen------------------------------------------------*/

function searchTask() {
    let searchField = document.getElementById('searchInput').value;

    if (searchField == '') {
    } else {
        document.getElementById('searchResults').innerHTML = '';
        for (let s = 0; s < tasks.length; s++) {
            let task = tasks[s];
            if (task['title'].includes(searchField)) {
                document.getElementById('board').classList.add('display-none');
                document.getElementById('boardResponsive').style = "display: none;";
                document.getElementById('searchResults').innerHTML += showSearchedTask(task);
                document.getElementById('searchPicture').classList.add('display-none');
                document.getElementById('resetPicture').classList.remove('display-none');

                loadSubtasksProgressbarSEARCHEDTASK(task);
                showAmountOfFinishedSubtasksSEARCHEDTASK(task);
                displayContactIconsSEARCHEDTASK(task);
                displayPriorityImgSEARCHEDTASK(task);
            }
        }
    }
}

function showSearchedTask(eachTask) {
    return `
        <div onclick="openTaskInWindow(${eachTask['id']})" class="taskBox" style="margin-left: 5px; margin-right: 5px;">
            <h1 id="taskCategory">${eachTask['category']}</h1>
            <string class="taskTitle">${eachTask['title']}</string>
            <string class="taskDescription">${eachTask['description']}</string>
            <div id="taskSubtasks">
                <div class="taskSubtasksProgressbar">
                    <div id="subtasksProgressbarSEARCHED${eachTask['id']}" style="width: 0%;"></div>
                </div>
                <string id="numberOfSubtasksSEARCHED${eachTask['id']}" class="taskNumberOfSubtasks"></string>
            </div>
            <div class="taskEnd">
                <div id="taskContactsIconsSEARCHED${eachTask['id']}"></div>
                <img src id="taskPriorityIMGSEARCHED${eachTask['id']}">
            </div>
        </div>`;
}

function resetSearchedTask() {
    document.getElementById('searchResults').innerHTML = '';
    document.getElementById('board').classList.remove('display-none');
    document.getElementById('boardResponsive').style = "";
    cleanBoard();
    loadBoard();
    document.getElementById('searchPicture').classList.remove('display-none');
    document.getElementById('resetPicture').classList.add('display-none');
    document.getElementById('searchInput').value = '';
}

/*------------------------------------Board laden bzw. anzeigen lassen-------------------------------------*/

function loadBoard() {
    let toDo = document.getElementById('TODO');
    let inProgress = document.getElementById('INPROGRESS');
    let awaitFeedback = document.getElementById('AWAITFEEDBACK');
    let done = document.getElementById('DONE');

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (task['progress'].includes('TODO')) {
            toDo.innerHTML += displayTask(task);
            document.getElementById('TODOresponsive').innerHTML += displayTaskResponsive(task);
        }
        if (task['progress'].includes('INPROGRESS')) {
            inProgress.innerHTML += displayTask(task);
            document.getElementById('INPROGRESSresponsive').innerHTML += displayTaskResponsive(task);
        }
        if (task['progress'].includes('AWAITFEEDBACK')) {
            awaitFeedback.innerHTML += displayTask(task);
            document.getElementById('AWAITFEEDBACKresponsive').innerHTML += displayTaskResponsive(task);
        }
        if (task['progress'].includes('DONE')) {
            done.innerHTML += displayTask(task);
            document.getElementById('DONEresponsive').innerHTML += displayTaskResponsive(task);
        }

        loadSubtasksProgressbar(task);
        showAmountOfFinishedSubtasks(task);
        displayContactIcons(task);
        displayPriorityImg(task);
    }
}

function displayTask(eachTask) {
    return `
    <div draggable="true" ondragstart="startDragging(${eachTask['id']})" onclick="openTaskInWindow(${eachTask['id']})" class="taskCSS">
        <div class="taskBox">
            <h1 id="taskCategory">${eachTask['category']}</h1>
            <string class="taskTitle">${eachTask['title']}</string>
            <string class="taskDescription">${eachTask['description']}</string>
            <div id="taskSubtasks">
                <div class="taskSubtasksProgressbar">
                    <div id="subtasksProgressbar${eachTask['id']}" style="width: 0%;"></div>
                </div>
                <string id="numberOfSubtasks${eachTask['id']}" class="taskNumberOfSubtasks"></string>
            </div>
            <div class="taskEnd">
            <div id="taskContactsIcons${eachTask['id']}"></div>
                <img src id="taskPriorityIMG${eachTask['id']}">
            </div>
        </div>
    </div>`;
}

function displayTaskResponsive(eachTask) {
    return `
    <div draggable="true" ondragstart="startDragging(${eachTask['id']})" onclick="openTaskInWindow(${eachTask['id']})" class="taskCSS">
        <div class="taskBox">
            <h1 id="taskCategory">${eachTask['category']}</h1>
            <string class="taskTitle">${eachTask['title']}</string>
            <string class="taskDescription">${eachTask['description']}</string>
            <div id="taskSubtasks">
                <div class="taskSubtasksProgressbar">
                    <div id="subtasksProgressbarResponsive${eachTask['id']}" style="width: 0%;"></div>
                </div>
                <string id="numberOfSubtasksResponsive${eachTask['id']}" class="taskNumberOfSubtasks"></string>
            </div>
            <div class="taskEnd">
            <div id="taskContactsIconsResponsive${eachTask['id']}"></div>
                <img src id="taskPriorityIMGresponsive${eachTask['id']}">
            </div>
        </div>
    </div>`;
}

/*--------------------------Tasks Draggen und Droppen--------------------------*/

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    cleanBoard();
    loadBoard();
    setItem();
}

/*----------------------Subtasks Länge & Bilder anzeigen----------------------*/

function loadSubtasksProgressbar(eachTask) {
    let subtasksProgressbar = document.getElementById(`subtasksProgressbar${eachTask['id']}`);
    let subtasksProgressbarResponsive = document.getElementById(`subtasksProgressbarResponsive${eachTask['id']}`);
    eachTask['subtasks-true'] = [];
    for (t = 0; t < eachTask['subtasks-checkbox'].length; t++) {
        let checkIsTrue = eachTask['subtasks-checkbox'][t];
        if (checkIsTrue == true) {
            eachTask['subtasks-true'].push('->');
        }
        if (eachTask['subtasks-true'].length == 1) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 50%; height: 60%;";
            subtasksProgressbarResponsive.style = "background-color: #4589FF; border-radius: 5px; width: 50%; height: 60%;";
        }
        if (eachTask['subtasks-true'].length == 2) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 100%; height: 60%;";
            subtasksProgressbarResponsive.style = "background-color: #4589FF; border-radius: 5px; width: 100%; height: 60%;";
        }
    }
}

function showAmountOfFinishedSubtasks(eachTask) {
    let numberOfSubtasks = document.getElementById(`numberOfSubtasks${eachTask['id']}`);
    let numberOfSubtasksResponsive = document.getElementById(`numberOfSubtasksResponsive${eachTask['id']}`);
    if (eachTask['subtasks'][1]) {
        numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
        numberOfSubtasksResponsive.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
    } else {
        if (eachTask['subtasks'][0]) {
            numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
            numberOfSubtasksResponsive.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
        }
    }

}

function displayContactIcons(eachTask) {
    let contactIconsField = document.getElementById(`taskContactsIcons${eachTask['id']}`);
    let contactIconsFieldResponsive = document.getElementById(`taskContactsIconsResponsive${eachTask['id']}`);
    for (y = 0; y < eachTask['contacts'].length; y++) {
        let firstName = eachTask['contacts'][y]['first-name'].charAt(0).toUpperCase();
        let lastName = eachTask['contacts'][y]['last-name'].charAt(0).toUpperCase();
        let contactsBgColor = eachTask['contacts'][y]['color'];

        contactIconsField.style = "display: flex; flex-direction: row;";
        contactIconsField.innerHTML += `
            <div class="taskContactIcon" style="background-color: ${contactsBgColor};">
            ${firstName}${lastName}</div>`;

        contactIconsFieldResponsive.style = "display: flex; flex-direction: row;";
        contactIconsFieldResponsive.innerHTML += `
            <div class="taskContactIcon" style="background-color: ${contactsBgColor};">
            ${firstName}${lastName}</div>`;
    }
}

function displayPriorityImg(eachTask) {
    let priorityField = document.getElementById(`taskPriorityIMG${eachTask['id']}`);
    let priorityFieldResponsive = document.getElementById(`taskPriorityIMGresponsive${eachTask['id']}`);

    if (eachTask['priority'] == 'Urgent') {
        priorityField.src = 'add-task-img/prio-urgent.png';
        priorityFieldResponsive.src = 'add-task-img/prio-urgent.png';
    }

    if (eachTask['priority'] == 'Medium') {
        priorityField.src = 'add-task-img/prio-medium.png';
        priorityFieldResponsive.src = 'add-task-img/prio-medium.png';
    }

    if (eachTask['priority'] == 'Low') {
        priorityField.src = 'add-task-img/prio-low.png';
        priorityFieldResponsive.src = 'add-task-img/prio-low.png';
    }
}


/*--------------Subtasks Länge & Bilder anzeigen bei SEARCHED TASK--------------*/


function loadSubtasksProgressbarSEARCHEDTASK(eachTask) {
    let subtasksProgressbar = document.getElementById(`subtasksProgressbarSEARCHED${eachTask['id']}`);
    eachTask['subtasks-true'] = [];
    for (t = 0; t < eachTask['subtasks-checkbox'].length; t++) {
        let checkIsTrue = eachTask['subtasks-checkbox'][t];
        if (checkIsTrue == true) {
            eachTask['subtasks-true'].push('->');
        }
        if (eachTask['subtasks-true'].length == 1) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 50%; height: 60%;";
        }
        if (eachTask['subtasks-true'].length == 2) {
            subtasksProgressbar.style = "background-color: #4589FF; border-radius: 5px; width: 100%; height: 60%;";
        }
    }
}

function showAmountOfFinishedSubtasksSEARCHEDTASK(eachTask) {
    let numberOfSubtasks = document.getElementById(`numberOfSubtasksSEARCHED${eachTask['id']}`);
    if (eachTask['subtasks'][1]) {
        numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
    } else {
        if (eachTask['subtasks'][0]) {
            numberOfSubtasks.innerHTML = `${eachTask['subtasks-true'].length}/${eachTask['subtasks'].length} Subtasks`;
        }
    }

}

function displayContactIconsSEARCHEDTASK(eachTask) {
    let contactIconsField = document.getElementById(`taskContactsIconsSEARCHED${eachTask['id']}`);
    for (y = 0; y < eachTask['contacts'].length; y++) {
        let firstName = eachTask['contacts'][y]['first-name'].charAt(0).toUpperCase();
        let lastName = eachTask['contacts'][y]['last-name'].charAt(0).toUpperCase();
        let contactsBgColor = eachTask['contacts'][y]['color'];

        contactIconsField.style = "display: flex; flex-direction: row;";
        contactIconsField.innerHTML += `
            <div class="taskContactIcon" style="background-color: ${contactsBgColor};">
            ${firstName}${lastName}</div>`;
    }
}

function displayPriorityImgSEARCHEDTASK(eachTask) {
    let priorityField = document.getElementById(`taskPriorityIMGSEARCHED${eachTask['id']}`);

    if (eachTask['priority'] == 'Urgent') {
        priorityField.src = 'add-task-img/prio-urgent.png';
    }

    if (eachTask['priority'] == 'Medium') {
        priorityField.src = 'add-task-img/prio-medium.png';
    }

    if (eachTask['priority'] == 'Low') {
        priorityField.src = 'add-task-img/prio-low.png';
    }
}



/*--------------------------------Add Task Form öffnen bzw. anzeigen lassen--------------------------------*/

function addTaskForm(progress) {
    document.getElementById('addTaskBackground').style = "";
    document.getElementById('addTask').style = "";
    document.getElementById('addTask').classList.add('show_form1');
    document.getElementById('contacts').innerHTML = '';
    document.getElementById('contacts').innerHTML = `
    <option value="">Select Contact</option>`;

    /*-----Kontakte anzeigen lassen-----*/
    loadContactsForAddTask()

    /*-----Progresse anzeigen lassen-----*/
    progressNEUTRAL(progress);
    progressINPROGRESS(progress);
    progressAWAITFEEDBACK(progress)
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
        if (selectedContacts.length >= 3 && selectedContacts.includes(contacts[value])) {
            alert('Keine Kontaktauswahl mehr möglich!');
        }
        else {
            if (selectedContacts.length >= 3) {
                alert('Keine Kontaktauswahl mehr möglich!');
            } else {
                selectedContacts.push(contacts[value]);
                document.getElementById('displaySelectedContacts').innerHTML = '';
                for (c = 0; c < selectedContacts.length; c++) {
                    document.getElementById('displaySelectedContacts').innerHTML += `
                    ${selectedContacts[c]['first-name']} ${selectedContacts[c]['last-name']}`;
                }
            }
        }
    }
}

/*----------------Progresse in unterschiedlichen Varianten lade----------------*/

function progressNEUTRAL(progress) {
    if (progress == 'TODO') {
        document.getElementById('progress').innerHTML = `
            <option value="TODO">To do</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="AWAITFEEDBACK">Await Feedback</option>`;
    }
}

function progressINPROGRESS(progress) {
    if (progress == 'INPROGRESS') {
        document.getElementById('progress').innerHTML = `
            <option value="INPROGRESS">In Progress</option>
            <option value="TODO">To do</option>
            <option value="AWAITFEEDBACK">Await Feedback</option>`;
    }
}

function progressAWAITFEEDBACK(progress) {
    if (progress == 'AWAITFEEDBACK') {
        document.getElementById('progress').innerHTML = `
            <option value="AWAITFEEDBACK">Await Feedback</option>
            <option value="TODO">To do</option>
            <option value="INPROGRESS">In Progress</option>`;
    }
}


/*-----------------Priority Status zwischenspeichern in Array-----------------*/

function urgent() {
    priorityStatus = 'Urgent';
}

function medium() {
    priorityStatus = 'Medium';
}

function low() {
    priorityStatus = 'Low';
}

/*-----------------Eingegebenen Task erstellen bzw. submitten-----------------*/

function createTask() {
    let addTaskProgress = 'TODO';
    if (document.getElementById('progress')) { addTaskProgress = document.getElementById('progress').value };
    let addTaskCategory = document.getElementById('category').value;
    if (addTaskCategory == 'technical_task') { addTaskCategory = 'Technical Task'; } else { addTaskCategory = 'User Story'; }
    let addTaskTitle = document.getElementById('enterTitle').value;
    let addTaskDescription = document.getElementById('description').value;
    let addTaskDate = document.getElementById('date').value;
    if (priorityStatus == '') { priorityStatus = 'Low' };

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
    priorityStatus = '';
    selectedContacts = [];
    subtasks = [];
    document.getElementById('displaySubtasks').innerHTML = '';
    document.getElementById('displaySelectedContacts').innerHTML = '';
    if (window.location.pathname.endsWith('add_task.html')) {
        document.getElementById('addTaskForm').reset();
        window.location.href = 'board.html';
    }
    if (window.location.pathname.endsWith('board.html')) {
        document.getElementById('createTaskForm').reset();
        cleanBoard();
        loadBoard();
        closeTaskForm();
    }
    setItem();
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

    if (subtasksDeposit.length >= 2) {
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

    if (subtasksDeposit.length >= 2) {
    } else {
        subtasksDeposit.push(inputfield.value);
        inputfield.value = '';
    }
    displaySubtasks(x);
    enableInputButtons(x);
    checkIfInputOpen = '';
}

/*------------------------Subtasks anzeigen lassen------------------------*/

function displaySubtasks(x) {
    let displaySubtasks = '';
    let subtasksDeposit = '';
    let container = '';
    let textContainer = '';
    if (x == '1') {
        displaySubtasks = 'displaySubtasks';
        subtasksDeposit = subtasks;
        container = `containerX1`;
        textContainer = `textOfElement`;
    } else {
        displaySubtasks = 'displaySubtasks2';
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
        container = `containerX2`;
        textContainer = `textOfElement2`;
    }

    document.getElementById(`${displaySubtasks}`).innerHTML = '';
    for (let a = 0; a < subtasksDeposit.length; a++) {
        document.getElementById(`${displaySubtasks}`).innerHTML += `
            <div id="${container[a]}">
                <div id="onmouse${a}" onmouseover="displayEditDeleteButtons(${x}, ${a})" onclick="displayEditDeleteButtons(${x}, ${a})">
                    <string id="${textContainer[a]}" style="width: fit-content">
                    ${subtasksDeposit[a]}
                    </string>
                </div>
            </div>`;
    }
}

/*----------------------Subtasks bearbeiten/löschen----------------------*/


function displayEditDeleteButtons(x, indexOfSubtask) {
    let container = '';
    let subtasksDeposit = '';
    if (x == '1') {
        container = `container`;
        subtasksDeposit = subtasks;
    }
    else {
        container = `container2`;
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }

    if (checkIfInputOpen == 'yes') {
        document.getElementById(`onmouse${indexOfSubtask}`).addEventListener('mouseover', function (e) { e.stopPropagation() }, true);
    } else {
        document.getElementById(`${container[indexOfSubtask]}`).innerHTML = `
            <div id="editDeleteButtons" onmouseleave="displaySubtasks(${x})" style="display: flex; flex-direction: row;">
                <string>${subtasksDeposit[indexOfSubtask]}</string>
                <div>
                    <string onclick="editSubtask(${x}, ${indexOfSubtask})"> &#9998 </string> 
                    <string onclick="deleteSubtask(${x}, ${indexOfSubtask})"> &#x1F5D1 <string>
                </div>
            </div>`;
    }
}

function editSubtask(x, indexOfSubtask) {
    checkIfInputOpen = 'yes';
    let container = '';
    let editContainer = '';
    let unchangedContent = '';
    let subtasksDeposit = '';

    if (x == '1') {
        container = `container`;
        editContainer = `editContainer`;
        unchangedContent = `currentContent`;
        subtasksDeposit = subtasks;
    } else {
        container = `container2`;
        editContainer = `editContainer2`;
        unchangedContent = `currentContent2`;
        subtasksDeposit = tasks[currentDisplayedTask]['subtasks'];
    }

    document.getElementById(`${container[indexOfSubtask]}`).innerHTML = `
        <div id="${editContainer[indexOfSubtask]}" class="editDiv">
            <input id="${unchangedContent}${[indexOfSubtask]}" value="${subtasksDeposit[indexOfSubtask]}" style="width: 50%;">
            <string onclick="saveChangedSubtask(${x}, ${indexOfSubtask})">&#10003</string>
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
            <input type="checkbox" id="check${p}" onclick="checkbox(${p})"> ${tasks[currentDisplayedTask]['subtasks'][p]}
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
    document.getElementById('delete').classList.remove('display-none');
    document.getElementById('title2').innerHTML = `<div class="space">
    <string class="elementStyling">Title</string>
    <input id="titleEdited" value="${tasks[currentDisplayedTask]['title']}"></div>`;
    document.getElementById('description2').innerHTML = `<div class="space">
    <string class="elementStyling">Description</string>
    <input id="descriptionEdited" value="${tasks[currentDisplayedTask]['description']}"></div>`;
    document.getElementById('date2').innerHTML = `<input id="dateEdited" type="date" value="${tasks[currentDisplayedTask]['date']}">`;
    document.getElementById('priority2').innerHTML = `
    <button onclick="urgent()">Urgent</button>
    <button onclick="medium()">Medium</button>
    <button onclick="low()">Low</button>`;
    editContacts();
    editSubtasks002();
    displaySubtasks('2');
    document.getElementById('Edit-Save').innerHTML = `<string onclick="saveTask()">Save</string>`;
}

function editSubtasks002() {
    document.getElementById('container3').innerHTML = '';
    document.getElementById('container3').innerHTML = `
    <input id="inputNewSubtask2" oninput="enableInputButtons('2')">
    <div id="hiddenButtons2" style="display:none;">
        <string onclick="submitSubtask('2')">&#10003</string>
        <string onclick="cleanInputField('2')">&#x1F5D1</string>
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

    tasks[currentDisplayedTask]['title'] = editedTitle;
    tasks[currentDisplayedTask]['description'] = editedDescription;
    tasks[currentDisplayedTask]['date'] = editedDate;
    tasks[currentDisplayedTask]['priority'] = priorityStatus || tasks[currentDisplayedTask]['priority'];
    openTaskInWindow(currentDisplayedTask);
    document.getElementById('delete').classList.add('display-none');
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








function setItem() {
    let tasksToText = JSON.stringify(tasks);
    localStorage.setItem('tasksStorage', tasksToText);

    let contactsToText = JSON.stringify(contacts);
    localStorage.setItem('contactsStorage', contactsToText);

    let unchangedContactToText = JSON.stringify(unchangedContact);
    localStorage.setItem('unchangedContactStorage', unchangedContactToText);
}

function getItem() {
    let tasksToArray = localStorage.getItem('tasksStorage');
    if (tasksToArray) {
        tasks = JSON.parse(tasksToArray);
    }

    let contactsToArray = localStorage.getItem('contactsStorage');
    if (contactsToArray) {
        contacts = JSON.parse(contactsToArray);
    }

    let unchangedContactToArray = localStorage.getItem('unchangedContactStorage');
    if (unchangedContactToArray) {
        unchangedContact = JSON.parse(unchangedContactToArray);
    }
}

/*-------------------------------IncludeHTML-------------------------------*/

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

async function init() {
    await includeHTML();
    declareIDs();
}