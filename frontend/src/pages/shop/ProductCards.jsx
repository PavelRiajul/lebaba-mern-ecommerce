import { Link } from "react-router"
import Rating from "../../components/Rating"


const ProductCards = ({products}) => {
    //console.log(products)  //test category page theke data ashse kina check
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
            products.length > 0 ? (products.map((product,index)=>(
              <div key={index} className="product__card">
              <div className="relative">
                <Link to={`/shop/${product._id}`}>
                  <img
                    src={product?.image}
                    alt="Men Casual tShirt"
                    className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"/></Link>
                <div className="hover:block absolute top-3 right-3">
                  <button>
                    <i
                      className="ri-shopping-cart-2-line bg-[#ed3849] p-1.5 text-white hover:bg-[#d23141]"
                    ></i>
                  </button>
                </div>
              </div>
              <div className="product__card__content">
                <h4>{product?.name}</h4>
                <p>${product?.price} {product?.oldPrice ? <s>{product?.oldPrice}</s>: null}</p>
                <Rating rating={product?.rating}/>
              </div>
            </div>
          ))):<div>No products found!</div>
        }
    </div>
  )
}

export default ProductCards