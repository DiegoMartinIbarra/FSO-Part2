const Filter = ({filter, handleFilter}) =>{

    return(
        <div> filter <input value={filter} onChange={handleFilter} /> </div>
    )
}

export default Filter;