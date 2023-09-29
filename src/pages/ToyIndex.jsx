import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { ToyList } from '../cmps/ToyList.jsx'
import {loadToys, removeToyOptimistic} from '../store/actions/toy.actions.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'


export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
   
   
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
            <main>
                
                {isLoading && <div>Loading...</div>}

                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!user && <div>need to login to see the toys</div>}

                {(!isLoading && user) &&
                <section>

                    {user.isAdmin && <div className='add-toy flex align-center justify-center'>
                    <Link to="/toy/edit" className="btn">Add Toy</Link>
                    </div>}

    `           <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />
                </section> 
                }

               
                
            </main>
        </div>
    )

}