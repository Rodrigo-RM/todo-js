// Clase 107. 

import { cl_ToDoList } from "..";

export class ToDo {

    // este static permite tomar los objetos del LStorage, destructurados
    // para crear una nueva instancia de ToDo, cargar sus propiedades 
    // y a la vez recuperar los métodos que aplican a cada instancia

    static mtToDo_FromJson({ id, task, completado, recordDate }) {

        const wTemp_Task = new ToDo(task);
        wTemp_Task.id = id;
        wTemp_Task.completado = completado;
        wTemp_Task.recordDate = recordDate;

        return wTemp_Task;
    }

    constructor(inTarea) {
        this.task = inTarea;
        this.id = new Date().getTime();
        this.completado = false;
        this.recordDate = new Date();
    }

    mtToDo_Imprimir() {
        console.log(`Nombre y id: ${this.task} - ${this.id}`);
    }
}