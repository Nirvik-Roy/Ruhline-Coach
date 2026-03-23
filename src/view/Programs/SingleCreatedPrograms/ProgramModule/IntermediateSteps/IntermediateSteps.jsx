import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ellipse from '../../../assets/_MoreIcon_.svg'
import Pagination from '../../../Components/Pagination/Pagination'
const IntermediateSteps = () => {
    const [index, setIndex] = useState([]);
    const navigate = useNavigate()
    const indexFunction = (i) => {
        if (index.includes(i)) {
            setIndex(prev => prev.filter((e) => e != i))
        } else {
            setIndex([...index, i])
        }
    }
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Intermediate Steps</h2>
                        <small><span onClick={(() => navigate('/dashboard/programs'))}>Programs</span> / <span onClick={(() => navigate('/dashboard/programs/intermediate'))}>Intermediate Steps</span></small>
                    </div>
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Intermediate Step Name</th>

                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Values Intermediate Page</td>
                                <td>
                                    <img onClick={(() => indexFunction(1))} src={ellipse} />
                                    {index.includes(1) && <div className='actions_wrapper' style={{
                                        bottom: '-50px',
                                        width: '50%',
                                        left: '0px'
                                    }}>
                                        <p onClick={(() => {
                                            navigate(`/dashboard/programs/intermediate/values-intermediate`)
                                        })}>View</p>
                                        {/* <p >Edit</p> */}
                                        {/* <p>Delete</p> */}
                                    </div>}
                                </td>
                            </tr>

                            <tr>

                                <td>The Y Method</td>
                                <td>
                                    <img onClick={(() => indexFunction(2))} src={ellipse} />
                                    {index.includes(2) && <div className='actions_wrapper' style={{
                                        bottom: '-50px',
                                        width: '50%',
                                        left: '0px'
                                    }}>
                                        <p onClick={(() => {
                                            navigate(`/dashboard/programs/intermediate/y-method`)
                                        })}>View</p>
                                        {/* <p >Edit</p> */}
                                        {/* <p>Delete</p> */}
                                    </div>}
                                </td>
                            </tr>

                            <tr>

                                <td>Goal Settings Intermediate Page</td>
                                <td>
                                    <img onClick={(() => indexFunction(4))} src={ellipse} />
                                    {index.includes(4) && <div className='actions_wrapper' style={{
                                        bottom: '-50px',
                                        width: '50%',
                                        left: '0px'
                                    }}>
                                        <p onClick={(() => {
                                            navigate(`/dashboard/programs/intermediate/goal-settings`)
                                        })}>View</p>
                                        {/* <p >Edit</p> */}
                                        {/* <p>Delete</p> */}
                                    </div>}
                                </td>
                            </tr>

                            <tr>

                                <td>Eight most common mistakes Intermediate Page</td>
                                <td>
                                    <img onClick={(() => indexFunction(5))} src={ellipse} />
                                    {index.includes(5) && <div className='actions_wrapper' style={{
                                        bottom: '-50px',
                                        width: '50%',
                                        left: '0px'
                                    }}>
                                        <p onClick={(() => {
                                            navigate(`/dashboard/programs/intermediate/common-mistakes`)
                                        })}>View</p>
                                        {/* <p >Edit</p> */}
                                        {/* <p>Delete</p> */}
                                    </div>}
                                </td>
                            </tr>




                            <tr>

                                <td>Questions for each goal - why? Intermediate Page</td>
                                <td>
                                    <img onClick={(() => indexFunction(6))} src={ellipse} />
                                    {index.includes(6) && <div className='actions_wrapper' style={{
                                        bottom: '-40px',
                                        width: '50%',
                                        left: '0px'
                                    }}>
                                        <p onClick={(() => {
                                            navigate(`/dashboard/programs/intermediate/each-goal`)
                                        })}>View</p>
                                        {/* <p >Edit</p> */}
                                        {/* <p>Delete</p> */}
                                    </div>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Pagination />
            </div>
        </>
    )
}

export default IntermediateSteps
