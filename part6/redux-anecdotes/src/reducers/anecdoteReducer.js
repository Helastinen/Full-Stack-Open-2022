import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      
      state.push(newAnecdote)
    },

    vote(state, action) {
      const id = action.payload
      const anecdotetoChange = state.find(anecdote => anecdote.id === id)
      
      const changedAnecdote = {
        ...anecdotetoChange,
        votes: anecdotetoChange.votes + 1
      }

      return state.map(anecdote => 
        anecdote.id === id 
          ? changedAnecdote
          : anecdote
      )
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const {createAnecdote, vote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions