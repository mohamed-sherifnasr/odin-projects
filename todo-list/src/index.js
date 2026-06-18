import "./styles.css";
//'HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch'


//Create Project maintaining a view per project with maintaining localStorage
//Update setItem key to match the currently active project

class project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }
    createTask(title, description, dueDate, priority, notes) {
        const t = new task(title, description, dueDate, priority, notes);
        this.tasks.push(t);
    }
    removeTask(task) {
        this.tasks = this.tasks.filter((t, ind) => t.id !== task.id);
    }
}

class task {
    constructor(title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = false;
    }
    toggle() {
        this.completed = !this.completed;
    }
    editTitle(newTitle) { this.title = newTitle }
    editDescription(newDescription) { this.description = newDescription }
    editDueDate(newDate) { this.newDate = newDate }
    editPriority(newPriority) { this.priority = newPriority }
    editNotes(newNotes) { this.notes = newNotes }
}

class render {
    constructor() {
        this.root = document.querySelector('#app');
        this.taskForm = document.querySelector('#form');
        this.addButton = document.querySelector('#add-button')
        this.projectContainer = document.querySelector('#projects-list');
        this.tasksContainer = document.querySelector('#tasks-container');
        this.dialog = document.querySelector('#task-dialog')
        this.dialogForm = document.querySelector('.dialog-container')
        this.closeDialog = document.querySelector('#close-task');
        this.submitDialog = document.querySelector('#submit-task');
        this.addProject = document.getElementById('add-project');
    }
    bindAddTask(addTaskHandler) { this.addButton.addEventListener('click', addTaskHandler) }
    bindCloseDialog(closeDialogHandler) { this.closeDialog.addEventListener('click', closeDialogHandler) }
    bindsubmitDialog(submitDialogHandler) {
        this.dialogForm.addEventListener('submit', submitDialogHandler)
    }
    bindaddProject(addProjectHandler) { this.addProject.addEventListener("click", addProjectHandler) };
    showProjects(projects, showProjectsHandler) {
        this.projectContainer.replaceChildren();
        projects.forEach((prj) => {
            const frag = new DocumentFragment();
            const pj = document.createElement('p');
            pj.textContent = prj.name;
            pj.classList.add('project');
            pj.setAttribute("id", prj.id)
            pj.addEventListener("click", showProjectsHandler);
            frag.append(pj);
            this.projectContainer.append(frag);
        })
    }
    showTasks(project, handleToggle, handleEdit, handleDelete) {
        this.tasksContainer.replaceChildren();
        const taskHeader = document.createElement('div');
        taskHeader.setAttribute('id', 'task-header');
        console.log(project)
        if (project.tasks.length == 0) return;
        for (const key of Object.keys(project.tasks[0])) {
            if (key == 'id') continue;
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
        project.tasks.forEach((task) => {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            for (const [key, value] of Object.entries(task)) {
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
            toggleBtn.addEventListener("click", (e) => handleToggle(e, task))
            btnContainer.append(toggleBtn)
            //Edit
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-task');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener("click", (e) => handleEdit(e, task));
            editBtn.setAttribute("commandfor", "task-dialog");
            editBtn.setAttribute("command", "show-modal");
            editBtn.setAttribute("type", "button");
            btnContainer.append(editBtn);
            //Delete
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-task');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener("click", (e) => handleDelete(e, task));
            btnContainer.append(deleteBtn);
            //Append
            taskContainer.append(btnContainer);
            taskContainer.setAttribute('data-id', task.id);
            this.tasksContainer.append(taskContainer);
        })
    }
}


class controller {
    constructor() {
        this.projects = [new project('Default')];
        this.render = new render();
        this.activeProject = this.projects[0];

        this.s = this.submitHandle.bind(this);
        this.render.bindAddTask(this.addTaskHandle.bind(this))
        this.render.bindCloseDialog(this.closeHandle.bind(this))
        this.render.bindaddProject(this.addProjectHandler.bind(this));
    }
    fromJSON(data){
        let parsifiedData = JSON.parse(data);
        let parsifiedprojects = [];

        //Instantiate Projects
        parsifiedData.forEach(function(prj, index){
            let p = new project(prj.name);
            let parsifiedTasks = [];
            Object.assign(p, prj);
            
            //Instantiate Tasks
            p.tasks.forEach(function(tsk, index){
                let t = new task(tsk.title);
                Object.assign(t, tsk);
                parsifiedTasks.push(t);
            })
            p.tasks = parsifiedTasks;
            parsifiedprojects.push(p);
        })
        console.log(parsifiedprojects);
        return parsifiedprojects;
    }
    reRender() {
        this.getFromStorage.bind(this);
        this.render.showTasks(this.activeProject, this.handleToggle.bind(this), this.handleEdit.bind(this), this.handleDelete.bind(this));
        this.render.showProjects(this.projects, this.showProjectsHandler.bind(this));
    }
    createProject(name) {
        const prj = new project(name);
        this.projects.push(prj);
        this.reRender();
    }
    addTaskHandle() {
        const taskInput = document.querySelector('#add-task');
        const dialogTitle = document.querySelector('#dialog-title');
        dialogTitle.value = taskInput.value;
        // Add Event Listener to Submit Button in the Dialog when pressing add Task
        this.render.bindsubmitDialog(this.s)
    }
    closeHandle() {
        this.render.dialogForm.removeEventListener("submit", this.s);
        this.render.dialog.close();
    }
    submitHandle(e) {
        e.preventDefault();
        const values = new FormData(this.render.dialogForm);
        this.activeProject.createTask(values.get('title'), values.get('description'), values.get('dueDate'), values.get('priority'), values.get('notes'));
        localStorage.setItem("projects", JSON.stringify(this.projects));
        this.render.dialogForm.removeEventListener("submit", this.s);
        this.render.dialog.close();
        this.reRender();
    }
    handleToggle(e, task) {
        let index = this.activeProject.tasks.indexOf(task);
        if (index !== -1) {
            this.activeProject.tasks[index].toggle()
            this.updateStorage();
            this.reRender();
        }
    }
    handleDelete(e, task) {
        let index = this.activeProject.tasks.indexOf(task);
        if (index !== -1) {
            this.activeProject.removeTask(task);
            this.updateStorage()
            this.reRender();
        }
    }
    handleEdit(e, task) {
        let index = this.activeProject.tasks.indexOf(task);
        const form = this.render.dialogForm;
        if (index !== -1) {
            // Equate the values in the model to the view
            form.elements.title.value = task.title;
            form.elements.description.value = task.description;
            form.elements.dueDate.value = task.dueDate;
            document.querySelector(`[value=${task.priority}]`).checked = true;
            form.elements.notes.value = task.notes;
        }
        // Add Event Listener to Edit the value upon pressing submit
        let editTask = function (e) {
            e.preventDefault();
            task.title = form.elements.title.value;
            task.description = form.elements.description.value;
            task.dueDate = form.elements.dueDate.value;
            task.priority = form.elements.priority.value;
            task.notes = form.elements.notes.value;
            //Update Storage
            this.updateStorage();
            //Re-Render
            this.reRender();
            //Remove Event Listener
            this.render.dialogForm.removeEventListener("submit", bindedEditTask);
            //Close Dialog
            this.render.dialog.close();
        }
        let bindedEditTask = editTask.bind(this);
        this.render.dialogForm.addEventListener("submit", bindedEditTask, { once: true });
    }
    getFromStorage() {
        let temp;
        if (localStorage.getItem("projects")) { temp = this.fromJSON(localStorage.getItem("projects")) };
        if (temp) this.projects = temp;
    }
    updateStorage() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }
    showProjectsHandler(e) {
        let prj = this.projects.find((element)=> element['name'] == e.target.textContent);
        console.log(prj)
        this.activeProject = prj;
        this.render.showProjects(this.projects, this.showProjectsHandler.bind(this));
        this.render.showTasks(this.activeProject, this.handleToggle.bind(this), this.handleEdit.bind(this), this.handleDelete.bind(this));
    }
    addProjectHandler() {
        let name = document.getElementById("new-project-name");
        if (name.value.length < 1) return;
        this.createProject(name.value);
        name.value = "";
    }
}
let x = [{}, {}]
const c = new controller();

c.getFromStorage();
c.reRender();
