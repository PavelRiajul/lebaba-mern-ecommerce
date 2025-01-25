import { useParams } from "react-router"


const CategoryPage = () => {
    //console.log(useParams())
    const {categoryName} = useParams()
    //console.log(categoryName)

  return (
    <>
    <section className="section__container  bg-[#f4e5ec]">
       <h2 className="section__header capitalize">{categoryName}</h2>
       <p className="section__subheader">Browser a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
    </section>
    </>
  )
}

export default CategoryPage