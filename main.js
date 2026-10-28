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

    //QUI DENTRO C'È IL FOREACH
    function fetchTasks() {
        fetch(API_URL)
            .then((res) => res.json()) //converte la risposta in formato json
            .then((data) => {
                // una volta ottenuto i dati
                //console.log(data);
                //svuotare la tabella
                taskList.innerHTML = ""; //innesto all html -> in questo caso nulla quindi svuoto
                //serve un ciclo per andare a costruire dinamicamente
                //ogni riga di ogni singolo task che avrà con sè il propri bottoni di edit e delete
                //quindi per ogni task ricevuto dall endopoint devo creare un tag <li> dentro all <ul> dell html
                //CHIAMATA GET IMPLICITA -> RECUPERA I DATI TASK
                data.forEach((task) => {
                    //creo un nuovo elemento <li> e uno spazio/tag per inserire il testo <span>
                    const li = document.createElement("li");
                    const span = document.createElement("span");
                    //aggiungo il titolo del task allo span
                    span.textContent = task.title;

                    if (task.completed) {
                        span.classList.add("done");
                    }

                    //bottone di edit
                    const editBtn = document.createElement("button");
                    editBtn.classList.add("toggle");
                    editBtn.textContent = "✅";
                    editBtn.onclick = () => toggleComplete(task);

                    const toggleBtn = document.createElement("button");
                    toggleBtn.classList.add("toggle");
                    toggleBtn.textContent = "🖋️";
                    toggleBtn.onclick = () => editTask(task);

                    const deleteBtn = document.createElement("button");
                    deleteBtn.classList.add("toggle");
                    deleteBtn.textContent = "❌";
                    deleteBtn.onclick = () => deleteTask(task.id);

                    //btnGroup creo div per il gruppo di bottoni,
                    const btnGroup = document.createElement("div");
                    btnGroup.append(editBtn, deleteBtn, toggleBtn);

                    //appendo all html il titolo del task che è nekllo span al tag li e il gruppo di bottoni
                    li.append(span, btnGroup);
                    taskList.appendChild(li);
                });
            });
    }

    //FUNZIONE PRINCIPALE
    //inserimento di un nuovo task al click di un bottone
    addTaskBtn.addEventListener("click", () => {
        //prendo il valore dall'input e tolgo gli spazi con il trim();
        const title = newTaskInput.value.trim();

        if (title) {
            fetch(API_URL, {
                method: "POST", //metodo che crea un titlo
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ title }), //crea il task
            }).then(() => {
                newTaskInput.value = ""; //svuoto il campo di input

                //ricarico i task con il nuovo task aggiunto
                fetchTasks();
            });
        }
    });

    //FUNZIONE DI UPDATE (MODIFICA) (MODIFICARE IL TITOLO DEL TASK)
    //questa funzione di prende il task
    function editTask(task) {
        //chiedo il nuovo titolo all'utente tramite prompt
        const nuovoTitolo = prompt("Modifica il titolo del task: ", task.title);

        if (nuovoTitolo !== null && nuovoTitolo.trim() !== "") {
            fetch(`${API_URL}/${task.id}`, {
                method: "PUT", //metodo che modifica un titlo
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    ...task,
                    title: nuovoTitolo.trim(),
                }), //modifica il task tramite spread operetor ovvero i 3 puntini ...
            }).then(() => {
                //ricarico i task con il nuovo task aggiunto
                fetchTasks();
            });
        }
    }

    //FUNZIONE DI DELETE (CANCELLARE TASK)
    function deleteTask(id) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE", //metodo che cancella un task
        }).then(() => {
            //ricarico i task con il nuovo task aggiunto
            fetchTasks();
        });
    }

    //FUNZIONE DI UPDATE PER CAMBIARE STATO DONE NOTDONE
    function toggleComplete(task) {
        fetch(`${API_URL}/${task.id}`, {
            method: "PUT", //metodo che modifica un titlo
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...task, completed: !task.completed }), //modifica il task tramite spread operetor ovvero i 3 puntini ...
        }).then(() => {
            //ricarico i task con il nuovo task aggiunto
            fetchTasks();
        });
    }

    fetchTasks();
});
