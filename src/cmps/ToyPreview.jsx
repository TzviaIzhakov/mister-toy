import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <h4>{toy.name}</h4>
            <h1>🧸</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Is in Stock?: <span>{toy.inStock ? 'yes' : 'no'}</span></p>
            <p>labels: {toy.labels.map(l=><span key={l}>{l} {' '}</span>)}</p>
            <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
        </article>
    )
}