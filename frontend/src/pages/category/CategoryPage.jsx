import { useParams } from "react-router"
import ProductCards from "../shop/ProductCards"
import products from "../../data/products.json"
import { useEffect, useState } from "react"

const CategoryPage = () => {
    //console.log(useParams())
    const {categoryName} = useParams()
    //console.log(categoryName)
     
    const [filteredProduct,setFilteredProduct]= useState([])
       //console.log(products) //data folder theke data golo ashse kina check 

       useEffect(()=>{
        const filtered = products.filter((product)=> product.category === categoryName.toLowerCase())
        setFilteredProduct(filtered)
       },[])
       //console.log(filteredProduct) //test product filter show
  return (
    <>
    <section className="section__container bg-[#f4e5ec] ">
       <h2 className="section__header capitalize">{categoryName}</h2>
       <p className="section__subheader">Browser a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
    </section>
       {/* Products card */}
       <div className="section__container">
        <ProductCards  products={filteredProduct}/>
       </div>
    </>
  )
}

export default CategoryPage