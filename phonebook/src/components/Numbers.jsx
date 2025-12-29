import Names from './Names'

const Numbers = ({persons, filter, removePerson}) => {

const serchfilter = (element) => {
    var resultElements = persons.filter((persons) =>{
      if(persons.name.toString().toLowerCase().includes(element.toLowerCase()) ){
        return persons;
      }
    });
    return resultElements;
}
  let printName = serchfilter(filter);

    return(
        <div>
        <h2>Numbers</h2>
         { filter.length === 0 ? persons.map(persons => <Names key={persons.name} persons={persons} removePerson={removePerson}  />) :  printName.map(persons => <Names key={persons.id} persons={persons} removePerson={removePerson} />)}
        </div>
    )
}

export default Numbers;