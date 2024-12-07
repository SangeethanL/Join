getItemLoginDatas();

async function loadSummary() {
    urgents = [];
    for (let x = 0; x < tasks.length; x++) {
        let taskPriority = tasks[x]['priority'];

        getProgressLength(toDos, 'to_dos');
        getProgressLength(dones, 'dones');
        getProgressLength(inProgresses, 'in_progress');
        getProgressLength(awaitFeedbacks, 'await_feedback');

        getUrgentLength(taskPriority, urgents);
    }

    document.getElementById('total_tasks').innerHTML = `${tasks.length}`;
}

function getProgressLength(array, id) {
    document.getElementById(`${id}`).innerHTML = `${array.length}`;
}

function getUrgentLength(variable, array) {
    if (variable == 'Urgent') {
        array.push(true);
        getClosestDate();
    }

    document.getElementById('urgents').innerHTML = `${array.length}`;
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

function showGreeting() {
    if (window.screen.width <= 850) {
        if (currentUser[0]) {
            mobileWelcoming(currentUser[0]);
        } else if (guestLogin['name']) {
            mobileWelcoming(guestLogin);
        }
    }
    else if (window.screen.width > 850) {
        if (currentUser[0]) {
            desktopWelcoming(currentUser[0]);
        } else if (guestLogin['name']) {
            desktopWelcoming(guestLogin);
        }
    }
}

function mobileWelcoming(variable) {
    let greetWindowContainer = document.getElementById('greetWindowContainer');
    if (variable['disableWindow'] == false) {
        greetWindowContainer.classList.remove('d-none');
        if (variable == currentUser[0]) {
            document.getElementById('greetWindow-userName').innerHTML = `${variable['name']}`;
        }
        setTimeout(() => {
            greetWindowContainer.classList.add('d-none');
        }, 2000);
        variable['disableWindow'] = true;
    } else if (variable['disableWindow'] == true) {
        greetWindowContainer.classList.add('d-none');
    }
    setItemLoginDatas();
}

function desktopWelcoming(variable) {
    if (variable == currentUser[0]) {
        document.getElementById('greetSummary-userName').innerHTML = `${currentUser[0]['name']}`;
        variable['disableWindow'] = true;
    } else if (variable == guestLogin) {
        document.getElementById('greetSummary').classList.add('d-none');
        variable['disableWindow'] = true;
    }
    setItemLoginDatas();
}