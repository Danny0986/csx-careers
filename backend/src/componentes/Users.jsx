function Users() {

    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const loadUsers = async () => {

        setLoading(true);
        setError("");

        try {

            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();

            setUsers(data);

        } catch {

            setError("No se pudieron cargar los usuarios.");

        } finally {

            setLoading(false);

        }

    };

    return (
        <div>

            <h2>Usuarios</h2>

            <button className="load-users-btn" onClick={loadUsers}>
                Cargar usuarios
            </button>


            {loading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Cargando usuarios...</p>
                </div>
            )}


            {error && (
                <div className="error">
                    {error}
                </div>
            )}


            <div className="grid">

                {users.map(user => (

                    <div className="user-card" key={user.id}>

                        <p>
                            <strong>Nombre:</strong> {user.name}
                        </p>

                        <p>
                            <strong>Correo:</strong> {user.email}
                        </p>

                        <p>
                            <strong>Ciudad:</strong> {user.address.city}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}