import React from "react";

const FlightDetails = ({DeptDetails, ReturnDetails, alldata}) => {

  const extractTotalDuration = (productBrandOffering) => {
    const totalDuration = productBrandOffering.Product.map((product) => {
      return alldata.ReferenceList[1].Product.map((referenceListProduct) => {
        if (referenceListProduct.id === product?.productRef) {
          return referenceListProduct.totalDuration;
        }
      });
    })
    return totalDuration
  }


  const extractBrandName = (productBrandOffering) => {
    const brandName = alldata.ReferenceList[3].Brand.map((brand) => {
      if (brand.id === productBrandOffering?.Brand?.BrandRef) {
        return brand.name;
      }
    })
    return brandName
  }


  const extractValidatingAirline = (productBrandOffering) => {
    const validatingAirline = alldata.ReferenceList[2].TermsAndConditions.map(
      (tNc) => {
      if ( tNc.id === productBrandOffering.TermsAndConditions?.termsAndConditionsRef ) {
          return tNc.ValidatingAirline.map((validatingAirline) => {
            return validatingAirline.ValidatingAirline;
          });
        }
      }
    )
    return validatingAirline
  }

  return (
    <div className="bg-[#f5f6f8] rounded-xl p-10 flex flex-col gap-5">
        {/* Departure */}
      <div className="bg-white shadow-sm rounded-xl">
        <div className="flex p-5 justify-between border-b border-slate-300">
          <div>
            <span className="font-medium">Depart •</span><span>--Departure Date--</span>
          </div>
          <div>
            {DeptDetails.ProductBrandOffering.map((productBrandOffering, index) => {
              const totalDuration = extractTotalDuration(productBrandOffering)
              return (
                <div key={index} className="flex flex-col gap-[5px]">
                  <div>
                    <span>
                      {totalDuration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-5">
            <div className='flex flex-col gap-10 sm:gap-[5px]'>
            {DeptDetails.flightRefs.map((flightRef, index) => {
              return (
                <div key={index} className='flex gap-[5px] flex-wrap sm:flex-nowrap'>
                  {alldata.ReferenceList[0].Flight.map((flight) => {
                    if (flight.id === flightRef) {
                      return (
                        <div className="flex gap-y-1 gap-x-5 flex-wrap sm:flex-nowrap">
                          <p><span className='font-bold'>  From -{" "}</span>{" "}{flight.Departure.location}</p>
                          <p><span className='font-bold'>  To -{" "}</span>{" "}{flight.Arrival.location}</p>
                          <p><span className='font-bold'>  Duration -{" "}</span>{" "}{flight.duration}</p>
                          <p><span className='font-bold'>  AirlineCarrier -{" "}</span>{" "}{flight.carrier}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
            </div>
            <div className="flex flex-col gap-5">
                <div>
                    <p><span className='font-bold'>Departure Date - </span>{DeptDetails.DepartureTime}</p>
                    <p><span className='font-bold'>Arrival Date - </span>{DeptDetails.ArrivalTime}</p>
                </div>
                {DeptDetails.ProductBrandOffering.map((productBrandOffering, index) => {
                  const brandName = extractBrandName(productBrandOffering)
                  const validatingAirline = extractValidatingAirline(productBrandOffering)
                  return (
                    <div key={index} className='flex flex-col gap-[5px]'>
                      <div>
                          <span className='font-bold'>Brand Name -{" "}</span><span>{brandName}</span>

                          <p><span className='italic'>Base Price -{" "}</span>{productBrandOffering.Price.Base}</p>
                          <p><span className='italic'>Total Taxes-{" "}</span>{productBrandOffering.Price.TotalTaxes}</p>
                          <p><span className='italic'>Total Price -{" "}</span>{productBrandOffering.Price.TotalPrice}</p>
                      </div>
                      <div>
                          <span className='font-bold'>Validating Airlines -{" "}</span>
                          <span>
                            {validatingAirline}
                          </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

        {/* Arrival */}
      {ReturnDetails && <div className="bg-white shadow-sm rounded-xl">
        <div className="flex p-5 justify-between border-b border-slate-300">
          <div><span className="font-medium">Arrival •</span><span>--Arrival Date--</span></div>
          <div>
            {ReturnDetails.ProductBrandOffering.map((productBrandOffering, index) => {
              const totalDuration = extractTotalDuration(productBrandOffering)
              return (
                <div key={index} className="flex flex-col gap-[5px]">
                  <div>
                    <span>
                      {totalDuration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-5">
            <div className='flex flex-col gap-10 sm:gap-[5px]'>
            {ReturnDetails.flightRefs.map((flightRef) => {
              return (
                <div className='flex gap-[5px] flex-wrap sm:flex-nowrap'>
                  {alldata.ReferenceList[0].Flight.map((flight) => {
                    if (flight.id === flightRef) {
                      return (
                        <div className="flex gap-y-1 gap-x-5 flex-wrap sm:flex-nowrap">
                          <p><span className='font-bold'>From -{" "}</span>{" "}{flight.Departure.location}</p>
                          <p><span className='font-bold'>To -{" "}</span>{" "}{flight.Arrival.location}</p>
                          <p><span className='font-bold'>Duration -{" "}</span>{" "}{flight.duration}</p>
                          <p><span className='font-bold'>AirlineCarrier -{" "}</span>{" "}{flight.carrier}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
            </div>
            <div className="flex flex-col gap-5">
                <div>
                  <p><span className='font-bold'>Departure Date - </span>{ReturnDetails.DepartureTime}</p>
                  <p><span className='font-bold'>Arrival Date - </span>{ReturnDetails.ArrivalTime}</p>
                </div>
                {ReturnDetails.ProductBrandOffering.map((productBrandOffering, index) => {
                  const brandName = extractBrandName(productBrandOffering)
                  const validatingAirline = extractValidatingAirline(productBrandOffering)
                  return (
                    <div key={index} className='flex flex-col gap-[5px]'>
                      <div>
                          <span className='font-bold'>Brand Name -{" "}</span>
                          <span>
                            {brandName}
                          </span>
                          <p><span className='italic'>Base Price -{" "}</span>{productBrandOffering.Price.Base}</p>
                          <p><span className='italic'>Total Taxes-{" "}</span>{productBrandOffering.Price.TotalTaxes}</p>
                          <p><span className='italic'>Total Price -{" "}</span>{productBrandOffering.Price.TotalPrice}</p>
                      </div>
                      <div>
                          <span className='font-bold'>Validating Airlines -{" "}</span>
                          <span>
                            {validatingAirline}
                          </span>
                      </div>
                    </div>
                  );
                })}
            </div>
        </div>
      </div>}
    </div>
  );
};

export default FlightDetails;
