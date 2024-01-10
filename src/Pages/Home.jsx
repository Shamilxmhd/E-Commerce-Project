import React, { useEffect } from 'react'
import { Card, Col, Row, Button, Spinner } from 'react-bootstrap'
import { addToWishList } from '../Redux/Slices/wishlistSlice'
import { addtoCart } from '../Redux/Slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, onNavigateNext, onNavigatePrev } from '../Redux/Slices/productSlice'
import Header from '../Components/Header'


function Home() {
  const dispatch = useDispatch()
  const { loading, products, error, productsPerPage, currentPage } = useSelector((state) => state.productSlice)
  const { wishlist } = useSelector(state => state.wishlistSlice)
  const totalPages = Math.ceil(products?.length / productsPerPage)
  const indexOfLastItem = currentPage * productsPerPage
  const indexOfFirstItem = indexOfLastItem - productsPerPage
  const visibleCards = products?.slice(indexOfFirstItem, indexOfLastItem)


  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const handleWishlist = (product) => {
    const existingProduct = wishlist.find(item => item.id == product.id)
    if (existingProduct) {
      alert("Product already exist!!!")
    }
    else {
      dispatch(addToWishList(product))
    }
  }
  const NavigatePrev = () => {
    if (currentPage != 1) {
      dispatch(onNavigatePrev())
    }
  }
  const NavigateNext = () => {
    if (currentPage != totalPages) {
      dispatch(onNavigateNext())
    }
  }



  return (
    <>
      <Header insideHome />
      <div >

        {
          !loading && error ? <div className='mt-5 text-center text-danger fw-bolder'>{error}</div> : null
        }
        {
          loading ? <div className='text-center mt-5 '><Spinner animation="border" variant="warning" />
          </div> :
            <Row className='m-5 container '>
              {products.length > 0 ? visibleCards.map((product, index) => (
                <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                  <Card className='shadow rounded bg-white' style={{ width: '18rem' }}>
                    <Link to={`/view/${product.id}`}><Card.Img style={{ height: '180px' }} variant="top" src={product.thumbnail} />
                    </Link>
                    <Card.Body>
                      <Card.Title className='text-black'>{product.title.slice(0, 20)}...</Card.Title>
                      <div className="d-flex justify-content-between">
                        <Button onClick={() => handleWishlist(product)} className='btn bg-white border-0   fs-5'><i class="fa-solid fa-heart text-danger "></i></Button>
                        <Button onClick={() => dispatch(addtoCart(product))} className='btn bg-white border-0   fs-5'><i class="fa-solid fa-cart-plus text-success "></i></Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )) : !error && <div className='mt-5 text-center text-danger fw-bold'>Product Not Found!!!</div>}
              <div className='d-flex justify-content-center align-items-center f'>
                <span onClick={NavigatePrev} className='btn btn-link'><i class="fa-solid fa-angles-left text-dark "></i></span>
                <span>{currentPage} of {totalPages}</span>
                <span onClick={NavigateNext} className='btn btn-link'><i class="fa-solid fa-angles-right text-dark "></i></span>

              </div>
            </Row>
        }

      </div>
    </>

  )
}

export default Home