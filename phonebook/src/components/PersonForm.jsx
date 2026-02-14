const PersonForm = ({addPersons, newName, handleNewNameChange, newNumber, handleNewNumberChange}) => {
  return (
    <form onSubmit={addPersons} className="space-y-4">
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
          Full Name
        </label>
        <input 
          value={newName} 
          onChange={handleNewNameChange} 
          placeholder="e.g. Jane Doe"
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
          Phone Number
        </label>
        <input 
          value={newNumber} 
          onChange={handleNewNumberChange} 
          placeholder="e.g. +1 555-0000"
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-indigo-600 active:transform active:scale-[0.98] transition-all shadow-md text-sm mt-2"
      >
        Add to Agenda
      </button>
    </form>
  )
}

export default PersonForm