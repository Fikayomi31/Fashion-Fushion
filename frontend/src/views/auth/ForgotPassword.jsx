import React, { useState } from 'react'
import apiInstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            await apiInstance.get(`user/password-reset/${email}/`).then((res) => {
                console.log(res)
                alert("An Email has been sent to you")
                navigate("/password-change")
            })
        } catch (error) {
            console.log(error)
        }


    }


  return (
    <section>
                <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                    <div className="container">
                        {/* Section: Login form */}
                        <section className="">
                            <div className="row d-flex justify-content-center">
                                <div className="col-xl-5 col-md-8">
                                    <div className="card rounded-5">
                                        <div className="card-body p-4">
                                            <h3 className="text-center">Forgot Password</h3>
                                            <br />

                                            <div className="tab-content">
                                                <div
                                                    className="tab-pane fade show active"
                                                    id="pills-login"
                                                    role="tabpanel"
                                                    aria-labelledby="tab-login"
                                                >
                                                    <div>
                                                        {/* Email input */}
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label" htmlFor="Full Name">
                                                                Email Address
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="email"
                                                                name="email"
                                                                className="form-control"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="text-center">
                                                            <button onClick={handleSubmit} className='btn btn-primary w-100'>Reset Password</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </section>
  )
}
