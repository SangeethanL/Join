let draggingTask;
let hoverHeight;


/*-----------------------------------------------Task suchen------------------------------------------------*/

function searchTask() {
    let input = document.getElementById('search').value;
    let input_capitalize_1 = document.getElementById('search').value.charAt(0).toUpperCase();
    let input_capitalize_2 = document.getElementById('search').value.slice(1);
    let input_capitalize = input_capitalize_1 + input_capitalize_2;
    let input_lowerCase = document.getElementById('search').value.toLowerCase();
    let input_upperCase = document.getElementById('search').value.toUpperCase();
    if (input == '') {
        resetSearch();
    } else {
        cleanResults();
        search(input, input_capitalize, input_lowerCase, input_upperCase);
    }
}

function search(input, input_capitalize, input_lowerCase, input_upperCase) {
    for (let s = 0; s < tasks.length; s++) {
        let task = tasks[s];
        if (task['title'].includes(input) || task['description'].includes(input)) {
            showResult(task);
        }
        else if (task['title'].includes(input_capitalize) || task['description'].includes(input_capitalize)) {
            showResult(task);
        }
        else if (task['title'].includes(input_lowerCase) || task['description'].includes(input_lowerCase)) {
            showResult(task);
        } else if (task['title'].includes(input_upperCase) || task['description'].includes(input_upperCase)) {
            showResult(task);
        }
    }
}

function showResult(task) {
    document.getElementById('searchIcon').classList.add('display-none');
    document.getElementById('resetIcon').classList.remove('display-none');
    cleanBoard();
    document.getElementById('board').classList.add('display-none');
    document.getElementById('boardResponsive').style = "display: none;";
    document.getElementById('results').innerHTML += displayTask(task);
    document.getElementById('resultsResponsive').innerHTML += displayTask_responsive(task);
    loadCategoryBackgroundColor(task);
    loadProgressbar(task);
    finishedSubtasks(task);
    contactIcons(task);
    priorityImage(task);
}

function resetSearch() {
    document.getElementById('search').value = '';
    document.getElementById('resetIcon').classList.add('display-none');
    document.getElementById('searchIcon').classList.remove('display-none');
    cleanResults();
    document.getElementById('board').classList.remove('display-none');
    document.getElementById('boardResponsive').style = "";
    cleanBoard();
    loadBoard();
}

function cleanResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('resultsResponsive').innerHTML = '';
}

/*------------------------------------Board laden bzw. anzeigen lassen-------------------------------------*/



async function loadBoard() {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        loadTasks('TODO', task, i);
        loadTasks('INPROGRESS', task, i);
        loadTasks('AWAITFEEDBACK', task, i);
        loadTasks('DONE', task, i);

        loadSupplements(task);
    }
    await getProgressesLength();
    check_emptyTable();
    setMoveHoverHeight();
}

function loadTasks(progress, task, i) {
    let taskContainer = document.getElementById(`${progress}`);
    let taskContainerResponsive = document.getElementById(`${progress}responsive`);
    if (task['progress'].includes(`${progress}`)) {
        taskContainer.innerHTML += displayTask(task, i);
        taskContainerResponsive.innerHTML += displayTask_responsive(task, i);
    }
}

function loadSupplements(task) {
    loadCategoryBackgroundColor(task);
    loadProgressbar(task);
    finishedSubtasks(task);
    contactIcons(task);
    priorityImage(task);
}

function displayTask(task, i) {
    return `
    <div draggable="true" ondragstart="startDragging(${i})" onclick="openTask(${i})" id="tasks${task['id']}" class="taskBoxContainer">
        <div class="taskBox">
            <string id="box_category${task['id']}" class="box_category">${task['category']}</string>
            <string class="box_title">${task['title']}</string>
            <string class="box_description">${task['description']}</string>
            <div id="box_subtasks">
                <div class="box_progressbar">
                    <div id="progressbar${task['id']}" style="width: 0%;"></div>
                </div>
                <string id="totalSubtasks${task['id']}" class="box_totalSubtasks"></string>
            </div>
            <div class="box_contacts_priority">
            <div class="box_contacts">
                <div class="foreground"></div>
                <div id="contactIcons${task['id']}" class="box_contactsIcons"></div>
            </div>
                
                <img src id="priorityImg${task['id']}">
            </div>
        </div>
    </div>`;
}

function displayTask_responsive(task, i) {
    return `
    <div onclick="openTask(${i})" id="tasks${task['id']}_resp" class="taskBoxContainer">
        <div class="taskBox">
            <string id="box_category${task['id']}_resp" class="box_category">${task['category']}</string>
            <string class="box_title">${task['title']}</string>
            <string class="box_description">${task['description']}</string>
            <div id="box_subtasks_resp">
                <div class="box_progressbar">
                    <div id="progressbar${task['id']}_resp" style="width: 0%;"></div>
                </div>
                <string id="totalSubtasks${task['id']}_resp" class="box_totalSubtasks"></string>
            </div>
            <div class="box_contacts_priority">
                <div id="contactIcons${task['id']}_resp" class="box_contactIcons"></div>
                <img src id="priorityImg${task['id']}_resp">
            </div>
        </div>
    </div>`;
}

function check_emptyTable() {
    checkProgressLength(toDos, 'TODO', 'TODOresponsive');
    checkProgressLength(inProgresses, 'INPROGRESS', 'INPROGRESSresponsive');
    checkProgressLength(awaitFeedbacks, 'AWAITFEEDBACK', 'AWAITFEEDBACKresponsive');
    checkProgressLength(dones, 'DONE', 'DONEresponsive');
}

function checkProgressLength(array, td, tdResponsive) {
    if (array.length == 0) {
        document.getElementById(td).innerHTML = showProgressIsEmpty();
        document.getElementById(tdResponsive).innerHTML = showProgressIsEmpty();
    }
}

function showProgressIsEmpty() {
    return `<div class="noTasks">
    No Tasks available
    </div>`;
}

function switchToAddTask() {
    location.href = "add_task.html";
}

/*--------------------------Tasks Draggen und Droppen--------------------------*/

function startDragging(id) {
    draggingTask = id;
}

function disableHover() {
    document.getElementById('TODO').classList.remove('moveTo');
    document.getElementById('INPROGRESS').classList.remove('moveTo');
    document.getElementById('AWAITFEEDBACK').classList.remove('moveTo');
    document.getElementById('DONE').classList.remove('moveTo');
}


async function setMoveHoverHeight() {
    let tdAllHeights = [];
    let firstTaskInTD;
    let scroll_placeholder = 0;
    let lastTaskinTD;
    await getTaskOffSetHeight(tdAllHeights);
    calculateHoverHeight(tdAllHeights, firstTaskInTD, scroll_placeholder, lastTaskinTD);
}

async function getTaskOffSetHeight(tdAllHeights) {
    if (window.screen.width > 850) {
        for (let h = 0; h < tasks.length; h++) {
            let taskId = tasks[h]['id'];
            let task_inBoard = document.getElementById(`tasks${taskId}`);
            let task_details = task_inBoard.getClientRects();
            let task_offSetHeight = task_details[0]['bottom'];
            tdAllHeights.push(task_offSetHeight);
        }
    }
}

function calculateHoverHeight(tdAllHeights, firstTaskInTD, scroll_placeholder, lastTaskinTD) {
    let highest = Math.max(...tdAllHeights);
    let shortest = Math.min(...tdAllHeights);
    if (firstTaskInTD == null) {
        firstTaskInTD = shortest;
    }
    else if (firstTaskInTD > 1) {
        scroll_placeholder = firstTaskInTD - shortest;
    }
    lastTaskinTD = highest;
    hoverHeight = lastTaskinTD + scroll_placeholder;
}

function allowDrop(ev, progress) {
    document.getElementById('TODO').style = `max-height:unset; height: ${hoverHeight}px !important;`;
    document.getElementById('INPROGRESS').style = `max-height:unset; height: ${hoverHeight}px !important;`;
    document.getElementById('AWAITFEEDBACK').style = `max-height:unset; height: ${hoverHeight}px !important;`;
    document.getElementById('DONE').style = `max-height:unset; height: ${hoverHeight}px !important;`;
    disableHover();
    document.getElementById(progress).classList.add('moveTo');
    ev.preventDefault();
}

async function moveTo(progress) {
    tasks[draggingTask]['progress'] = progress;
    if (currentUser[0]) {
        await updateTask_firebase(currentUser[0]['email'], `${tasks[draggingTask]['id']}`, tasks[draggingTask]);
    }
    await setItem();
    disableHover();
    document.getElementById('TODO').style = '';
    document.getElementById('INPROGRESS').style = '';
    document.getElementById('AWAITFEEDBACK').style = '';
    document.getElementById('DONE').style = '';
    cleanBoard();
    loadBoard();
}

/*----------------------Subtasks Länge & Bilder anzeigen----------------------*/

function loadCategoryBackgroundColor(task) {
    if (task['category'] == 'Technical Task') {
        document.getElementById(`box_category${task['id']}`).classList.add('technical_bgColor');
        document.getElementById(`box_category${task['id']}_resp`).classList.add('technical_bgColor');
    } else if (task['category'] == 'User Story') {
        document.getElementById(`box_category${task['id']}`).classList.add('user_bgColor');
        document.getElementById(`box_category${task['id']}_resp`).classList.add('user_bgColor');
    }
}

function loadProgressbar(task) {
    let progressbar = document.getElementById(`progressbar${task['id']}`);
    let progressbar_responsive = document.getElementById(`progressbar${task['id']}_resp`);
    task['true-checkboxes'] = [];
    for (t = 0; t < task['subtasks'].length; t++) {
        let checkbox = task['subtasks'][t]['checkbox'];
        if (checkbox == true) {
            task['true-checkboxes'].push(true);
        }
    }
    if (task['true-checkboxes'].length > 0) {
        let trueChecks_Percent = task['true-checkboxes'].length / task['subtasks'].length * 100;
        progressbar.style = `width: ${trueChecks_Percent}%;`;
        progressbar_responsive.style = `width: ${trueChecks_Percent}%;`;
    }
}

function finishedSubtasks(task) {
    let numberOfSubtasks = document.getElementById(`totalSubtasks${task['id']}`);
    let numberOfSubtasks_responsive = document.getElementById(`totalSubtasks${task['id']}_resp`);

    if (task['subtasks'].length > 0) {
        numberOfSubtasks.innerHTML = `${task['true-checkboxes'].length}/${task['subtasks'].length} Subtasks`;
        numberOfSubtasks_responsive.innerHTML = `${task['true-checkboxes'].length}/${task['subtasks'].length} Subtasks`;
    }
}

function contactIcons(task) {
    let contactIcons_Container = document.getElementById(`contactIcons${task['id']}`);
    let contactIcons_ContainerResponsive = document.getElementById(`contactIcons${task['id']}_resp`);
    for (y = 0; y < task['contacts'].length; y++) {
        let letter1 = task['contacts'][y]['first-name'].charAt(0);
        let letter2 = task['contacts'][y]['last-name'].charAt(0);
        let backgroundColor = task['contacts'][y]['color'];

        showContactIcons(contactIcons_Container, backgroundColor, letter1, letter2);
        showContactIcons(contactIcons_ContainerResponsive, backgroundColor, letter1, letter2);
    }
}

function showContactIcons(container, backgroundColor, letter1, letter2) {
    container.innerHTML += `
    <div>
        <div class="contactIcon" style="background-color: ${backgroundColor};">
        ${letter1}${letter2}</div>
    </div>`;
}

function priorityImage(task) {
    let prio_image = document.getElementById(`priorityImg${task['id']}`);
    let prio_image_responsive = document.getElementById(`priorityImg${task['id']}_resp`);

    if (task['priority'] == 'Urgent') {
        prio_image.src = 'assets/img/Prio_alta.png';
        prio_image_responsive.src = 'assets/img/Prio_alta.png';
    }
    else if (task['priority'] == 'Medium') {
        prio_image.src = 'assets/img/Prio_media.png';
        prio_image_responsive.src = 'assets/img/Prio_media.png';
    }
    else if (task['priority'] == 'Low') {
        prio_image.src = 'assets/img/Prio_baja.png';
        prio_image_responsive.src = 'assets/img/Prio_baja.png';
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