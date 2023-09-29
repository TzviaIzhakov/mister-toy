import { useSelector } from "react-redux";
import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom";
export function ToyList({ toys, onRemoveToy}) {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    if(!toys.length) return <div>no toys to show</div>
    return (
        <ul className="toy-list clean-list flex" style={{flexWrap: 'wrap',
            justifyContent: 'space-between'}}>
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    {user.isAdmin && <div>
                        <button onClick={() => onRemoveToy(toy._id)} className="btn">Remove</button>
                        <Link to={`/toy/edit/${toy._id}`} className="btn">Edit</Link>
                    </div>}
                       <Link to={`/toy/${toy._id}`} className="btn">Details</Link>
                    

                </li>
            )}
        </ul>
    )
}
