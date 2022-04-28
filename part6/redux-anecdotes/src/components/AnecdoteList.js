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
  const anecdotes = useSelector(state => state.anecdotes)
  const filterTerm = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const addVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted \"${anecdote.content}\"`))
    setTimeout(() => 
      dispatch(removeNotification()),
      5000
    )
  }

  //* show only filtered anecdotes and sort them by vote amount.
  return (
    <div>
      {anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filterTerm.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} addVote={addVote} />
        </div>
      )}
    </div>
  )
}

export default AnecdoteList