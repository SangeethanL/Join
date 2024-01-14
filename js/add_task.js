function resetAddTaskBoard() {
    document.getElementById('addTaskForm').reset();
    document.getElementById('hiddenButtons').style = "display: none;";
    document.getElementById('displaySubtasks').innerHTML = '';
    document.getElementById('displaySelectedContacts').innerHTML = '';
    priorityStatus = '';
    selectedContacts = [];
    subtasks = [];

    function activeButton(){
        
    }
}