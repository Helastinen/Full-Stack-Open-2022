import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
export const {createAnecdote, vote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions