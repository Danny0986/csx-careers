function TaskForm({ addTask }) {

  const [text, setText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      alert("Ingrese una tarea");
      return;
    }

    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Ingrese una tarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">
        Agregar
      </button>

    </form>
  );
}