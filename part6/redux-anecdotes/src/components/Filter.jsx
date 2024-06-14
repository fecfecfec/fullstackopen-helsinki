import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilter = (event) => {
    dispatch(filterChange(event.target.value))
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      <h3>Filter</h3>
      <input
        name='filter'
        onChange={handleFilter}
        placeholder='Filter list...'
      />
    </div>
  )
}

export default Filter
