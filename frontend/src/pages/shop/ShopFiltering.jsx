

const ShopFiltering = ({filters,filterState,setFilterState,clearFilters}) => {
  return (
    <div className="space-y-5 flex-shrink-0 w-38">
        <h3>Filters</h3>
        {/* categories */}
        <div className="flex flex-col space-y-2">
            <h4 className="font-medium text-lg">Category</h4>
            <hr />
            {
                
                filters.categories.map((category,index)=>(
                    <label key={index} className="cursor-pointer capitalize">
                     <input type="radio" name="category" 
                     value={category}
                     checked={filterState.category === category}
                     onChange={(e)=> setFilterState({...filterState, category: e.target.value})}
                      />
                      <span className="ml-1">{category}</span>
                    </label>
                ))
            }
        </div>
        {/* colors */}
        <div className="flex flex-col space-y-2">
            <h4 className="font-medium text-lg">Colors</h4>
            <hr />
            {
                
                filters.colors.map((color,index)=>(
                    <label key={index} className="cursor-pointer capitalize">
                     <input type="radio" name="color" 
                     value={color}
                     checked={filterState.color === color}
                     onChange={(e)=> setFilterState({...filterState, color: e.target.value})}
                      />
                      <span className="ml-1">{color}</span>
                    </label>
                ))
            }
        </div>
        {/* price range */}
        <div className="flex flex-col space-y-2">
            <h4 className="font-medium text-lg">Price Range</h4>
            <hr />
            {
                
                filters.priceRanges.map((range ,index)=>(
                    <label key={index} className="cursor-pointer capitalize">
                     <input type="radio" name="priceRange" 
                     value={`${range.min}-${range.max}`}
                     checked={filterState.priceRange === `${range.min}-${range.max}`}
                     onChange={(e)=> setFilterState({...filterState, priceRange: e.target.value})}
                      />
                      <span className="ml-1">{range.label}</span>
                    </label>
                ))
            }
        </div>
        {/* clear filtering */}
        <button
        onClick={clearFilters}
         className="bg-[#ee3849] py-2 px-4 text-white rounded hover:bg-[#d23141] cursor-pointer">Clear All Filters</button>
    </div>
  )
}

export default ShopFiltering



