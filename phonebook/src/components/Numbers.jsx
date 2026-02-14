import Names from './Names' 
const Numbers = ({persons, filter, removePerson}) => {
  // Tu lógica de filtrado restaurada y protegida
  const serchfilter = (element) => {
    return persons.filter((p) => {
      // Usamos encadenamiento opcional para que no rompa si name es undefined
      return p.name?.toString().toLowerCase().includes(element.toLowerCase())
    })
  }

  let printName = serchfilter(filter)
  const displayList = filter.length === 0 ? persons : printName

  return (
    <div className="divide-y divide-slate-100">
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact List</h2>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {displayList.map(p => (
          <Names 
            key={p.id || p.name} 
            persons={p} 
            removePerson={removePerson} 
          />
        ))}
        {displayList.length === 0 && (
          <div className="px-6 py-10 text-center text-slate-400 text-sm">
            No contacts found
          </div>
        )}
      </div>
    </div>
  )
}

export default Numbers