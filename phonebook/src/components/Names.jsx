const Names = ({ persons, removePerson }) => {
  return (
    <p>
      {persons.name} {persons.number}
      <button onClick={() => removePerson(persons.id)}>delete</button>
    </p>
  )
}

export default Names;