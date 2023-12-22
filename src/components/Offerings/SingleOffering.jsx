import React from 'react'

const SingleOffering = ({returnBack, departureFrom, arrivalTo, offering, alldata}) => {

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

  return (
    <>
      <div className='flex sm:items-center gap-x-8 gap-y-1 sm:gap-10 flex-wrap sm:flex-nowrap xl:gap-24 m-2'>
        <div>

          {/* dept-arrival places */}
          <div>
            {!returnBack && <h2>{departureFrom} to {arrivalTo}</h2>}
            {returnBack && <h2>{arrivalTo} to {departureFrom}</h2>}
          </div>
        </div>
        <div><span className='font-bold'>No. of stops -</span> {offering.flightRefs.length}</div>
        <div>
          {offering.ProductBrandOffering.map((productBrandOffering, id) => {
            const totalDuration = extractTotalDuration(productBrandOffering)
            return (
              <div key={id} className='flex flex-col gap-[5px]'>
                <div>
                  <span className='font-bold'>
                    Total Duration -{" "}
                  </span>
                  <span>
                    {totalDuration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>         
      </div>
    </>
    );
}

export default SingleOffering
