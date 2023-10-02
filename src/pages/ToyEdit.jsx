import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { saveToy } from "../store/actions/toy.actions.js";
import { LabelSelector } from "../cmps/LabelSelector.jsx";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { Link, useNavigate, useParams } from "react-router-dom"
export function ToyEdit() {
    const [toy, setToy] = useState(toyService.getEmptyToy());
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
    if (params.toyId) loadToy()
    }, [])

    async function loadToy() {
      try {
        const toy = await toyService.getById(params.toyId)
        setToy(toy)
      } catch (err) {
        console.log('Had issued in toy edit:', err);
        navigate('/toy')
        showErrorMsg('toy not found!')
      }
      
        // toyService.getById(params.toyId)
        //     .then(setToy)
        //     .catch(err => {
        //         console.log('Had issued in toy edit:', err);
        //         navigate('/toy')
        //         showErrorMsg('toy not found!')
        //     })
    }

    function handleChange({ target }) {
      const field = target.name;
      let value = target.value;
      console.log(field, "field");
     
      switch (target.type) {
        case 'number':
        case 'range':
          value = +value || '';
          break;
  
        case 'checkbox':
          value = target.checked;
          break;
      }
      if(field==='inStock'){
        value = value==='yes' ? true : false
      }
      console.log(value, "val");
      setToy((prevToy) => ({ ...prevToy, [field]: value }));
    }

    function onLabelChange(selectedLabels) {
        console.log(selectedLabels, "val");
        setToy((prevToy) => ({ ...prevToy,  labels: selectedLabels }));
    }

    async function onAddToy(toy) {
      const toyToSave = {...toy, imgUrl:'https://res.cloudinary.com/difl1unz7/image/upload/v1696268778/elb0lgfmpgbdf9x82cbz.jpg'};
      try {
        const savedToy = await saveToy(toyToSave);
        showSuccessMsg(`Toy added (id: ${savedToy._id})`);

      } catch (err) {
          console.log('Cannot add toy', err);
          showErrorMsg('Cannot add toy');
      }
      // return saveToy(toyToSave)
      //   .then((savedToy) => {
      //     showSuccessMsg(`Toy added (id: ${savedToy._id})`);
      //   })
      //   .catch((err) => {
      //     console.log('Cannot add toy', err);
      //     showErrorMsg('Cannot add toy');
      //   });
    }
  
    async function onSubmit(ev) {
      ev.preventDefault();
      try {
        await onAddToy(toy)
        navigate('/toy')
      } catch (err) {
        console.log(err)
      }
      // onAddToy(toy).then(_=> navigate('/toy')).catch(err=>console.log(err))
     
    }

  const {name,price,inStock, labels} = toy;
// console.log(labels,"pp");
    return (
      <form onSubmit={onSubmit} className="toy-edit">
        <input
          placeholder="Please enter your toy name"
          onChange={handleChange}
          name="name"
          value={name}
        />
          <select name="inStock" id=""  onChange={handleChange} value={inStock?"yes" : "no"}>
            <option value="">In Stock?</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>

        <input
          placeholder="Please enter your toy's price"
          onChange={handleChange}
          name="price"
          type="number"
          value={price}
          />

          <LabelSelector labels={toyService.getLabels()} onLabelChange={onLabelChange} selectedLabelsProp={labels}/>

          <button className="btn send">Send</button>
      </form>
    );
    
}