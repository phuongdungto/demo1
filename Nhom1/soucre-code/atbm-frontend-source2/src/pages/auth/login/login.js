import 'bootstrap/dist/css/bootstrap.min.css';
import './login.scss'

import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import { loginService } from '../../../service/authService'
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userLogin } from '../../../store/actions/userAction';
import { Link } from 'react-router-dom';
import cookies from 'react-cookies'

const Login = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const [validate, setValidate] = useState('')
    const navigate = useNavigate();
    const handleChange = e => {
        const value = e.target.value;

        setLogin({
            ...login,
            [e.target.name]: value
        });
    };
    const handleOnclick = async (e) => {
        e.preventDefault();
        const toastOptions = {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }
        const isValid = validateAll()
        if (!isValid) return
        try {

            let response = await loginService(login);
            const data = response && response.data ? response.data : '';
            if (data) {
                dispatch(userLogin(data.information))
                navigate('/');
            }
        } catch (e) {
            if (e.response.data.error && Array.isArray(e.response.data.error) && e.response.data.error[0] && e.response.data.error[0].field) {
                toast.error(e.response.data.error[0].message, toastOptions)
            }
            else {
                const message = e.response.data.error === 'Email or password is incorrect' ? 'Email hoặc mật khẩu không chính xác' : e.response.data.error
                toast.error(message, toastOptions)
            }
        }
    }
    const validateAll = () => {
        const msg = {}
        if (validator.isEmpty(login.email)) {
            msg.email = "Vui lòng nhập email"
        } else {
            if (!validator.isEmail(login.email)) {
                msg.email = "Email không hợp lệ"
            }
        }

        if (validator.isEmpty(login.password)) {
            msg.password = "Vui lòng nhập mật khẩu"
        }
        else {
            if (login.password.length < 8) {
                msg.password = 'Mật khẩu phải có ít nhất 8 ký tự'
            }
        }
        setValidate(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    return (
        <>
            <ToastContainer />
            <div className="container" style={{ paddingTop: '80px' }}>
                <div className="row m-5 no-gutters shadow-lg login-form">
                    <div className="col-md-6 d-none d-md-block">
                        <img src={require('../../../assets/images/loginBaner.jpg')} className="img-fluid" style={{ minHeight: '100%' }} alt='' />
                    </div>
                    <div className="col-md-6 bg-white p-5">
                        <h2 className="pb-3 fw-bold">Đăng nhập</h2>
                        <div className="form-style">
                            <form onSubmit={handleOnclick}>
                                <div className="form-group pb-3">
                                    <input type="email" placeholder="Email" className="form-control" name='email' onChange={handleChange} aria-describedby="emailHelp" />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.email}</p>

                                </div>
                                <div className="form-group pb-3">
                                    <input type="password" placeholder="Mật khẩu" className="form-control" name='password' onChange={handleChange} />
                                    <p style={{ color: 'red' }} className='text-red-400 text-xs italic'>{validate.password}</p>
                                </div>
                                <div className="pb-2">
                                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2" >Đăng nhập</button>
                                </div>
                            </form>
                            <div className="pt-4 text-center">
                                Hãy trở thành thành viên để nhận thêm ưu đãi <Link to='/signup'>Đăng ký</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Login;