import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"

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
        <button onClick={() => addVote(anecdote.id)}>Vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const addVote = (id) => {
    dispatch(vote(id))
  }

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} addVote={addVote} />
        </div>
      )}
    </div>
  )
}

export default AnecdoteList