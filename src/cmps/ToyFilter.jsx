
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})

    onSetFilter = useRef(utilService.debounce(onSetFilter))
 
    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
      }

      
    return (
        <section className="car-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="inStock"> By Stock:</label>
                <input type="checkbox"
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock}
                    onChange={handleChange}
                />
                <label htmlFor="labels">By Labels:</label>

                <select name="labels" id="labels" onChange={handleChange}>
                    <option value="">Select labels</option>
                  {toyService.getLabels().map((l,i)=><option key={i} value={l}>{l}</option>)}
                </select>

            </form>

        </section>
    )
}