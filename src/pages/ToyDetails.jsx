
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((car) => setToy(car))
            .catch((err) => {
                console.log('Had issues in car details', err)
                showErrorMsg('Cannot load car')
                navigate('/car')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
           <h4>{toy.name}</h4>
            <div><img src={toy.imgUrl} alt="" /></div>
            <p><span>${toy.price.toLocaleString()}</span></p>
            <p>{toy.inStock ? 'In Stock' : 'Not In Stock'}</p>
            <p className="labels-container"><h1>labels</h1>{toy.labels.map(l=><span className="label">{l}</span>)}</p>
            <p >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis aliquid est, doloremque sit quos ab?</p>
            <Link to="/toy" className="btn">Back</Link>
        </section>
    )
}