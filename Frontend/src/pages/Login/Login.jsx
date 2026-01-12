import React, { use, useRef, useState } from "react";
import Loader from '../../ReusableComponents/Loader/Loader'
import show from '../../assets/eye.png'
import hide from '../../assets/hide.png'
import { useNavigate } from "react-router";
import logo from '../../assets/peercoin.png'
import userIcon from '../../assets/user.png'
import passIcon from '../../assets/padlock.png'
import illustration from '../../assets/login-illustration.png'
import { postRequest } from "../../apiRoutes";
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [error, setError] = useState("");
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });

    const handleFormInput = (field, event) => {
        setLoginFormData({ ...loginFormData, [field]: event.target.value })
    }

    useRef(() => {
        const getToken = localStorage.getToken("token")
        if (getToken) {
            navigate("/dashboard")
        }
    })
    const handleLogin = async () => {
        const { email, password } = loginFormData;

        if (!email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const data = await postRequest("http://127.0.0.1:5555/login", loginFormData);

            console.log("Login Response:", data);

            if (data.ok) {
                localStorage.setItem("token", data.token);
                alert("Login Successful!");
                navigate("/dashboard");
            } else {
                setError(data.message || "Invalid credentials");
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        isLoading ? (
            <Loader />
        ) : (
            <div className="login-container">
                <div className="login-main">
                    <div className="login-card">
                        <div className="blogger">
                            <img src={logo} alt="Blogger-logo" width={40} height={40} />
                            <h1 className="blogger-Heading">Post</h1>
                        </div>
                        <div>
                            <h1>Sign In</h1>
                            <p>Continue to Posts</p>
                        </div>
                        <div className="input-group group-1">
                            <img src={userIcon} alt="" className="user-icon" />
                            <input
                                type="email"
                                className="input"
                                required
                                placeholder=" "
                                autoComplete="username"
                                onChange={(e) => handleFormInput('email', e)}
                                value={loginFormData.email}
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-group group-2">
                            <img src={passIcon} alt="" className="password-icon" />
                            <input
                                type={isPasswordHidden ? 'password' : 'text'}
                                className="input"
                                required
                                placeholder=" "
                                autoComplete="current-password"
                                onChange={(e) => handleFormInput('password', e)}
                                value={loginFormData.password}
                            />
                            <label>Password</label>
                            {loginFormData.password.trim().length ? <img src={isPasswordHidden ? hide : show} alt="Eye Icon" onClick={() => setIsPasswordHidden(!isPasswordHidden)} className="showIcon" /> : null}
                        </div>
                        <button onClick={handleLogin}>Sign In</button>
                        <p>Don't have an Account <button onClick={() => navigate('/signup')}>SignUp</button></p>
                    </div>
                </div>
                <div className="login-bg">
                    <img src={illustration} alt="" className="login-illustrations" />
                </div>
            </div>
        )
    )
}

export default Login;
