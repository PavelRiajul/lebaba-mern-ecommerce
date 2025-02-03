
 import ProductCards from "./ProductCards"
import { useFetchAllProdutsQuery } from "../../redux/features/products/productsApi"
import { useState } from "react"
import ShopFiltering from "./ShopFiltering"
import Loading from "../../components/Loading"

const filters ={
  categories:['all',"accessories","dress","jewellery","cosmetics"],
  colors:['all','black','red','gold','blue','silver','beige','green'],
  priceRanges:[
    {label:"Under $50",min:0, max:50},
    {label:"$50 - $100",min:50, max:100},
    {label:"$100 - $150",min:100, max:200},
    {label:"$200 and above",min:200, max:Infinity},
  ]
}
const ShopPage = () => {
  const [filterState, setFilterState] = useState({
    category:'all',
    color:'all',
    priceRange:''
  })
  const {category,color,priceRange}=filterState;
  const [ minPrice,maxPrice]=priceRange.split('-').map(Number)
  const [currentPage,setCurrentPage]= useState(1)
  const [productsPerPage]= useState(8)
  const {data:productData = {},error, isLoading} = useFetchAllProdutsQuery({
    category:category !== 'all'? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '': minPrice,
    maxPrice: isNaN(maxPrice) ? '': maxPrice,
    page:currentPage,
    limit:productsPerPage
  })
  if(isLoading) return <Loading/>
  const{products,totalPages,totalProducts} = productData?.data || {};

  //pagination
  const handlePageChange = (pageNumber)=>{
      if(pageNumber > 0 && pageNumber <= totalPages){
        setCurrentPage(pageNumber)
      }
  }
  // clear filters
  const clearFilters = ()=>{
    setFilterState({
      category:'all',
      color:'all',
      priceRange:''
    })
  }

  const startProduct = (currentPage -1) * productsPerPage+1
  const endProduct = startProduct + products.length -1
  return (
    <>
    <section className="section__container bg-[#f4e5ec] rounded">
      <h2 className="section__header">shop Page</h2>
      <p className="section__subheader">Discover the Hottest Picks: Elevate Your style with Our Curated Collected of Trending Women's Fashion Products.</p>
    </section>

    <section className="section__container">
      <div className="flex flex-col md:flex-row md:gap-12 gap-8">
        {/* category */}
        <div>
          <ShopFiltering
          filters={filters}
          filterState={filterState}
          setFilterState={setFilterState}
          clearFilters={clearFilters}
          />
        </div>
        {/* product grid */}
        <div>
           <h3 className="text-xl font-medium mb-4">Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
           <ProductCards products={products}/>         {/*important */}
           {/* pagination */}
           {
            products.length > 0 && <div className="flex justify-center space-x-2 mt-6">
            <button onClick={()=>handlePageChange(currentPage - 1)} className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">Previous</button>
            {
             [...Array(totalPages)].map((_,index)=>(
               <button
               disabled={currentPage == 1}
               onClick={()=>handlePageChange(index+1)}
               className={`px-4 py-2 rounded-md ${ currentPage == index +1 ? 'bg-blue-500 text-white':'bg-gray-200 text-gray-700'}`} 
                key={index}>{index+1}</button>
             ))
            }
            <button disabled={currentPage == totalPages} onClick={()=>handlePageChange(currentPage + 1)} className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">Next</button>
            </div>
           }
           
        </div>
      </div>
    </section>
    </>
  )
}

export default ShopPage




