import React from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/card.css'

function Card(props) {
    const { image, title, rating, language, duration } = props;
    const navigate = useNavigate();
    const route = title.replace(/\s/g, "-").toLowerCase();

    const handleClick = () => {
        navigate(`./${route}`);
    }


    return (
        <div onClick={handleClick} className='test-card'>
            <div className='relative-div'>
                <div className='test-card__img-div'>
                    <img className='test-card__image' src={image} alt="soap-img" />
                </div>

                <div className="parent-grid">
                    <div className="div1"><img className='test-card__full-image' src={image} alt="soap-full-img" /></div>
                    <div className="div2"><div>{title}</div></div>
                    <div className="div3">⭐️ {rating}</div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Length</td>
                        <td>Lang</td>
                        <td>Rating</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{duration}mins</td>
                        <td>{language.slice(0, 3)}</td>
                        <td>{rating}</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default Card