//'HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch'

class project {
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }
    createTask(title, description, dueDate, priority, notes){
        const t = new task(title, description, dueDate, priority, notes);
        this.tasks.push(t);
    }
    removeTask(taskId){
        this.tasks = this.tasks.filter((t, ind) => t.id !== taskId);
    }
}

class task {
    constructor(title, description, dueDate, priority, notes){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }
    toggle(){
        this.completed = !this.completed;
    }
    editTitle(newTitle){this.title = newTitle}
    editDescription(newDescription){this.description = newDescription}
    editDueDate(newDate){this.newDate = newDate}
    editPriority(newPriority){this.priority = newPriority}
    editNotes(newNotes){this.notes = newNotes}
}

class render{
    constructor(){
        this.root = document.querySelector('#app');
        this.taskForm = document.querySelector('#form');
        this.addButton = document.querySelector('#add-button')
        this.projectContainer = document.querySelector('#projects-container');
        this.tasksContainer = document.querySelector('#tasks-container');
        this.dialog = document.querySelector('#task-dialog')
        this.dialogForm = document.querySelector('.dialog-container')
        this.closeDialog = document.querySelector('#close-task');
        this.submitDialog = document.querySelector('#submit-task');
    }
    bindAddTask(addTaskHandler){this.addButton.addEventListener('click', addTaskHandler)}
    bindCloseDialog(closeDialogHandler){this.closeDialog.addEventListener('click', closeDialogHandler)}
    bindsubmitDialog(submitDialogHandler){
        this.dialogForm.addEventListener('submit', (e)=> {submitDialogHandler(e)})}
    showProjects(projects){
        projects.forEach((prj)=>{
            const frag = new DocumentFragment();
            const pj = document.createElement('p');
            pj.textContent = prj.name;
            pj.classList.add('project');
            frag.append(pj);
            this.projectContainer.append(frag);
        })
    }
    showTasks(project, handleToggle, handleEdit, handleDelete){
        this.tasksContainer.replaceChildren();
        const taskHeader = document.createElement('div');
        taskHeader.setAttribute('id', 'task-header');
        for (const key of Object.keys(project.tasks[0])){
                if(key == 'id') continue;
                const subject = document.createElement('span');
                subject.classList.add('subject');
                subject.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                taskHeader.append(subject);
        }
        const controlSubject = document.createElement('span');
        controlSubject.textContent = 'Control';
        controlSubject.classList.add('subject');
        taskHeader.append(controlSubject);
        this.tasksContainer.append(taskHeader);
        project.tasks.forEach((task)=>{
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            for (const [key, value]  of Object.entries(task)){
                if (key == 'id') continue;
                const val = document.createElement('span');
                val.classList.add('val');
                val.textContent = value + " ";
                taskContainer.append(val);
            }
            // Add 7th column that contains controlling buttons per task
            const btnContainer = document.createElement('div');
            btnContainer.classList.add('task-buttons');
            //Toggle
            const toggleBtn = document.createElement('button');
            toggleBtn.classList.add('toggle-task');
            toggleBtn.textContent = 'Toggle';
            toggleBtn.addEventListener("click", handleToggle);
            btnContainer.append(toggleBtn);
            //Edit
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-task');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener("click", handleEdit);
            btnContainer.append(editBtn);
            //Delete
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-task');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener("click", handleDelete);
            btnContainer.append(deleteBtn);
            //Append
            taskContainer.append(btnContainer);
            this.tasksContainer.append(taskContainer);
        })
    }
}

class controller{
    constructor(){
        this.projects = [new project('default')];
        this.render = new render();
        this.activeProject = this.projects[0];

        this.render.bindAddTask(this.addTaskHandle.bind(this))
        this.render.bindCloseDialog(this.closeHandle.bind(this))
        this.render.bindsubmitDialog(this.submitHandle.bind(this))
    }
    createProject(name){
        const prj = new project(name);
        this.projects.push(prj);
    }
    addTaskHandle(){
        const taskInput = document.querySelector('#add-task');
        const dialogTitle = document.querySelector('#dialog-title');
        dialogTitle.value = taskInput.value;
    }
    closeHandle(){
        this.render.dialog.close();
    }
    submitHandle(e){
        e.preventDefault();
        const values = new FormData(e.target);
        console.log(Object.fromEntries(values));
        this.activeProject.createTask(values.get('title'), values.get('description'), values.get('dueDate'), values.get('priority'), values.get('notes'));
        this.render.showTasks(c.activeProject);
        // this.render.dialog.close();
    }
}

const c = new controller();

c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.projects[0].createTask('HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch')
c.render.showProjects(c.projects);
c.render.showTasks(c.projects[0]);
