
//Tags do HTML - DOM
const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');

let tasks = []; //Array para guardar as tarefas

//Metodo para adicionar tarefa no HTML
function renderTaskOnHTML(taskTitle, done = false){

        const li = document.createElement('li');
    
        const input = document.createElement('input')
        input.setAttribute('type', 'checkbox')
        input.classList.add("checked")
        input.addEventListener('change', (event) => {
            const liToToggle = event.target.parentElement;
            const spanToToggle = liToToggle.querySelector('span'); //Titulo da Tarefa
            
            const done = event.target.checked;
    
            //Mudar o estilo do conteudo (riscar a tarefa marcada)
            if(done){
                spanToToggle.style.textDecoration = 'line-through';
            } else{
                spanToToggle.style.textDecoration = 'none';
            }
    
            //Alterar o array com o novo valor da propriedade Done (MAP)
            tasks = tasks.map(t => {
                if(t.title == spanToToggle.textContent){
                return{
                    title: t.title,
                    done: !t.done, 
                }
    
            }
                return t;
        })
    
        localStorage.setItem('tasks', JSON.stringify(tasks));
    
    }); 
        input.checked = done; 
        

        const span = document.createElement('span');
        span.textContent = taskTitle; 
        if(done){
            span.style.textDecoration = 'line-through';
        }
    
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        
        trashButton.addEventListener('click', (event) =>{
            const liToRemove = event.target.parentElement;
            const titleToRemove = liToRemove.querySelector('span').textContent;
    
            tasks = tasks.filter(t => t.title !== titleToRemove)  //filtrando o array tasks apenas com os titles que nao foram removidos
    
            todoListUl.removeChild(liToRemove);
    
            //Guardar no localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
    
        })
    
    
        li.appendChild(input)
        li.appendChild(span)
        li.appendChild(trashButton)
    
        todoListUl.appendChild(li);
}

//Exibir na página os itens do localStorage
window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks')

    if(!tasksOnLocalStorage) return

    tasks = JSON.parse(tasksOnLocalStorage); //Pega a string e converte em objeto

    tasks.forEach(t => {
        renderTaskOnHTML(t.title, t.done); 
    })
}


//Adicionando Evento no Form para inserir o conteúdo na lista

form.addEventListener('submit', (event) => {
    event.preventDefault() //Evita o comportamento padrão de recarregar a página ao submeter o formulário

    const taskTitle = taskTitleInput.value;

    if(taskTitle.length < 3){
        alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.")
        return;
    }

    //Adicionar tarefas no Array como objeto
    tasks.push({
        title: taskTitle,
        done: false,
    }); 
    
    //Salvando no localStorage

    localStorage.setItem('tasks', JSON.stringify(tasks));

    //Adicionando a nova tarefa no HTML
    renderTaskOnHTML(taskTitle); 

    //Limpar o campo do input 
    taskTitleInput.value = ''; 

})