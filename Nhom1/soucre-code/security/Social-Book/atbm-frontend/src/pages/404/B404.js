import 'bootstrap/dist/css/bootstrap.min.css';
import './B404.scss'


const B404 = () => {

    return (
        <>
            <div className='bodyy'>
                <h1 className='hh11'>404</h1>
                <div className="cloak__wrapper404">
                    <div className="cloak__container404">
                        <div className="cloak404"></div>
                    </div>
                </div>
                <div className="info404">
                    <h2>We can't find that page</h2>
                    <p className='pp'>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p><a href="/" className='aa' target="_blank" rel="noreferrer noopener">Home</a>
                </div>
            </div>
        </>
    )
}

export default B404;