const inputBox = document.getElementById('input-box');
const addButton = document.getElementById('add-btn');
const listContainer = document.getElementById('list-container');
const listItems = document.querySelectorAll('li');

function addTask(){
    if (inputBox.value === ''){
        alert('Please input your text.');
        return;
    }
    let li = document.createElement('li');
    li.innerText = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '<img src="/images/remove.png">'
    li.appendChild(span);
    inputBox.value = '';
    saveData();
}

addButton.addEventListener('click', addTask);
listContainer.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
        saveData();  
    }
    if (event.target.tagName === 'IMG') {
      event.target.parentElement.parentElement.remove();
      saveData();
    }
        
});

function saveData(){
    localStorage.setItem('data', listContainer.innerHTML)
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem('data');
}
showTask();