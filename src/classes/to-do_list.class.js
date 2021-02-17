// 108

import { ToDo } from "./to-do.class";

export class ToDo_List {

    constructor() {

        // this.arr_ToDos = [];

        this.mt_LStorage_Rescue();
    }

    // ADD NEW
    mt_ToDoList_AddNew(inToDo) {
        this.arr_ToDos.push(inToDo);
        this.mt_LStorage_Save();
    }

    // DELETE ID
    mt_ToDoList_Delete(inId) {
        // != compara valor, !== compara valor y tipo
        this.arr_ToDos = this.arr_ToDos.filter(xTodo => xTodo.id != inId);
        this.mt_LStorage_Save();
    }

    // COMPLETE
    mt_ToDoList_Completed(inId) {

        for (const wTodo of this.arr_ToDos) {
            // const wNroId = parseInt(inId);
            // console.log(inId, wTodo.id, wNroId);

            // == compara valor , === valor y tipo
            if (wTodo.id == inId) {
                wTodo.completado = !wTodo.completado;
                this.mt_LStorage_Save()
                break;
            }
        }
    }

    // DELETE-ALL-COMPLETED
    // filtrar los que no están completados, excluyendo los completados
    mt_ToDoList_DeleteCompleted() {
        this.arr_ToDos = this.arr_ToDos.filter(xTodo => !xTodo.completado);
        this.mt_LStorage_Save();
    }

    // SAVE DATA IN LOCAL STORAGE
    // reemplaza cada vez el LST completo con el arreglo
    mt_LStorage_Save() {
        localStorage.setItem('keyTask', JSON.stringify(this.arr_ToDos));
    }

    // RESCUE DATA from L.STORAGE
    mt_LStorage_Rescue() {

        // if (localStorage.getItem('keyTask')) {
        //     this.arr_ToDos = JSON.parse(localStorage.getItem('keyTask'));
        //     console.log('LStorage:', this.arr_ToDos);
        // } else {
        //     // Inicializa LST
        //     this.arr_ToDos = [];
        // }

        this.arr_ToDos = (localStorage.getItem('keyTask')) ?
            JSON.parse(localStorage.getItem('keyTask')) : [];

        // mtToDo_FromJson es estático para transformar de objetos dejarlos en Instancias
        // this.arr_ToDos = this.arr_ToDos.map(xElemObjeto => ToDo.mtToDo_FromJson(xElemObjeto));

        // escrito de otra forma
        this.arr_ToDos = this.arr_ToDos.map(ToDo.mtToDo_FromJson);

    }
}