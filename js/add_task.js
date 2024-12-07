let taskOpened;

function resetAddTaskBoard() {
    if (window.location.pathname.endsWith('board.html')) {
        document.getElementById('addTaskForm').reset();
    }
    if (window.location.pathname.endsWith('add_task.html')) {
        document.getElementById('taskForm').reset();
    }
    resetActiveButton();
    priority = '';
    selectedContacts = [];
    subtasks = [];
    isSubtaskEditting = null;
    document.getElementById('newSubtaskButtons').classList.remove('addVisibility');
    document.getElementById('showNewSubtasks').innerHTML = '';
    document.getElementById('showNewContacts').innerHTML = '';
    
}

function urgent_prio() {
    priority = 'Urgent';
    if (window.location.pathname.endsWith('add_task.html') || document.getElementById('addTaskScreen').style == '') {
        urgent_prio_addTask();
    }
    else if (window.location.pathname.endsWith('board.html')) {
        if(taskOpened == true) {
            urgent_prio_board();
        } else {
            urgent_prio_addTask();
        }
    }
}

function urgent_prio_addTask() {
    document.getElementById('urgent').classList.add('active-urgent');
    document.getElementById('medium').classList.remove('active-medium');
    document.getElementById('low').classList.remove('active-low');

    document.getElementById('urgent-white').classList.remove('d-none');
    document.getElementById('urgent-black').classList.add('d-none');
    document.getElementById('medium-white').classList.add('d-none');
    document.getElementById('medium-black').classList.remove('d-none');
    document.getElementById('low-white').classList.add('d-none');
    document.getElementById('low-black').classList.remove('d-none');
}

function urgent_prio_board() {
    document.getElementById('edit_urgent').classList.add('active-urgent');
    document.getElementById('edit_medium').classList.remove('active-medium');
    document.getElementById('edit_low').classList.remove('active-low');

    document.getElementById('edit_urgent-white').classList.remove('d-none');
    document.getElementById('edit_urgent-black').classList.add('d-none');
    document.getElementById('edit_medium-white').classList.add('d-none');
    document.getElementById('edit_medium-black').classList.remove('d-none');
    document.getElementById('edit_low-white').classList.add('d-none');
    document.getElementById('edit_low-black').classList.remove('d-none');
}

function medium_prio() {
    priority = 'Medium';
    if (window.location.pathname.endsWith('add_task.html') || document.getElementById('addTaskScreen').style == '') {
        medium_prio_addTask();
    }
    else if (window.location.pathname.endsWith('board.html')) {
        if(taskOpened == true) {
            medium_prio_board();
        } else {
            medium_prio_addTask();
        }
    }
}

function medium_prio_addTask() {
    document.getElementById('medium').classList.add('active-medium');
    document.getElementById('urgent').classList.remove('active-urgent');
    document.getElementById('low').classList.remove('active-low');

    document.getElementById('urgent-white').classList.add('d-none');
    document.getElementById('urgent-black').classList.remove('d-none');
    document.getElementById('medium-white').classList.remove('d-none');
    document.getElementById('medium-black').classList.add('d-none');
    document.getElementById('low-white').classList.add('d-none');
    document.getElementById('low-black').classList.remove('d-none');
}

function medium_prio_board() {
    document.getElementById('edit_medium').classList.add('active-medium');
    document.getElementById('edit_urgent').classList.remove('active-urgent');
    document.getElementById('edit_low').classList.remove('active-low');

    document.getElementById('edit_urgent-white').classList.add('d-none');
    document.getElementById('edit_urgent-black').classList.remove('d-none');
    document.getElementById('edit_medium-white').classList.remove('d-none');
    document.getElementById('edit_medium-black').classList.add('d-none');
    document.getElementById('edit_low-white').classList.add('d-none');
    document.getElementById('edit_low-black').classList.remove('d-none');
}
function low_prio() {
    priority = 'Low';

    if (window.location.pathname.endsWith('add_task.html')) {
        low_prio_addTask();
    }
    else if (window.location.pathname.endsWith('board.html')) {
        if(taskOpened == true) {
            low_prio_board();
        } else {
            low_prio_addTask();
        }
    }
}

function low_prio_addTask() {
    document.getElementById('medium').classList.remove('active-medium');
    document.getElementById('urgent').classList.remove('active-urgent');
    document.getElementById('low').classList.add('active-low');

    document.getElementById('urgent-white').classList.add('d-none');
    document.getElementById('urgent-black').classList.remove('d-none');
    document.getElementById('medium-white').classList.add('d-none');
    document.getElementById('medium-black').classList.remove('d-none');
    document.getElementById('low-white').classList.remove('d-none');
    document.getElementById('low-black').classList.add('d-none');
}

function low_prio_board() {
    document.getElementById('edit_medium').classList.remove('active-medium');
    document.getElementById('edit_urgent').classList.remove('active-urgent');
    document.getElementById('edit_low').classList.add('active-low');

    document.getElementById('edit_urgent-white').classList.add('d-none');
    document.getElementById('edit_urgent-black').classList.remove('d-none');
    document.getElementById('edit_medium-white').classList.add('d-none');
    document.getElementById('edit_medium-black').classList.remove('d-none');
    document.getElementById('edit_low-white').classList.remove('d-none');
    document.getElementById('edit_low-black').classList.add('d-none');
}

function resetActiveButton() {
    priority = null;
    document.getElementById('medium').classList.remove('active-medium');
    document.getElementById('urgent').classList.remove('active-urgent');
    document.getElementById('low').classList.remove('active-low');
    document.getElementById('urgent-white').classList.add('d-none');
    document.getElementById('urgent-black').classList.remove('d-none');
    document.getElementById('medium-white').classList.add('d-none');
    document.getElementById('medium-black').classList.remove('d-none');
    document.getElementById('low-white').classList.add('d-none');
    document.getElementById('low-black').classList.remove('d-none');
}