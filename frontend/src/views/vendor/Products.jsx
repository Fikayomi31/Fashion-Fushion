import {useState, useEffect} from 'react'
import SideBar from './SideBar'
import apiInstance from '../../utils/axios'
import UserData from '../plugin/UserData'
import { Link, useLocation } from 'react-router-dom';




function Products() {
    const [stats, setStats] = useState(null)
    const [orderChartData, setOrderChartData] = useState([]);
    const [productChartData, setProductChartData] = useState([]);
    const [products, setProducts] = useState([])

    const location = useLocation();
    console.log('Location:', location);



    useEffect(() => {
        apiInstance.get(`/vendor/stats/${UserData()?.user_id}`).then((res) => {
            setStats(res.data[0])
 
        })
        apiInstance.get(`/vendor/products/${UserData()?.user_id}`).then((res) => {
            setProducts(res.data)
        })
    }, []) 

    const fetchOrderChartData = async () => {
          const orderResponse = await apiInstance.get(`/vendor-orders-chart/${UserData()?.user_id}`);
          setOrderChartData(orderResponse.data);

          const productResponse = await apiInstance.get(`/vendor-products-chart/${UserData()?.user_id}`);
          setProductChartData(productResponse.data);
    }

    useEffect(() => {
        fetchOrderChartData();
    }, []);

    const orderMonths = orderChartData?.map(item => item.month)
    const orderCounts = orderChartData?.map(item => item.count)

    const productMonths = productChartData?.map(item => item.month)
    const productCounts = productChartData?.map(item => item.count)

    const orderData = {
        labels: orderMonths,
        datasets: [
          {
            label: 'Total Orders',
            data: orderCounts,
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            boarderColor: 'rgba(75, 192, 192, 0.2)',
          }
        ]
    }

    const productData = {
        labels: productMonths,
        datasets: [
          {
            label: 'Total Products',
            data: productCounts,
            fill: false,
            backgroundColor: 'blue',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          }
        ]
    }


  return (

    <div className="container-fluid" id="main">
  <div className="row row-offcanvas row-offcanvas-left h-100">
    {/* Side Bar Here */}
    <SideBar />
    <div className="col-md-9 col-lg-10 main mt-4">
      <div className="row mb-3 container">
        <h4>
          <i className="bi bi-grid" /> All Products
        </h4>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle btn-sm mt-3 mb-4"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter <i className="fas fa-sliders" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                Status: Live
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Status: In-active
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Status: In-review
              </a>
            </li>
            <hr />
            <li>
              <a className="dropdown-item" href="#">
                Date: Latest
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Date: Oldest
              </a>
            </li>
          </ul>
        </div>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Orders</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p, index) => (

            
              <tr key={index}>
                <th scope="row">
                  <img src={p.image} style={{width:'80px', height:'70px', objectFit:'cover', borderRadius:'10px'}} alt="" />
                </th>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.stock_qty}</td>
                <td>{p.orders}</td>
                <td>{p.status.toUpperCase()}</td>
                <td>
                  <Link href="" className="btn btn-primary mb-1 me-2">
                    <i className="fas fa-eye" />
                  </Link>
                  <Link href="" className="btn btn-success mb-1 me-2">
                      <i className="fas fa-edit" />
                  </Link>
                  <Link href="" className="btn btn-danger mb-1 me-2">
                    <i className="fas fa-trash" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

   

  )
}

export default Products