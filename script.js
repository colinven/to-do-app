const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('add-btn');
const listContainer = document.getElementById('list-container');
const listItems = document.querySelectorAll('li');
const editedItem = document.querySelector('edit')

function toggleInputVisibility(){
    if (inputBox.hidden){
         inputBox.hidden = false;
        addButton.innerText = 'Add';
        addButton.classList.remove('inactive');
    } else {
        inputBox.hidden = true;
        addButton.innerText = 'Add a Task';
        addButton.classList.add('inactive');
    }
       
}

function createNewTaskElements(value){
    //append list item
    let li = document.createElement('li');
    li.innerText = value.trim();
    listContainer.appendChild(li);

    //append edit button
    let edit = document.createElement('span');
    edit.innerHTML = '<img class="edit" src="./images/edit.png">'
    li.appendChild(edit);

    //append remove button
    let remove = document.createElement('span');
    remove.innerHTML = '<img class="remove" src="./images/remove.png">'
    li.appendChild(remove);

    return li;
}

function addTask(){
    if (inputBox.value === ''){
        alert('Please input your text.');
        return;
    }
    createNewTaskElements(inputBox.value)
    toggleInputVisibility();
    inputBox.value = '';
    saveData();
}
inputBox.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                addTask()
            }
        })

addButton.addEventListener('click', function(){
    if (inputBox.hidden) {
        toggleInputVisibility();
        inputBox.focus();
    } else {
        addTask();
    }
});

//handle todo item states
listContainer.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        saveData();  
    }
    if (event.target.tagName === 'IMG') {
        if (event.target.classList.contains('remove')) {
            event.target.parentElement.parentElement.remove();
            saveData();
        }
        if (event.target.classList.contains('edit')) {
            const editField = editTask(event.target.parentElement.parentElement)
            editField.addEventListener('keydown', (e) => {
                if (e.key === "Enter"){
                    saveEdit(editField);
                    saveData(); 
                }
            })
        }
    }   
});

function editTask(listItem){
    let input = document.createElement('input');
    input.value = listItem.innerText;
    input.id = 'edit';
    listItem.replaceWith(input);
    input.focus();
    return input;
}
function saveEdit(inputElement){
    const newValue = inputElement.value.trim();
    const newListItem = createNewTaskElements(newValue);
    inputElement.replaceWith(newListItem);
}
function saveData(){
    localStorage.setItem('data', listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem('data');
}
showTask();