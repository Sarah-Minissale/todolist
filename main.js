//Evento che attende che il DOM sia completamente caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
    //endpoint servito dalla libreria json-server
    const API_URL = "http://localhost:3000/todos";

    //questa è la ul
    const taskList = document.getElementById("task-list");

    //questa è l input
    const newTaskInput = document.getElementById("new-task");

    //questa è del button add task
    const addTaskBtn = document.getElementById("add-task");

    function fetchTasks() {
        fetch(API_URL)
            .then((res) => res.json()) //converte la risposta in formato json
            .then((data) => {
                // una volta ottenuto i dati
                console.log(data);
            });
    }

    fetchTasks();
});
