import React from 'react'
import SingleOffering from './SingleOffering';
import FlightDetails from './FlightDetails';
import { useSelector } from 'react-redux';

const AllOffering = ({ showDetails, openAccordian }) => {
  const alldata = useSelector((state) => state.allData.allDataArray)
  const returnOfferingsList = useSelector((state) => state.finalArrayDup.finalArrayDup);
  const departureOfferingsList = useSelector((state) => state.finalArray.finalArray);
  if (alldata.length == 0) {
    return (
      <div>
        Fetching Details
      </div>
    )

  } else {
    console.log(alldata.CatalogProductOfferings)
    const departureFrom = alldata.CatalogProductOfferings.CatalogProductOffering[0].Departure;
    const arrivalTo = alldata.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
    return (
      <div className="flex flex-col gap-4 my-10">
        {departureOfferingsList.map((deptOffering, id) => {
          let returnDetails;
          returnOfferingsList.map((returnOffering) => {
            if (returnOffering.ProductBrandOffering[0].CombinabilityCode[0] === deptOffering.ProductBrandOffering[0].CombinabilityCode[0]) {
              returnDetails = returnOffering
            }
          })
          return (
            <main key={id}>
              <section className="shadow-md mx-5 xl:mx-0 bg-white border border-white rounded-xl hover:border-slate-500 transition-all cursor-pointer">
                {/* Closed Accordian */}
                <div className={`flex flex-col sm:flex-row justify-around ${showDetails === id ? "border-b border-slate-400" : ""}`} >
                  <div className="flex flex-col p-5 justify-center" onClick={() => openAccordian(id)} >
                    {/* Destination Flight */}
                    <div className="flex gap-2">
                      <input type="checkbox" />
                      <SingleOffering returnBack={false} departureFrom={departureFrom} arrivalTo={arrivalTo} offering={deptOffering} alldata={alldata} />
                    </div>

                    {/* Return Flight */}
                    <div className="flex gap-2">
                      <div>
                        {returnOfferingsList.map((returnOffering, id) => {
                          return (
                            returnOffering.ProductBrandOffering[0].CombinabilityCode[0] === deptOffering.ProductBrandOffering[0].CombinabilityCode[0]
                            &&
                            <div key={id} className='flex gap-2'>
                              <input type="checkbox" />
                              <SingleOffering returnBack={true} departureFrom={departureFrom} arrivalTo={arrivalTo} offering={returnOffering} alldata={alldata} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block bg-slate-300 w-[1px] "></div>

                  {/* Total Price */}
                  <div className="p-5">
                    Total Price :-{" "}
                    <p className="font-bold text-3xl">
                      ${" "} {deptOffering.ProductBrandOffering[0].BestCombinablePrice.TotalPrice}
                    </p>
                    <button
                      className="text-white w-full mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95"
                      style={{ background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)", }}
                    >
                      Select
                    </button>
                  </div>
                </div>


                {/* Details Inside Accordian */}

                {
                  showDetails === id && <FlightDetails DeptDetails={deptOffering} ReturnDetails={returnDetails} alldata={alldata} />
                }
              </section>
            </main>
          );
        })}

        {departureOfferingsList.length == 0 &&
          <section className="shadow-md mx-5 xl:mx-0 bg-white border border-white rounded-xl hover:border-slate-500 transition-all cursor-pointer">
            {/* Closed Accordian */}
            <div className={`flex flex-col sm:flex-row justify-around `} >
              <div className="flex flex-col text-center xl:px-40 2xl:px-52 py-10 font-bold text-5xl whitespace-nowrap md:text-7xl justify-center" >
                No Offerings
              </div>



            </div>



          </section>
        }
      </div>
    )
  }
}

export default AllOffering
