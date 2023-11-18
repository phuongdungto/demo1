import Header from "./Header";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";

function DefaultLayout({ children }) {
    const mystyle = {
        border: '0px',
        width: '100%',
        position: 'fixed',
        display: 'block',
        zIndex: '15',
        top: 0,
    }
    return (
        <div style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', }}>
            <header style={mystyle}>
                <Header />

            </header>

            <div className="container mt-5">
                {/* <Sidebar /> */}
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayout;