import '../css/01_style.css';
// 
import { ToDo } from '../classes';
import { cl_ToDoList } from '../index'
// 
// Referencias en el HTML

const web_divToDoList = document.querySelector('.todo-list');
const web_InpNewTask = document.querySelector('.new-todo');
const web_DeleteAllCompleted = document.querySelector('.clear-completed');
const web_ULFilters = document.querySelector('.filters');
const web_AnchorTagFilter = document.querySelectorAll('.filtro');

// ----------------------------------------
// CREA ELEMENTO EN HTML
export const fn01_CrearToDoHTML = (inToDo) => {

    // String del Html
    const html_ToDo = `
        <li class="${ (inToDo.completado) ? 'completed' : '' }" data-id="${ inToDo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (inToDo.completado) ? 'checked' : '' }>
                <label> ${inToDo.task} </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    // Creando Elemento div en el html, contenedor de los "li"
    // podría ser el un "li", pero requiere definir sus clases y el Id
    const web_div = document.createElement('div');

    web_div.innerHTML = html_ToDo;

    // Agrego el contenedor div a la clase list, pero con esta forma se crea un div para cada "li"
    // web_divToDoList.append(web_div);  // esto se puede revisar en el navegador -> inspeccionar 

    // Agregamos el primer hijo del div-contenedor, que es un LI, (con esto se elimina el div)
    web_divToDoList.append(web_div.firstElementChild);

    // Retorna 
    return web_div.firstElementChild;
}

// ----------------------------------------
// LISTEN - EVENTS

// INPUT TASK
web_InpNewTask.addEventListener('keyup', (event) => {
    // console.log(event.keyCode);  // capturar tecla presionada

    // Si keyCode [13=Enter] y  event.target.value;  que es = a web_InpNewTask.value
    if (event.keyCode === 13 && web_InpNewTask.value.length > 0) {
        // Arma Nueva Tarea
        const wNewTask = new ToDo(web_InpNewTask.value);
        // Cargo NewTask en ToDoList
        cl_ToDoList.mt_ToDoList_AddNew(wNewTask);
        // Html
        fn01_CrearToDoHTML(wNewTask);
        // Limpia Input
        web_InpNewTask.value = '';

        web_DeleteAllCompleted.style.display = '';

    }

});

// LIST: CHECK & DELETE
web_divToDoList.addEventListener('click', (event) => {
    // console.log('click');
    // saber que elemento hizo click
    // console.log(event.target.localName);

    // localName puede ser: label, input (check), X-button:
    const wNombre_ElementoOnClick = event.target.localName;

    // Div contenedor de los elementos: label, input, button
    // const wElementoTodo = event.target.parentElement; 

    // Li contenedor del ID
    const wElementoTodo_Li = event.target.parentElement.parentElement;
    // console.log(wElementoTodo_Li);

    // atributo de data-id
    const wElementoTodo_Id = wElementoTodo_Li.getAttribute('data-id');
    // console.log(wElementoTodo_Id);

    // INPUT: CHECK 
    if (wNombre_ElementoOnClick.includes('input')) {
        cl_ToDoList.mt_ToDoList_Completed(wElementoTodo_Id);

        // DELETE: Button X
    } else if (wNombre_ElementoOnClick.includes('button')) {
        cl_ToDoList.mt_ToDoList_Delete(wElementoTodo_Id);
        // Elminar html
        web_divToDoList.removeChild(wElementoTodo_Li);
    }

    // activa Tachado, si está desactivado lo activa
    wElementoTodo_Li.classList.toggle('completed');

    // console.log(cl_ToDoList);

})

// DELETE ALL COMPLETED

web_DeleteAllCompleted.addEventListener('click', (event) => {

    let wItems_Li = web_divToDoList.children.length - 1;

    if (wItems_Li >= 0) {
        // Eliminar completados
        cl_ToDoList.mt_ToDoList_DeleteCompleted();

        // Eliminar hijos div, partiendo desde el final (n a 0)
        for (let xi = wItems_Li; xi >= 0; xi--) {
            // 
            const wTareaLi = web_divToDoList.children[xi];
            // 
            if (wTareaLi.classList.contains('completed')) {
                web_divToDoList.removeChild(wTareaLi);
            };
        };
        // 
        wItems_Li = web_divToDoList.children.length - 1;
        if (wItems_Li < 0) {
            web_DeleteAllCompleted.style.display = 'none';
        }
    }
});

// FILTROS: Pendientes, Completados

web_ULFilters.addEventListener('click', (event) => {
    // console.log(event.target.text);

    // Remueve la clase selected de todos los filtros que la tengan
    // Esto es para mover el box al Filtro que se está visualizando
    web_AnchorTagFilter.forEach(xElemto => xElemto.classList.remove('selected'));
    // console.log(event.target);
    // Agregamos a todos los Filtros la clase
    event.target.classList.add('selected');

    // 
    const wFiltro = event.target.text;
    // no hay filtro. sale
    if (!wFiltro) { return; }
    // 
    for (const xElemento of web_divToDoList.children) {
        // console.log(xElemento);
        // clase puesta en el CSS
        xElemento.classList.remove('hidden');
        // 
        const wCompletado = xElemento.classList.contains('completed');
        // 
        switch (wFiltro) {

            case 'Pendientes':
                if (wCompletado) {
                    xElemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!wCompletado) {
                    xElemento.classList.add('hidden');
                }
                break;
        }
    }


});