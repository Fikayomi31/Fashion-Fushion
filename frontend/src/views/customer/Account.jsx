import React from "react";
import { useState, useEffect } from "react";
import apiInstance from '../../utils/axios'
import UserData from "../plugin/UserData";
import SideBar from "./SideBar";

function Account() {
    const [profile, setProfile] = useState({});
    const userData = UserData();    

    useEffect(() => {
        apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
          setProfile(res.data)
          console.log(profile) 

        })
    }, []);
  return (
    <main className="mt-5">
        <div className="container">
            <section className="">
            <div className="row">
                
                <div className="col-lg-3">
                <div className="d-flex justify-content-center align-items-center flex-column mb-4 shadow rounded-3">
                    <img
                    src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2220431045.jpg"
                    style={{ width: 120 }}
                    alt=""
                    />
                    <div className="text-center">
                    <h3 className="mb-0">{profile.full_name}</h3>
                    <p className="mt-0">
                        <a href="">Edit Account</a>
                    </p>
                    </div>
                </div>
                <ol className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Account</div>
                    </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Orders</div>
                    </div>
                    <span className="badge bg-primary rounded-pill">14</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Wishlist</div>
                    </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Notification</div>
                    </div>
                    <span className="badge bg-primary rounded-pill">14</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Setting</div>
                    </div>
                    </li>
                </ol>
                </div>
                <div className="col-lg-9 mt-1">
                <main className="mb-5" style={{}}>
                    <div className="container px-4">
                    <section className=""></section>
                    <section className="">
                        <div className="row rounded shadow p-3">
                        <h2>Hi {profile.full_name}, </h2>
                        <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                            From your account dashboard. you can easily check &amp;
                            view your <a href="">orders</a>, manage your{" "}
                            <a href="">
                            shipping
                            </a>
                            <a href="">Edit Account</a>
                        </div>
                        </div>
                    </section>
                    </div>
                </main>
                </div>
            </div>
            </section>
        </div>
    </main>
  )
}

export default Account;