import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../../Components/Button'
import ellipse from '../../../../assets/_MoreIcon_.svg'
import Pagination from '../../../../Components/Pagination/Pagination.jsx'
const ProgramGoal = () => {
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
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>Goal Settings</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/appoinments'))}>Appointments</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1'))}>Program 1</span> / <span onClick={(() => navigate('/dashboard/appoinments/program/1/goal'))} >Goal Settings</span></small>
                    </div>
                    <Button children={'Create Goal'} />
                </div>

                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Goal Name</th>
                                <th>Created by</th>
                                <th>Goal Type</th>
                                <th>Start Date</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6].map((e, i) => (
                                <tr>
                                   
                                    <td>Goal 1</td>
                                    <td>Coach</td>
                                    <td>Long term</td>
                                    <td>27/10/2025</td>
                                    <td>
                                        <img onClick={(() => indexFunction(i))} src={ellipse} />
                                        {index.includes(i) && <div className='actions_wrapper'>
                                            <p onClick={(() => {
                                                navigate(`/dashboard/coaches/single-coache/${i + 1}`)
                                            })}>View</p>
                                            <p onClick={(() => { seteditCoachModal(true) })}>Edit</p>
                                            <p>Delete</p>
                                        </div>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination/>
            </div>
        </>
    )
}

export default ProgramGoal
