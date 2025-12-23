export class TaskManager {
    constructor(id, title, completed) {
        Object.defineProperty(this, 'id', {
        value: id,
        writable: false,   
        enumerable: true,
        });
        this.title = title;
        this.completed = completed;
    }
    toggle(){
        return new Task (this.id, this.title, !this.completed); 
    }
}

