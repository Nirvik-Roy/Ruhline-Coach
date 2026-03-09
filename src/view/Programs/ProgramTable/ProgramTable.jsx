
import ellipse from '../../../assets/icon.svg'
import Pagination from '../../../Components/Pagination/Pagination'
const ProgramTable = () => {
    return (
        <>
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Programs</h2>
                    </div>
                </div>
                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Program Name</th>
                                <th>Program Category</th>
                                <th>Program Sub-Category</th>
                                <th>Occurrence Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {[1, 2, 3].map(() => (
                                <tr>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>

                                            <div className='customer_details_wrapper'>
                                                <p>Program 1234 <pre />
                                                    #PR456666
                                                </p>

                                            </div>
                                        </div>
                                    </td>
                                    <td>Yoga</td>
                                    <td>Program Sub-Category 1</td>
                                    <td>One-Time</td>
                                    <td>
                                        <div style={{
                                            position: 'relative'
                                        }}>
                                            <img src={ellipse} />


                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination />
            </div>
        </>
    )
}

export default ProgramTable
