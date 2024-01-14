function loadSummary() {
    let toDoSummary = [];
    let doneSummary = [];
    let urgentSummary = [];
    let inProgressSummary = [];
    let awaitFeedbackSummary = [];
    for (x = 0; x < tasks.length; x++) {
        let taskProgress = tasks[x]['progress'];
        let taskPriority = tasks[x]['priority'];
        refreshToDoLength(taskProgress, toDoSummary);
        refreshDoneLength(taskProgress, doneSummary);
        refreshUrgentLength(taskPriority, urgentSummary);
        refreshInProgressLength(taskProgress, inProgressSummary);
        refreshAwaitFeedbackLength(taskProgress, awaitFeedbackSummary);
    }
    document.getElementById('totalTasks').innerHTML = `${tasks.length}`;
}

function refreshToDoLength(variable, array) {
    if (variable == 'TODO') {
        array.push('-');
    }
    document.getElementById('to-do').innerHTML = `${array.length}`;
}

function refreshDoneLength(variable, array) {
    if (variable == 'DONE') {
        array.push('-');
    }
    document.getElementById('done').innerHTML = `${array.length}`;
}

function refreshUrgentLength(variable, array) {
    if (variable == 'Urgent') {
        array.push('-');
        getClosestDate();
    }

    document.getElementById('urgent').innerHTML = `${array.length}`;
}

function getClosestDate() {
    let dates = [];

    for (u = 0; u < tasks.length; u++) {
        let taskPriority = tasks[u]['priority'];
        if (taskPriority == 'Urgent') {
            dates.push(tasks[u]['date'])
        }
    }
    var temp = dates.map(d => Math.abs(new Date() - new Date(d).getTime()));
    var idx = temp.indexOf(Math.min(...temp));

    let date = dates[idx];
    let convertDate = date.split("-").reverse().join(".");
    document.getElementById('urgentDate').innerHTML = `${convertDate}`;

}

function refreshInProgressLength(variable, array) {
    if (variable == 'INPROGRESS') {
        array.push('-');
    }
    document.getElementById('in-progress').innerHTML = `${array.length}`;
}

function refreshAwaitFeedbackLength(variable, array) {
    if (variable == 'AWAITFEEDBACK') {
        array.push('-');
    }
    document.getElementById('await-feedback').innerHTML = `${array.length}`;
}