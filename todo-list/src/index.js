//'HomeWork', 'Math Homework', '1/6/2026', 'high', 'Do it before lunch'

class project {
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }
    addTask(task){
        
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
        this.form = document.querySelector('#form');
        this.projectContainer = document.querySelector('#projects-container');
        this.tasksContainer = document.querySelector('#tasks-container');
    }
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
    showTasks(project){
        const taskHeader = document.createElement('div');
        taskHeader.classList.add('taskHeader');
        for (const key of Object.keys(project.tasks[0])){
                const subject = document.createElement('span');
                subject.classList.add('subject');
                subject.textContent = key + " ";
                taskHeader.append(subject);
        }
        this.tasksContainer.append(taskHeader);
        project.tasks.forEach((task)=>{
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            for (const value of Object.values(task)){
                const val = document.createElement('span');
                val.classList.add('val');
                val.textContent = value + " ";
                taskContainer.append(val);
            }
            this.tasksContainer.append(taskContainer);
        })
    }
}

class controller{
    constructor(){
        this.projects = [new project('default')];
        this.render = new render();
    }
    createProject(name){
        const prj = new project(name);
        this.projects.push(prj);
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
c.createProject("prrrr");
c.createProject("prrrr");
c.createProject("prrrr");
c.createProject("prrrr");
c.createProject("prrrr");
c.createProject("prrrr");
c.createProject("prrrr");
c.createProject("prrrr");
c.createProject("prrrr");
c.render.showProjects(c.projects);
c.render.showTasks(c.projects[0]);
