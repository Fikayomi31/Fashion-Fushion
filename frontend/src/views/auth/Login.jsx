import { useEffect, useState } from "react";
import { login } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { Link } from "react-router-dom";
import berlinImage from "../../assets/berlin-998177 1.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await login(email, password);
    if (error) {
      alert(error);
    } else {
      navigate("/");
      resetForm();
    }
    setIsLoading(false);
  };

  return (
    <section
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${berlinImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Login Form */}
      <main className="relative z-10 w-full flex justify-center">
        <div className="container">
          {/* Section: Login form */}
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <h3 className="text-center">Login</h3>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form onSubmit={handleLogin}>
                          {/* Email input */}
                          <div className="form-outline mb-4">
                            <label className="form-label">Email Address</label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                            />
                          </div>

                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="mr-2 ">Processing...</span>
                                <i className="fas fa-spinner fa-spin" />
                              </>
                            ) : (
                              <>
                                <span className="mr-2">Sign In </span>
                                <i className="fas fa-sign-in-alt" />
                              </>
                            )}
                          </button>

                          <div className="text-center">
                            <p className="mt-4">
                              Don't have an account? <Link to="/register">Register</Link>
                            </p>
                            <p className="mt-0">
                              <Link to="/forgot-password" className="text-danger">
                                Forgot Password?
                              </Link>
                            </p>
                          </div>
                        </form>
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
  );
};

export default Login;
