import {useState, useEffect} from 'react'
import SideBar from './SideBar'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast:true,
    position:'top',
    showConfirmButton:false,
    timer:1500,
    timerProgressBar:true
  })


function Reviews() {
    const [reviews, setReviews] = useState([])
    const [review, setReview] = useState({})
    const [updateReview, setUpdateReview] = useState({ reply: "" })

    const param = useParams()

    const handleReplyChange = (event) => {
        setUpdateReview({
            ...updateReview,
            [event.target.name]: event.target.value
        })
        console.log(updateReview);
    }

    const handleReplySubmit = async (e, reviewId) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("reply", updateReview.reply);

        try {
            const response = await apiInstance.patch(
            `vendor/reviews/${UserData()?.user_id}/${reviewId}/`,
            formdata
            );
            
            Swal.fire({
                icon: "success",
                title: "Message sent successfully!",
            });
            
        } catch (error) {
        Swal.fire({
            icon: "Fail",
            title: "Try Again!",
        });
            
        }
    };

    useEffect(() => {
        apiInstance.get(`vendor/reviews/${UserData()?.user_id}/`).then((res) => {
            setReviews(res.data)
        })
       
    }, [])


  return (
    <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            <SideBar />

            {/*/col*/}
            <div className="col-md-9 col-lg-10 main mt-4">
            <h4>
                <i className="fas fa-star" /> Reviews and Rating
            </h4>

            <section
                className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded"
                style={{
                backgroundImage:
                    "url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.webp)"
                }}
            >
                <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-10">
                    {reviews?.map((r, index) => (

                    
                        <div className="card mt-3 mb-3">
                        <div className="card-body m-3">
                            <div className="row">
                            <div className="col-lg-4 d-flex justify-content-center align-items-center mb-4 mb-lg-0">
                                <img
                                src={r.profile.image}
                                className="rounded-circle img-fluid shadow-1"
                                alt={r.profile.full_name}
                                style={{ width: '150px', height: '150px', objectFit: 'cover'}}
                                />
                            </div>
                            <div className="col-lg-8">
                                <p className="text-dark fw-bold mb-4">
                                Review:{" "}
                                <i>
                                    {r.review}
                                </i>
                                </p>
                                <p className="fw-bold text-dark mb-2">
                                <strong>Name: {r?.profile.full_name}</strong>
                                </p>
                                <p className="fw-bold text-muted mb-0">
                                Product: {r.product?.title}
                                </p>
                                <p className="fw-bold text-muted mb-0">
                                Rating: {r?.rating}
                                {r.rating == 1 &&
                                    <i className="fas fa-star " style={{ color: '#FFD700' }} />
                                }
                                {r.rating == 2 &&
                                <>
                                    <i className="fas fa-star" style={{ color: '#FFD700' }}/>
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                </>
                                }
                                {r?.rating == 3 &&
                                <>
                                    <i className="fas fa-star" style={{ color: '#FFD700' }}/>
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                </>
                                }
                                {r?.rating == 4 &&
                                <>
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                </>
                                }
                                {r?.rating == 5 &&
                                <>
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                    <i className="fas fa-star" style={{ color: '#FFD700' }} />
                                </>
                                }
                                
                                
                                </p>
                                <div className="d-flex mt-3">
                                    <form className="d-flex align-items-center" onSubmit={(e) => handleReplySubmit(e, r.id)}>
                                        <input 
                                        onChange={handleReplyChange}
                                        type="text" 
                                        name='reply'
                                        value={updateReview.reply}
                                        className="form-control me-2" 
                                        placeholder="Write a reply..."
                                        />
                                        <button className="btn btn-success" type="submit">
                                        <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </form>
                                    </div>

                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
                </div>
            </section>
            </div>
        </div>
    </div>

  )
}

export default Reviews