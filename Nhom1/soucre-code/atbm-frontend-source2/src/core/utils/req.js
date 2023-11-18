import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleError = (req) => {
    if (req.status === 401) {
        if (req.statusText === 'Unauthorized') {
            return 'Không có quyền truy cập'
        }
    }
    if (req.status === 200) {
        if (req.statusText === 'OK') {
            return 'thành công'
        }
    }
    if (req.status === 400) {
        if (req.statusText) {
            if (req.statusText === 'Bad Request') {
                return req.response
            }
        }
    }
}
const handelNotify = (type, text) => {
    if (type === 'success') {
        return (
            toast.success(text, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        )
    }
    if (type === 'error') {
        return (
            toast.error(text, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        )
    }
    if (type === 'warn') {
        return (
            toast.warn(text, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        )
    }
    if (type === '')
        return (
            toast(text, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        )
}
export {
    handleError,
    handelNotify
}