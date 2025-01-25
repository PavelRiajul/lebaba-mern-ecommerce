import { useState } from 'react'
import products from '../../data/products.json'
import ProductCards from '../shop/ProductCards'

const TrendingProducts = () => {
    const [visibleProducts,setVisibleProducts] = useState(8)  //prottek lin a koto ta kore product show korabo tar jonno akta usestate define korlam .inishiallly product show korbe 8 ta pore prottek line a 4 ta kore show korabo
    const loadMoreProducts =()=>{
        setVisibleProducts(prvCount => prvCount+4) // prottek line a card 4 ta kore how korabo
    }
  return (
    <section className='section__container product__container'>
        <h2 className="section__header">Trending Products</h2>
        <p className="section__subheader mb-12">
          Discover the Hottest Picks: Elevate Your Style with Our Curated
          Collection of Trending Women's Fashion Products.
        </p>
        {/* products cards */}
        <div className='mt-8'>
        {/*  /* aekhane products slice korte hobe prottek line a koita kore show korbe */ }
        <ProductCards products={products.slice(0,visibleProducts)}/> 
        </div>

        {/* load more button */}
        <div className='product__btn'>
            {
                visibleProducts < products.length && 
                <button
                onClick={loadMoreProducts}
                 className='btn'>Load More</button>
            }
        </div>
    </section>
  )
}

export default TrendingProducts