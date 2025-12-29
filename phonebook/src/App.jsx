import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personsService from './services/personsService'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
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
   personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // no renderizar nada si notes aún es null
      if (persons == null) { 
      return null 
    }
 // console.log('render', persons.length, 'notes')

const addPersons = (event) => {
    event.preventDefault()

    const findperson = persons.find(person => person.name === newName);
    if (findperson)
    {
      const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      
      if (!ok) return;

      const personsUpdate = {
            ...findperson,
            number: newNumber
          };

    personsService
      .update(findperson.id, personsUpdate)
      .then(returnedPerson => {
        setPersons(
          persons.map(p =>
            p.id !== findperson.id ? p : returnedPerson
          )
        );
      setNewName('')
      setNewNumber('') 
      setErrorMessage(
          `Information of '${findperson.name}' was updated`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Note '${findperson.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== findperson.id))
      })

    }
    else
    {

        const personsObject = {
          name: newName,
          important: Math.random() < 0.5,
          number: newNumber
        }

    personsService
      .create(personsObject)
        .then(returnedPerson => {
        // console.log(response)
         setPersons(persons.concat(returnedPerson))
         setNewName('')
         setNewNumber('') 
         setErrorMessage(
          `Added '${newName}' `
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  
      })
      .catch(error => {
        setErrorMessage(
          `Person '${newName}' was not ingresed due an error`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

const handleNewNameChange = (event) => {
  /*console.log('button clicked', event.target)*/
  setNewName(event.target.value)
}

const handleNewNumberChange = (event) =>{
  setNewNumber(event.target.value)
}

const handleFilter = (event) =>{
 setFilter(event.target.value)
}

const removePerson = (id) => {
  const normalizedId = String(id);

  const personFiltered = persons.find(
    p => String(p.id) === normalizedId
  );

  if (!personFiltered) {
    console.log("No se encontró persona con id:", normalizedId);
    return;
  }

 
  const ok = window.confirm(`¿Eliminar a ${personFiltered.name}?`);

  if (!ok) return; 

  personsService
    .remove(normalizedId)
    .then(() => {
      setPersons(
        persons.filter(p => String(p.id) !== normalizedId)
      );
      setErrorMessage(
          ` '${personFiltered.name}' was removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })
    .catch(error => {
        setErrorMessage(
          `Note '${personFiltered.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== personFiltered.id))
      })
;
};




  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilter={handleFilter} />

      <h3>add a new</h3>
      <PersonForm addPersons={addPersons} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />     
      
      <Numbers persons={persons} filter={filter} removePerson={removePerson} />
      
      
      {/* 
      <h2>Numbers</h2>
         { filter.length === 0 ? persons.map(persons => <Names key={persons.name} persons={persons} />) :  printName.map(persons => <Names key={persons.id} persons={persons} />)}
         
      */
         /*<ul>
          {persons.map(person => 
             <li key={person.id}>
                {person.name} {person.number}
            </li>
          )}
        </ul>*/}

    </div>
  )
}

export default App