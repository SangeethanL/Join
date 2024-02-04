function resetAddTaskBoard() {
    document.getElementById('addTaskForm').reset();
    document.getElementById('hiddenButtons').style = "display: none;";
    document.getElementById('displaySubtasks').innerHTML = '';
    document.getElementById('displaySelectedContacts').innerHTML = '';
    priorityStatus = '';
    selectedContacts = [];
    subtasks = [];
    resetActiveButtonBySubmit();
}


function activeButtonUrgent(){
    document.getElementById('urgent').classList.add('active-urgent')
    document.getElementById('medium').classList.remove('active-medium');
    document.getElementById('low').classList.remove('active-low');
    document.getElementById('urgent-white').classList.remove('d-none');
    document.getElementById('urgent-black').classList.add('d-none');
    document.getElementById('medium-white').classList.add('d-none');
    document.getElementById('medium-black').classList.remove('d-none');
    document.getElementById('low-white').classList.add('d-none');
    document.getElementById('low-black').classList.remove('d-none');
    
}

function activeButtonMedium(){
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

function activeButtonLow(){
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

function resetActiveButtonBySubmit(){
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