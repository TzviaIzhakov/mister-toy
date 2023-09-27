import { Link } from "react-router-dom";
import logoToyUrl from '../assets/img/buzz.png'

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4 className="toy-name">{toy.name}</h4>
            <img src={toy.imgUrl} alt="bazz" className="img-toy"/>
           <div className="flex">
           <div className="price-wrapper">
            <span className="price">${toy.price.toLocaleString()}</span>
            </div>
           
            <div className={`in-stock-wrapper ${toy.inStock ? 'green' : 'red'}`}><span>{toy.inStock ? 'In Stock' : 'Not In Stock'}</span></div>
           </div>
            
            
           
            <p>labels: {toy.labels.map(l=><span key={l}>{l} {' '}</span>)}</p>
            
        </article>
    )
}