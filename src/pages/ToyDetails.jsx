
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadReviews, addReview} from '../store/actions/review.actions.js'
import { useSelector } from "react-redux"
import { ChatApp } from "../cmps/Chat.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [newMessage, setNewMessage] = useState("");
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [reviewToEdit, setReviewToEdit] = useState({ txt: ''})
    const { toyId } = useParams()
    const navigate = useNavigate()
    // const navigate = useNavigate();
    useEffect(() => {
        const loadData = async () => {
            try {
                await loadToy(); // Wait for loadToy to complete
                await loadReviews({ toyId }); // Wait for loadReviews after loadToy is done
            } catch (err) {
                console.log('Error loading data:', err);
                showErrorMsg('Cannot load data');
                navigate('/toy');
            }
        };
    
        loadData(); // Call the loadData function
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in car details', err)
            showErrorMsg('Cannot load car')
            navigate('/toy')
        }
        // toyService.getById(toyId)
        //     .then((toy) => setToy(toy))
        //     .catch((err) => {
        //         console.log('Had issues in car details', err)
        //         showErrorMsg('Cannot load car')
        //         navigate('/toy')
        //     })
    }

    function handleChange({ target }) {
        let value = target.value;
        setNewMessage(value); 
      }
    
    function handleChangeForReview(ev) {
        const { name, value } = ev.target
        setReviewToEdit({ ...reviewToEdit, [name]: value })
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

    const onAddReview = async ev => {
        ev.preventDefault()
        if (!reviewToEdit.txt) return alert('All fields are required')
        reviewToEdit.toyId = toy._id
        try {
          await addReview(reviewToEdit)
          showSuccessMsg('Review added')
          setReviewToEdit({ txt: ''})
          await loadReviews({ toyId })
        } catch (err) {
            console.log(err);
          showErrorMsg('Cannot add review')
        }
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

                <form onSubmit={onAddReview}>
                <textarea
                    name="txt"
                    onChange={handleChangeForReview}
                    value={reviewToEdit.txt}
                ></textarea>
                <button className="btn">Add</button>
                </form>    

            {reviews && <ul className="review-list">
                {console.log("revs", reviews)}
            {reviews.map(review => (
            <li key={review._id}>
                <h3>{review.txt}</h3>
                <p>
               
                {/* <Link to={`/user/${review.byUser._id}`}>
                    {review.byUser.fullname}
                </Link> */}
               {review.byUser && review.byUser.fullname && <span>
                By:{review.byUser.fullname}
                </span>} 
                </p>
            </li>
            ))}
        </ul>}

            <div>
            <ChatApp toy={toy} />
            </div>

            <Link to="/toy" className="btn">Back</Link>
        </section>
    )
}