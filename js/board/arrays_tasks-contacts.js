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


/*---------------------------------------------ID's festlegen----------------------------------------------*/
function declareIDs() {
    for (let d = 0; d < tasks.length; d++) {
        let id = [d];
        tasks[d]['id'] = id;
    }
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
    if(window.location.pathname.endsWith('board.html')){
       loadBoard();
    }
}
