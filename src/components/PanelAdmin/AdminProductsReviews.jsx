import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDet } from "../../redux/DSellerActions";
import { useRouter } from "next/router";
import Image from "next/image";
import ReviewList from "components/CardDetail/ReviewList";

const AdminProductsReviews = ()=>{
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch();
    const productsDetail = useSelector((state) => state.products.detail);
    let newRating = 0

    const [currentReview, setCurrentReview] = useState([])

    useEffect(()=>{
        if (router.isReady) {
          dispatch(getProductDet(id));
        }
      console.log("Actualizate")
    },[id])

    useEffect(()=>{
        setCurrentReview(productsDetail.review)
    },[productsDetail])

    //#region Calcula Rating Total
    productsDetail.review?.forEach(rev => {
        let rating = +rev.rating
        newRating += rating;
    })
    newRating = isNaN(newRating / productsDetail.review?.length)?
    0: (newRating / productsDetail.review?.length);
    //#endregion

    // Piltracion de Ratings
    function ratingFilter(cant){
        let reviewFilter = productsDetail?.review?.filter(
            review=>review.rating == cant
        )
        return reviewFilter;
    }

    // Porcentaje de Ratings
    function ratingPercentage(cant){
        if(cant <= 0) return 0

        let percentage = 0;
        percentage = cant*100
        return isNaN(percentage/productsDetail?.review?.length)?
        0:
        (percentage/productsDetail?.review?.length).toFixed(2)
    }

    const handleChange = (e)=>{
        console.log(e.target.value)
        if(isNaN(+e.target.value))setCurrentReview(productsDetail.review)
        else setCurrentReview(ratingFilter(e.target.value))
    }

    return(
        <>
        {/* Estadisticas */}
        <div className='rating-stats'>
            <div className='dashboard-container_stats'>
                {/* Rating Total*/}
                <div className='stats-total'>

                    {/* Total */}
                    <div className='stats-total_text'>
                        <h3>{newRating.toFixed(2)}</h3>
                        <p>Rating Total</p>
                    </div>

                    {/* Icono */}
                    <div className='rating-icon'>
                        <h3>★</h3>
                    </div>
                </div>

                {/* Porsentagess de Ratings */}
                <div className='stats-total'>
                    <div className='stats-total_text'>
                        <div className="rating-percentage">
                            <div className="star-container">
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            </div>
                            <p>{ratingPercentage(ratingFilter(5)?.length)} %</p>
                        </div>

                        <div className="rating-percentage">
                            <div className="star-container">
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-off`}>☆</span>
                            </div>
                            <p>{ratingPercentage(ratingFilter(4)?.length)} %</p>
                        </div>

                        <div className="rating-percentage">
                            <div className="star-container">
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-off`}>☆</span>
                            <span className={`star-off`}>☆</span>
                            </div>
                            <p>{ratingPercentage(ratingFilter(3)?.length)} %</p>
                        </div>

                        <div className="rating-percentage">
                            <div className="star-container">
                            <span className={`star-on`}>★</span>
                            <span className={`star-on`}>★</span>
                            <span className={`star-off`}>☆</span>
                            <span className={`star-off`}>☆</span>
                            <span className={`star-off`}>☆</span>
                            </div>
                            <p>{ratingPercentage(ratingFilter(2)?.length)} %</p>
                        </div>

                        <div className="rating-percentage">
                            <div className="star-container">
                            <span className={`star-on`}>★</span>
                            <span className={`star-off`}>☆</span>
                            <span className={`star-off`}>☆</span>
                            <span className={`star-off`}>☆</span>
                            <span className={`star-off`}>☆</span>
                            </div>
                            <p>{ratingPercentage(ratingFilter(1)?.length)} %</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Reviews */}
        <div className='review-container_list'>
            <h3>Reseñas</h3>
            {/* Filtrado Por Rating */}
            <div className="filter-raiting">
            <p>Filtrar Por Rating:</p>
            <select
            className="select-rating"
            onChange={handleChange}
            placeholder="Elige un Rating">
                <option>Todas</option>
                <option value={5}>★★★★★</option>
                <option value={4}>★★★★</option>
                <option value={3}>★★★</option>
                <option value={2}>★★</option>
                <option value={1}>★</option>
            </select>
            </div>

            {/* Listado De Reviews */}
            <div>
            {
            productsDetail && currentReview?.length > 0 ? (
            currentReview.map((review) => {
                return (
                <ReviewList
                key = {review.user_email}
                email = {review.user_email}
                rating = {review.rating}
                commentary = {review.commentary}
            />)
        })
        ):<p className="notFound-text">No se encontraron Reseñas</p>}
            </div>
        </div>
        </>
    )
}

export default AdminProductsReviews;