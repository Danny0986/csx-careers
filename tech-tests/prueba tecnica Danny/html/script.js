function agregarTarea() {

    const input = document.getElementById("tarea");
    const texto = input.value.trim();

    if (texto === "") {
        alert("Ingrese una tarea");
        return;
    }

    const card = document.createElement("div");
    card.className = "card";

    const tarea = document.createElement("span");
    tarea.textContent = texto;

    tarea.addEventListener("click", () => {
        tarea.classList.toggle("completada");
    });

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";

    eliminar.addEventListener("click", () => {
        card.remove();
    });

    card.appendChild(tarea);
    card.appendChild(eliminar);

    document.getElementById("listaTareas").appendChild(card);

    input.value = "";
}