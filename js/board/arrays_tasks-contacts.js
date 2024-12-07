/*--------------------------------------------------------Feste Arrays--------------------------------------------------------*/
let tasks = [{
    'id': '1',
    'progress': 'TODO',
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation.',
    'date': '2023-05-10',
    'priority': 'Medium',
    'contacts': [],
    'subtasks': [{
        'subtask': 'Implement Recipe Recommendation',
        'checkbox': true
    }, {
        'subtask': 'Start Page Layout',
        'checkbox': false
    }, {
        'subtask': 'Define Functions',
        'checkbox': true
    }],
    'true-checkboxes': []
},
{
    'id': '2',
    'progress': 'INPROGRESS',
    'category': 'Technical Task',
    'title': 'HTML Base Template Creation',
    'description': 'Create reusable HTML base templates.',
    'date': '2023-07-19',
    'priority': 'Low',
    'contacts': [],
    'subtasks': [],
    'true-checkboxes': []
},
{
    'id': '3',
    'progress': 'DONE',
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'date': '2023-09-02',
    'priority': 'Urgent',
    'contacts': [],
    'subtasks': [{
        'subtask': 'Establish CSS Methodology',
        'checkbox': true
    }, {
        'subtask': 'Setup Base Styles',
        'checkbox': false
    }],
    'true-checkboxes': []
}];

let contacts = [{
    'id': '1',
    'first-name': 'Julia',
    'last-name': 'Meyer',
    'E-Mail': 'julia.meyer@outlook.de',
    'Phone': '+49123456789',
    'color': 'yellow'
},
{
    'id': '2',
    'first-name': 'Peter',
    'last-name': 'Friedmann',
    'E-Mail': 'peter.friedmannn@outlook.de',
    'Phone': '+49987654321',
    'color': 'green'
},
{
    'id': '3',
    'first-name': 'Max',
    'last-name': 'Mustermann',
    'E-Mail': 'max.mustermann@outlook.de',
    'Phone': '+49123498765',
    'color': 'blue'
},
{
    'id': '4',
    'first-name': 'Anna',
    'last-name': 'Wilhelm',
    'E-Mail': 'anna.wilhelm@outlook.de',
    'Phone': '+49123123123',
    'color': 'pink'
}];

let contactsIDs = [];
let tasksIdLength = [];




let toDos = [];
let dones = [];
let inProgresses = [];
let awaitFeedbacks = [];
let urgents = [];

async function getProgressesLength() {
    toDos = [];
    dones = [];
    inProgresses = [];
    awaitFeedbacks = [];
    for (let p = 0; p < tasks.length; p++) {
        let taskProgress = tasks[p]['progress'];
        if (taskProgress == 'TODO') {
            toDos.push(true);
        } else if (taskProgress == 'DONE') {
            dones.push(true);
        } else if (taskProgress == 'INPROGRESS') {
            inProgresses.push(true);
        } else if (taskProgress == 'AWAITFEEDBACK') {
            awaitFeedbacks.push(true);
        }
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
    await getItem();
    await includeHTML();
    if(!window.location.pathname.endsWith('index.html')) {
        setIconChars();
    }
    if (window.location.pathname.endsWith('summary.html')) {
        showGreeting();
        await getProgressesLength();
        loadSummary();
    } else if (window.location.pathname.endsWith('add_task.html')) {
        disablePastDates();
    } else if (window.location.pathname.endsWith('board.html')) {
        loadBoard();
        disablePastDates();
    }

}




async function setItem() {
    let tasksToText = JSON.stringify(tasks);
    localStorage.setItem('tasksStorage', tasksToText);

    let contactsToText = JSON.stringify(contacts);
    localStorage.setItem('contactsStorage', contactsToText);

    let contactsIDsToText = JSON.stringify(contactsIDs);
    localStorage.setItem('contactsIDsStorage', contactsIDsToText);
}

async function getItem() {
    let tasksToArray = localStorage.getItem('tasksStorage');
    if (tasksToArray) {
        tasks = JSON.parse(tasksToArray);
    }

    let contactsToArray = localStorage.getItem('contactsStorage');
    if (contactsToArray) {
        contacts = JSON.parse(contactsToArray);
    }

    let contactsIDsToArray = localStorage.getItem('contactsIDsStorage');
    if (contactsIDsToArray) {
        contactsIDs = JSON.parse(contactsIDsToArray);
    }
}







































let tasksReset = [{
    'id': '1',
    'progress': 'TODO',
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation.',
    'date': '2023-05-10',
    'priority': 'Medium',
    'contacts': [],
    'subtasks': [{
        'subtask': 'Implement Recipe Recommendation',
        'checkbox': true
    }, {
        'subtask': 'Start Page Layout',
        'checkbox': false
    }, {
        'subtask': 'Define Functions',
        'checkbox': true
    }],
    'true-checkboxes': []
},
{
    'id': '2',
    'progress': 'INPROGRESS',
    'category': 'Technical Task',
    'title': 'HTML Base Template Creation',
    'description': 'Create reusable HTML base templates.',
    'date': '2023-07-19',
    'priority': 'Low',
    'contacts': [],
    'subtasks': [],
    'true-checkboxes': []
},
{
    'id': '3',
    'progress': 'DONE',
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Define CSS naming conventions and structure.',
    'date': '2023-09-02',
    'priority': 'Urgent',
    'contacts': [],
    'subtasks': [{
        'subtask': 'Establish CSS Methodology',
        'checkbox': true
    }, {
        'subtask': 'Setup Base Styles',
        'checkbox': false
    }],
    'true-checkboxes': []
}];

let contactsReset = [{
    'id': '1',
    'first-name': 'Julia',
    'last-name': 'Meyer',
    'E-Mail': 'julia.meyer@outlook.de',
    'Phone': '+49123456789',
    'color': 'yellow'
},
{
    'id': '2',
    'first-name': 'Peter',
    'last-name': 'Friedmann',
    'E-Mail': 'peter.friedmannn@outlook.de',
    'Phone': '+49987654321',
    'color': 'green'
},
{
    'id': '3',
    'first-name': 'Max',
    'last-name': 'Mustermann',
    'E-Mail': 'max.mustermann@outlook.de',
    'Phone': '+49123498765',
    'color': 'blue'
},
{
    'id': '4',
    'first-name': 'Anna',
    'last-name': 'Wilhelm',
    'E-Mail': 'anna.wilhelm@outlook.de',
    'Phone': '+49123123123',
    'color': 'pink'
}];