import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    dispatch(createAnecdote(content))
    dispatch(setNotification(`New anecdote \"${content}\" created`))
    setTimeout(() => 
      dispatch(removeNotification()),
      5000
    )
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