// Style
import './css/styles.css';
// Clases
import { ToDo_List } from './classes'
import { fn01_CrearToDoHTML } from './js/01_component';


// Instancia de Lista de Tareas y la exporta
export const cl_ToDoList = new ToDo_List();

// console.log(cl_ToDoList.arr_ToDos);

// Carga Html desde Arreglo: 
// 2 Formas de hacer lo mismo, forEach permite abreviar, porque no retorno de valores
// cl_ToDoList.arr_ToDos.forEach(xTask => fn01_CrearToDoHTML(xTask));
cl_ToDoList.arr_ToDos.forEach(fn01_CrearToDoHTML);

// Se observa que es un arreglo de Objetos y no de instancias..
// consola: index.js:26 (4) [{…}, {…}, {…}, {…}]

// Si creamos una instancia 
// const cl_ToDoTarea = new ToDo('Aprender JavaScript');
// cl_ToDoList.mt_ToDoList_AddNew(cl_ToDoTarea)

// Ver la diferencia de valores en el arreglo
console.log(cl_ToDoList.arr_ToDos);
// Al ser cargado en el LSTorage, las propiedades no se pierden, pero SI todos sus métodos
// si hubiera un método para imprimir una tarea, 
// esto no sería posible porque se perdieron todos los métodos
// cl_ToDoList.arr_ToDos[0].mtToDo_Imprimir();  // implementado el método estatico se recuperan los methods






// --------------------------------
// --------------------------------
// TESTING
// Instancia de Tareas
// const cl_ToDoTarea = new ToDo('Aprender JavaScript');

// Carga Tarea en Lista
// cl_ToDoList.mt_ToDoList_AddNew(cl_ToDoTarea);

// console.log(cl_ToDoList);

// fn01_CrearToDoHTML(cl_ToDoTarea);

// --------------------------------
// LOCAL STORAGE
// localStorage.setItem('myKey', 'ABC12345');
// sessionStorage.setItem('Clave', 'rm1123');
// setTimeout(() => {
//     localStorage.removeItem('myKey');
//     sessionStorage.removeItem('Clave');
// }, 1500);