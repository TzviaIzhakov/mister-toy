import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom";
export function ToyList({ toys, onRemoveToy}) {
    if(!toys.length) return <div>no toys to show</div>
    return (
        <ul className="toy-list clean-list flex" style={{flexWrap: 'wrap',
            justifyContent: 'space-between'}}>
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)} className="btn">Remove</button>
                        <button className="btn"><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                        <button className="btn"><Link to={`/toy/${toy._id}`}>Details</Link></button>
                    </div>

                </li>
            )}
        </ul>
    )
}
