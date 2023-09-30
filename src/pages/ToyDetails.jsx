
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [newMessage, setNewMessage] = useState("");
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in car details', err)
                showErrorMsg('Cannot load car')
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let value = target.value;
        setNewMessage(value); 
      }

   function onSubmit(e) {
        e.preventDefault(); 
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), { ...toy.msgs, txt: newMessage } ],
        }));
        setNewMessage("");

        toyService.addMsg(toy._id,{txt: newMessage})
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
           <h4>{toy.name}</h4>
            <div><img src={toy.imgUrl} alt="" /></div>
            <p><span>${toy.price.toLocaleString()}</span></p>
            <p>{toy.inStock ? 'In Stock' : 'Not In Stock'}</p>
            <p className="labels-container"><p>labels</p>{toy.labels.map(l=><span className="label" key={l}>{l}</span>)}</p>
            <p >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis aliquid est, doloremque sit quos ab?</p>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={handleChange} name="txt" placeholder="enter your msgs"/>
            </form>
            {toy.msgs.length ? <ul>
                {toy.msgs.map((m,i)=><li key={i}>{m.txt}</li>)}
                </ul> : <div>no msgs to show</div>}
            <Link to="/toy" className="btn">Back</Link>
        </section>
    )
}