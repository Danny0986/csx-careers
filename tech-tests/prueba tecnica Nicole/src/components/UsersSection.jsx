import { useState } from 'react'

const Names = [
  'Ana Garcia',
  'Carlos Mendoza',
  'Lucia Torres',
  'Miguel Herrera',
  'Sofia Ramirez',
  'Diego Castillo',
  'Valentina Ruiz',
  'Andres Morales',
  'Camila Navarro',
  'Mateo Vargas',
]

const ecuadorCities = [
  'Quito',
  'Guayaquil',
  'Cuenca',
  'Manta',
  'Loja',
  'Ambato',
  'Portoviejo',
  'Riobamba',
  'Machala',
  'Ibarra',
]

const Emails = [
  'ana.garcia@gmail.com',
  'carlos.mendoza@gmail.com',
  'lucia.torres@gmail.com',
  'miguel.herrera@gmail.com',
  'sofia.ramirez@gmail.com',
  'diego.castillo@gmail.com',
  'valentina.ruiz@gmail.com',
  'andres.morales@gmail.com',
  'camila.navarro@gmail.com',
  'mateo.vargas@gmail.com',
]

function UsersSection() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showUsers, setShowUsers] = useState(false)

  function waitOneSecond() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }

  async function handleToggleUsers() {
    if (showUsers) {
      setShowUsers(false)
      return
    }

    setLoading(true)
    setError('')
    setUsers([])

    try {
      const [response] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        waitOneSecond(),
      ])

      if (!response.ok) {
        throw new Error(`Error ${response.status}: no se pudo obtener la informacion.`)
      }

      const data = await response.json()

      if (!Array.isArray(data)) {
        throw new Error('La informacion recibida no tiene el formato esperado.')
      }

      setUsers(data)
      setShowUsers(true)
    } catch (requestError) {
      setError(requestError.message || 'Ocurrio un error al cargar los usuarios.')
      setShowUsers(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="users-section">
      <div className="users-header">
        <div>
          <h2>Usuarios</h2>
        </div>

        <button type="button" onClick={handleToggleUsers} disabled={loading}>
          {loading
            ? 'Cargando...'
            : showUsers
              ? 'Ocultar usuarios'
              : 'Cargar usuarios'}
        </button>
      </div>

      {error && (
        <p className="users-error" role="alert">
          {error}
        </p>
      )}
      {loading && <p className="users-loading">Cargando...</p>}
      {!loading && !error && !showUsers && (
        <p className="users-empty">
          Presiona el boton para cargar los usuarios.
        </p>
      )}

      {showUsers && (
        <div className="users-list">
          {users.map((user, index) => (
            <article className="user-card" key={user.id}>
              <h3>{Names[index] ?? user.name}</h3>
              <p>{Emails[index] ?? user.email}</p>
              <span>{ecuadorCities[index] ?? user.address.city}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default UsersSection
