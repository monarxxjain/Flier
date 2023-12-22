import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBrand } from '../../redux/brand';
import { removeBrand } from '../../redux/brand';

const BrandFilter = () => {
    const dispatch = useDispatch();
    const allBrands = useSelector((state) => state.allBrandsArray.allBrandsArray)
    const selectedBrands = useSelector((state) => state.brand.brandArray)

    const handleChange = (e) => {
        if (e.target.checked) {
            dispatch(addBrand(e.target.value));
        } else {
            dispatch(removeBrand(e.target.value));
        }
    }

    return (
        <div className="flex flex-col gap-3 flex-1  min-w-[150px]">
            <h3 className="text-xl">Brand Name :</h3>
            <div className="flex flex-col gap-2">
                {allBrands.map((brand, key) => {
                    return (
                        <div key={key} className="flex gap-3">
                            {selectedBrands.includes(brand.id) === true ? (
                                <input type="checkbox" value={brand.id} checked={true} onChange={(e) => handleChange(e)} />
                            ) : (
                                <input type="checkbox" value={brand.id} onChange={(e) => handleChange(e)} />
                            )}
                            <label htmlFor={brand.name + "dept"}>{brand.name}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default BrandFilter
