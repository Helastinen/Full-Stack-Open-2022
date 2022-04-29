/* eslint-disable no-useless-escape */
import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const style = {
  marginBottom: 5,
}

const Anecdote = ({ anecdote, addVote }) => {
  return (
    <div style={style}>
      <li>
        {anecdote.content}
      </li>
      <div>
        has {anecdote.votes}{" "}
        <button onClick={() => addVote(anecdote)}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  //* get filtered anecdotes and sort them by vote amount.
  const filteredAndSortedAnecdotes = useSelector(state => state.anecdotes
    .filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )  
    .sort((a, b) => b.votes - a.votes)
  )
  
  const addVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted \"${anecdote.content}\"`))
    
    setTimeout(() => 
      dispatch(removeNotification()),
      5000
    )
  }
  
  return (
    <div>
      {filteredAndSortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} addVote={addVote} />
        </div>
      )}
    </div>
  )
}

export default AnecdoteList