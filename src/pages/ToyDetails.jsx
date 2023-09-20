
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
            <h1>🧸</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Is in Stock?: <span>{toy.inStock ? 'yes' : 'no'}</span></p>
            <p>labels: {toy.labels.map(l=><span>{l}</span>)}</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis aliquid est, doloremque sit quos ab?</p>
            <Link to="/toy">Back</Link>
        </section>
    )
}