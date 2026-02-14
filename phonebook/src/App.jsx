import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personsService from './services/personsService'

const Notification = ({ message }) => {
  if (message === null) return null
  const isError = message.toLowerCase().includes('removed') || message.toLowerCase().includes('error')
  
  return (
    <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg border-l-4 transition-all duration-500 z-50 ${
      isError ? 'bg-red-50 border-red-500 text-red-800' : 'bg-emerald-50 border-emerald-500 text-emerald-800'
    }`}>
      <p className="font-medium">{message}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) 

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  if (persons == null) return null


  const addPersons = (event) => {
    event.preventDefault()
    const findperson = persons.find(person => person.name === newName)

    if (findperson) {
      const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!ok) return

      const personsUpdate = { ...findperson, number: newNumber }

      personsService
        .update(findperson.id, personsUpdate)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== findperson.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('') 
          setErrorMessage(`Information of '${findperson.name}' was updated`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
        .catch(error => {
          setErrorMessage(`Note '${findperson.name}' was already removed from server`)
          setTimeout(() => setErrorMessage(null), 5000)
          setPersons(persons.filter(p => p.id !== findperson.id))
        })
    } else {
      const personsObject = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(personsObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('') 
          setErrorMessage(`Added '${newName}'`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
        .catch(error => {
          setErrorMessage(`Person '${newName}' was not ingresed due an error`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
  }

  const removePerson = (id) => {
    const normalizedId = String(id)
    const personFiltered = persons.find(p => String(p.id) === normalizedId)

    if (!personFiltered) return

    const ok = window.confirm(`¿Eliminar a ${personFiltered.name}?`)
    if (!ok) return 

    personsService
      .remove(normalizedId)
      .then(() => {
        setPersons(persons.filter(p => String(p.id) !== normalizedId))
        setErrorMessage(`'${personFiltered.name}' was removed from server`)
        setTimeout(() => setErrorMessage(null), 5000)
      })
      .catch(error => {
        setErrorMessage(`Note '${personFiltered.name}' was already removed from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setPersons(persons.filter(p => p.id !== personFiltered.id))
      })
  }

  const handleFilter = (event) => setFilter(event.target.value)
  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)

  // --- RENDERIZADO CON TAILWIND ---

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
      <Notification message={errorMessage} />
      
      <div className="max-w-md mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Nexus Contacts</h2>
          <p className="mt-2 text-slate-600 italic">Phonebook Portfolio Project </p>
        </header>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Search</h3>
            <Filter filter={filter} handleFilter={handleFilter} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Add Entry</h3>
            <PersonForm 
              addPersons={addPersons} 
              newName={newName} 
              handleNewNameChange={handleNewNameChange} 
              newNumber={newNumber} 
              handleNewNumberChange={handleNewNumberChange} 
            />     
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <Numbers persons={persons} filter={filter} removePerson={removePerson} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App