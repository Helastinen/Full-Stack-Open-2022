import { useSelector, useDispatch } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, addVote }) => {
  return (
    <>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addVote(anecdote.id)}>Vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
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