const Filter = ({filter, handleFilter}) => {
  return (
    <div className="relative group">
      <input 
        value={filter} 
        onChange={handleFilter} 
        placeholder="Search contacts..."
        className="w-full pl-4 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
      />
    </div>
  )
}

export default Filter