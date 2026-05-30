class project {
    constructor(project){
        this.project = project;
    }
    tasks = [];
}

class todos{
    constructor(project, title, description, dueDate, priority, notes){
        this.project = project;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checked = false;
    }
    toggle(){
        this.checked = !this.checked;
    }
}


//Controller
class controller{
    constructor(){};
    projects = {};
    createProject(name){
        const p = new project(name);
        this.projects[name] = p.tasks;
    }
    createTask(prj='default', title, desc, dueD, priority, notes){
        const t = new todos(prj, title, desc, dueD, priority, notes)
        this.projects[prj].push(t);
    }
}

const control = new controller();
control.createProject("project1");
control.createTask('project1', "Do HomeWork", "History Homework hasn't been done!", "15/2/2026", "High", "Do it after lunch");
control.createTask('project1', "Do HomeWork", "History Homework hasn't been done!", "15/2/2026", "High", "Do it after lunch");
control.createTask('project1', "Do HomeWork", "History Homework hasn't been done!", "15/2/2026", "High", "Do it after lunch");
control.createProject("project2");
control.createTask('project2', "Do HomeWork", "History Homework hasn't been done!", "15/2/2026", "High", "Do it after lunch");
control.createProject("project3");
control.createTask('project3', "Do HomeWork", "History Homework hasn't been done!", "15/2/2026", "High", "Do it after lunch");
console.log(control.projects);
