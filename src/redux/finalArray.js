import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';
import X from "../data1.json";
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const actualDestinations = [];
let initialFinalArray=[];
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
    initialFinalArray=[...initialFinalArray,...alp];
  });
});

const initialState = {
  finalArray: [...initialFinalArray],
}

export const finalArraySlice = createSlice({
  name: 'finalArray',
  initialState,
  reducers: {
    replacefinalArray: (state, action) => {
      const newarr = [...action.payload]
      newarr.sort(GetPriceSort());
      state.finalArray = [...newarr]
    },
    joinfinalArray: (state, action) => {
      const newarr = [...state.finalArray, ...action.payload];
      newarr.sort(GetPriceSort());
      state.finalArray = [...newarr];
    },
    timeSortedfinalArray: (state, action) => {
      const newarr = [...state.finalArray]
      newarr.sort(GetTimeSort());
      state.finalArray = [...newarr]
    },
  },
})

export const { replacefinalArray, joinfinalArray, timeSortedfinalArray } = finalArraySlice.actions

export default finalArraySlice.reducer