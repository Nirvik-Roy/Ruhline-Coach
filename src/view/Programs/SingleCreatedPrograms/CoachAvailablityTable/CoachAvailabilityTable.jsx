import React, { useEffect, useState } from 'react'
import ellipse from '../../../../assets/icon.svg'
import Button from '../../../../Components/Button'
import { getCoachSinglePrograms, getProgramCoachAvailablity } from '../../../../utils/Program'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../../../Components/Loaders/Loaders'
import CoachAvailablityModal from '../../../Modal/CoachAvailablityModal'
import Pagination from '../../../../Components/Pagination/Pagination'
const CoachAvailabilityTable = () => {
    const [loading, setloading] = useState(false)
    const [availablityModal, setavailablityModal] = useState(false)
    const [singleProgramData, setsingleProgramData] = useState([]);
    const [availableDetails, setavailableDetails] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const fetchSinglePrograms = async () => {
        try {
            setloading(true)
            const res = await getCoachSinglePrograms(id);
            if (res?.success) {
                setsingleProgramData(res?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    const fetchCoachAvailablity = async () => {
        try {
            setloading(true);
            const res = await getProgramCoachAvailablity(id);
            if (res?.success) {
                setavailableDetails(res?.data?.availability_rules)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchSinglePrograms()
        fetchCoachAvailablity()
    }, [])


    // Pagination logic only

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;

    const currentItems = availableDetails?.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(availableDetails?.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <>
            {loading && <Loaders />}
            {availablityModal && <CoachAvailablityModal fetchCoachAvailablity={fetchCoachAvailablity} setavailablityModal={setavailablityModal} />}
            <div className='dashboard_container'>
                <div className='appointes_head_wrapper'>
                    <div>
                        <h2>{singleProgramData?.name}</h2>
                        <small style={{
                            cursor: 'pointer'
                        }}><span onClick={(() => navigate('/dashboard/program'))}>Programs</span> / <span onClick={(() => navigate(`/dashboard/program/single-program/${id}`))}>{singleProgramData?.name}/</span> <span>Coach Availability</span></small>
                    </div>

                    <Button onClick={(() => { setavailablityModal(true) })} children={'Update Availablity'} />
                </div>
                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Day</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Date From</th>
                                <th>Date To</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {(currentItems?.length <= 0 && loading) && <td colSpan={12}>Searching avaliablity...</td>}
                            {(currentItems?.length <= 0 && !loading) && <td colSpan={12}>No avaliablity details found..</td>}
                            {currentItems?.map((element, index) => (
                                <tr key={index}>
                                    <td>#{element?.id}</td>
                                    <td>{element?.day_of_week == 0 ? 'Sunday' : element?.day_of_week == 1 ? 'Monday' : element?.day_of_week == 2 ? 'Tuesday' : element?.day_of_week == 3 ? 'Wednesday' : element?.day_of_week == 4 ? 'Thursday' : element?.day_of_week == 5 ? 'Friday' : element?.day_of_week == 6 ? 'Saturday' : ''}</td>
                                    {/* <td>Program Sub-Category 1</td> */}
                                    <td style={{
                                        textTransform: 'capitalize'
                                    }}>{element?.start_time}</td>
                                    <td style={{
                                        textTransform: 'capitalize'
                                    }}>{element?.end_time}</td>

                                    <td style={{
                                        textTransform: 'capitalize'
                                    }}>{element?.effective_from}</td>
                                    <td style={{
                                        textTransform: 'capitalize'
                                    }}>{element?.
                                        effective_to}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </>
    )
}

export default CoachAvailabilityTable
