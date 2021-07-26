import LoginFooter from "../../component/login/LoginFooter";
import axios from "axios";
import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  console.log(props);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    axios.post("https://quizapp-sdp.herokuapp.com/api/admin/login", user).then(
      (response) => {
        console.log(response.data.token);
        // set the state of the user
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.data.token,
            email: response.data.email,
          })
        );
        setUser(response.data);
        // store the user in localStorage
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (user) {
    props.history.push("/dashboard");
  }

  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h3 class="text-center font-weight-light my-4">Login</h3>
                    </div>
                    <div className="card-body">
                      <form>
                        <div claclassNamess="form-group">
                          <label className="small mb-1" for="inputEmailAddress">
                            Email
                          </label>
                          <input
                            className="form-control py-4"
                            id="inputEmailAddress"
                            type="email"
                            value={email}
                            placeholder="Enter email address"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="small mb-1" for="inputPassword">
                            Password
                          </label>
                          <input
                            className="form-control py-4"
                            id="inputPassword"
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="rememberPasswordCheck"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              for="rememberPasswordCheck"
                            >
                              Remember password
                            </label>
                          </div>
                        </div>
                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="password.html">
                            Forgot Password?
                          </a>
                          <button
                            className="btn btn-primary"
                            href="index.html"
                            onClick={onSubmit}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center">
                      <div className="small">
                        <a href="register.html">Need an account? Sign up!</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
