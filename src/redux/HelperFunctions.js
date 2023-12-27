import { GetPriceSort } from "../components/Utils/UtilityFunctions";

export function setAbsoluteMaxPrice(X) {
    const initialDisplayArray = InitialDisplayFunction(X);
    let constMaxt = "";
    if (initialDisplayArray.length !== 0) {
        const newArr = JSON.parse(JSON.stringify(initialDisplayArray));
        newArr.sort(GetPriceSort());
        constMaxt = newArr[newArr.length - 1]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice
    }
    return constMaxt;
}
export function setMinPrice(X) {
    const initialDisplayArray = InitialDisplayFunction(X);
    let constMin = "";
    if (initialDisplayArray.length !== 0) {
        const newArr = JSON.parse(JSON.stringify(initialDisplayArray));
        newArr.sort(GetPriceSort());
        constMin = newArr[0]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice
    }
    return constMin;
}

export function getAllDestinations(X) {
    const departureFrom = X.CatalogProductOfferings.CatalogProductOffering[0].Departure;
    const arrivalTo = X.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
    const alldata = X;

    const actualDestinations = [];
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
        if (departureFrom == item.Departure && arrivalTo == item.Arrival) {
            actualDestinations.push(item);
        }
    });
    return actualDestinations;
}

export function GetAllFlights(X) {
    const alldata = X;

    let uniqueFlights = [];
    alldata.ReferenceList[0].Flight.forEach((item) => {
        if (item.carrier && !uniqueFlights.includes(item.carrier)) {
            uniqueFlights.push(item.carrier);
        }
    });
    return uniqueFlights;
}

export function GetAllReturns(X) {
    const departureFrom = X.CatalogProductOfferings.CatalogProductOffering[0].Departure;
    const arrivalTo = X.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
    const alldata = X

    const actualReturns = [];
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
        if (departureFrom == item.Arrival && arrivalTo == item.Departure) {
            actualReturns.push(item);
        }
    });
    return actualReturns;
}

export function GetAllBrands(X) {
    const alldata = X;
    let uniqueBrands = [];
    alldata.ReferenceList[3].Brand.forEach((item) => {
        if (
            item.name &&
            !uniqueBrands.some(
                (brand) => brand.id === item.id && brand.name === item.name
            )
        ) {
            uniqueBrands.push({ name: item.name, id: item.id });
        }
    });
    return uniqueBrands;
}

export function InitialDisplayFunction(X) {
    const departureFrom = X.CatalogProductOfferings.CatalogProductOffering[0].Departure;
    const arrivalTo = X.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
    const alldata = X;
    const actualDestinations = [];
    let initialDisplayArray = [];
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
            initialDisplayArray = [...initialDisplayArray, ...alp];
        });
    });
    return initialDisplayArray;
}

export function InitialReturnHandlerFunction(X) {
    const departureFrom = X.CatalogProductOfferings.CatalogProductOffering[0].Departure;
    const arrivalTo = X.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
    const alldata = X;

    const returnFlights = [];
    let InitialfinalArrayDup = [];
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
        if (departureFrom == item.Arrival && arrivalTo == item.Departure) {
            returnFlights.push(item);
        }
    });


    const tempReturnFlight = JSON.parse(JSON.stringify(returnFlights));
    tempReturnFlight.map((item) => {
        let First;
        let Last;

        // Iterate through each ProductBrandOption in the return flight
        item.ProductBrandOptions.map((flight, k) => {
            // Retrieve flight information for the first and last flight reference
            First = alldata.ReferenceList[0].Flight.filter((it) => {
                return it.id === flight.flightRefs[0];
            });
            Last = alldata.ReferenceList[0].Flight.filter((it) => {
                return it.id === flight.flightRefs[flight.flightRefs.length - 1];
            });

            // Update departure and arrival times in the ProductBrandOption 
            flight.DepartureTime = First[0].Departure.date;
            flight.ArrivalTime = Last[0].Arrival.date;

            // Create a modified copy of the ProductBrandOption with only one ProductBrandOffering
            let alp = flight.ProductBrandOffering.map((it) => {
                let g = JSON.stringify(flight);
                g = JSON.parse(g);
                g.ProductBrandOffering = [];
                g.ProductBrandOffering.push(it);
                return g;
            });

            // Update the final array with the modified ProductBrandOptions
            InitialfinalArrayDup = [...InitialfinalArrayDup, ...alp];
        });
    });
    return InitialfinalArrayDup;
}
