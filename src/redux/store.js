import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import destinationFlightsReducer, { addDestinations } from './destinationFlights'
import brandReducer from './brand'
import flightReducer from './flight'
import flightNoReducer from './flightNo'
import finalArrayReducer, { replacefinalArray } from './finalArray'
import displayArrayReducer, { replacedisplayArray } from './displayArray'
import finalArrayDupReducer, { replacefinalArrayDup } from './finalArrayDup'
import allBrandsArrayReducer, { replaceallBrandsArray } from './allBrands'
import allFlightsArrayReducer, { replaceallFlightsArray } from './allFlights'
import returnFlightArrayReducer, { joinreturnFlightsArray } from './returnFlights'
import priceFilterReducer, { updateAbsoluteMaxPrice, updateMinPrice } from './priceFilter'
import allDataReducer, { setAllData } from './allData'
import { GetAllBrands, GetAllFlights, GetAllReturns, InitialDisplayFunction, InitialReturnHandlerFunction, getAllDestinations, setAbsoluteMaxPrice, setMinPrice } from './HelperFunctions'
const store = configureStore({
  reducer: {
    allData:allDataReducer,
    destinationFlights: destinationFlightsReducer,
    brand: brandReducer,
    flight: flightReducer,
    flightNo: flightNoReducer,
    finalArray: finalArrayReducer,
    displayArray: displayArrayReducer,
    finalArrayDup: finalArrayDupReducer,
    allBrandsArray: allBrandsArrayReducer,
    allFlightsArray: allFlightsArrayReducer,
    returnFlightArray: returnFlightArrayReducer,
    priceFilter: priceFilterReducer,
  },
  middleware: () => [thunk],  // Correctly applying redux-thunk middleware
});

const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/CatalogProductOfferingsResponse');
      const X = await response.json();

      // Dispatch the fetched data to the reducers
      dispatch(setAllData(X));
      dispatch(replacedisplayArray(InitialDisplayFunction(X)));
      dispatch(replacefinalArray(InitialDisplayFunction(X)));
      dispatch(replacefinalArrayDup(InitialReturnHandlerFunction(X)));
      dispatch(replaceallBrandsArray(GetAllBrands(X)));
      dispatch(joinreturnFlightsArray(GetAllReturns(X)));
      dispatch(replaceallFlightsArray(GetAllFlights(X)));
      dispatch(addDestinations(getAllDestinations(X)));
      dispatch(updateAbsoluteMaxPrice(setAbsoluteMaxPrice(X)));
      dispatch(updateMinPrice(setMinPrice(X)));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
store.dispatch(fetchData());

export default store;