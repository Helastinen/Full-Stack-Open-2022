import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    dispatch(createAnecdote(content))
  }
  
  return (
    <div>
      <h2>Create a new anecdote</h2>

      <form onSubmit={addAnecdote}>
        <div><input type="text" name="anecdote"/></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm