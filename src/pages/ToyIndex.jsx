import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadInitalToys, loadToys, removeToyOptimistic} from '../store/actions/toy.actions.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { toyService } from '../services/toy.service.js'
import { MyChart } from '../cmps/MyChart.jsx'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
   
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])


    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Car removed')
            })
            .catch(err => {
                console.log('Cannot remove car', err)
                showErrorMsg('Cannot remove car')
            })
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button><Link to="/toy/edit">Add Toy</Link></button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!isLoading &&
                <section>
    `           <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />
                {/* <div style={{width:'14em'}}> */}
                  <MyChart/>
                {/* </div> */}
                </section> 
               
                }

                {isLoading && <div>Loading...</div>}
                
            </main>
        </div>
    )

}