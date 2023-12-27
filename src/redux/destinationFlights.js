import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  destinationFlightsArray: [],
}

export const destinationFlightsSlice = createSlice({
  name: 'destinationFlights',
  initialState,
  reducers: {
    addDestinations: (state, action) => {
      state.destinationFlightsArray = [...action.payload]
    },
    addFlight: (state, action) => {
      state.destinationFlightsArray = [...state.destinationFlightsArray, action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addDestinations,addFlight } = destinationFlightsSlice.actions

export default destinationFlightsSlice.reducer