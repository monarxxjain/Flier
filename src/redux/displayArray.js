import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';
import X from "../data1.json";
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const actualDestinations = [];
let initialDisplayArray=[];
alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
  if (departureFrom == item.Departure && arrivalTo == item.Arrival) {
    actualDestinations.push(item);
  }
});
const tempDestinationFlights = JSON.parse(JSON.stringify(actualDestinations));
tempDestinationFlights.map((item) => {
  let First;
  let Last;
  item.ProductBrandOptions.map((flight, k) => {
    First = alldata.ReferenceList[0].Flight.filter((it) => {
      return it.id === flight.flightRefs[0];
    });
    Last = alldata.ReferenceList[0].Flight.filter((it) => {
      return it.id === flight.flightRefs[flight.flightRefs.length - 1];
    });
    flight.DepartureTime = First[0].Departure.date;
    flight.ArrivalTime = Last[0].Arrival.date;
    let alp = flight.ProductBrandOffering.map((it) => {
      let DeepFlight = JSON.stringify(flight);
      DeepFlight = JSON.parse(DeepFlight);
      DeepFlight.ProductBrandOffering = [];
      DeepFlight.ProductBrandOffering.push(it);
      return DeepFlight;
    });
    initialDisplayArray=[...initialDisplayArray,...alp];
  });
});

const initialState = {
  displayArray: [...initialDisplayArray],
}

export const displayArraySlice = createSlice({
  name: 'displayArray',
  initialState,
  reducers: {
    replacedisplayArray: (state, action) => {
      const newarr=[...action.payload]
      newarr.sort(GetPriceSort());      // uncomment this if want to sort by price
      state.displayArray=[...newarr]
    },
    joindisplayArray: (state, action) => {
      const newarr=[...state.displayArray,...action.payload];
      newarr.sort(GetPriceSort());      // uncomment this if want to sort by price
      state.displayArray=[...newarr];
    },
    timeSorteddisplayArray: (state, action) => {
        const newarr=[...state.displayArray]
        newarr.sort(GetTimeSort());
        state.displayArray=[...newarr]
      },
  },
})

export const { replacedisplayArray,joindisplayArray,timeSorteddisplayArray } = displayArraySlice.actions

export default displayArraySlice.reducer