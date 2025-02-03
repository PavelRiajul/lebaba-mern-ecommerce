import { Link, useParams } from "react-router"
import { useFetchProductbyIdQuery } from "../../../redux/features/products/productsApi"
import Loading from "../../../components/Loading"
import Rating from "../../../components/Rating"
import ReviewsCard from "../reviews/ReviewsCard"

const SingleProduct = () => {
    const {id} = useParams()
    const {data: {data:productDetails} ={}, isLoading, isError} = useFetchProductbyIdQuery(id)
    if(isLoading) return <Loading/>
    if(isError) return <div  className=" flex items-center justify-center h-96">Error to load product details</div>

    const {product, reviews} = productDetails || {}
    console.log(product)
    console.log(reviews)
  return (
    <>
    {/* banner */}
     <section className="section__container rounded bg-[#f4e5ec]">
                <h2 className="section__header">Single Product Page</h2>
                <div className="section__subheader space-x-2">
                    <span className='hover:text-[#ed3849]'><Link to="/">home</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-[#ed3849]'><Link to="/shop">shop</Link></span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span className='hover:text-[#ed3849]'>{product.name}</span>
                </div>
            </section>
            {/* products container */}
            <section className="section__container mt-8">
                <div className="flex flex-col items-center md:flex-row gap-8">
                    {/* Product Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={product?.image}
                            alt=""
                            className="rounded-md w-full h-auto"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
                        <p className="text-xl text-[#ed3849] mb-4">
                            ${product.price} {product?.oldPrice && <s>{product?.oldPrice}</s> }
                        </p>
                        <p className="text-gray-700 mb-4">{product.description}</p>

                        {/* Additional Product Information */}
                        <div className="flex flex-col space-y-2">
                            <p className="capitalize"><strong>Category:</strong>{product.category}</p>
                            <p className="capitalize"><strong>Color:</strong>{product.color}</p>
                            <div className='flex gap-1 items-center'>
                                <strong>Rating: </strong>
                                <Rating rating={product.rating}/>  
                          
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="mt-6 px-6 py-3 bg-[#ed3849] text-white rounded-md">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>
            {/* reviews */}
            <section className="section__container mt-8">
              <ReviewsCard productReviews={reviews}/>
            </section>
    </>
  )
}

export default SingleProduct