const Names = ({ persons, removePerson }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors group">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {persons.name}
        </span>
        <span className="text-sm text-slate-500 font-mono">
          {persons.number}
        </span>
      </div>
      <button 
        onClick={() => removePerson(persons.id)}
        className="text-xs font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-100 rounded-md px-3 py-1.5 transition-all shadow-sm"
      >
        Delete
      </button>
    </div>
  )
}

export default Names