
import { useNavigate } from 'react-router-dom'
import ellipse from '../../../assets/icon.svg'
import Pagination from '../../../Components/Pagination/Pagination'
import { useEffect, useState } from 'react'
import { getCoachPrograms } from '../../../utils/Program'
import Loaders from '../../../Components/Loaders/Loaders'
const ProgramTable = () => {
    const navigate = useNavigate()
    const [programData, setprogramData] = useState([])
    const [loading, setloading] = useState(false)
    const fetchPrograms = async () => {
        try {
            setloading(true)
            const res = await getCoachPrograms();
            if (res?.success) {
                setprogramData(res?.data?.data)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fetchPrograms()
    }, [])


    // Pagination logic & Search Logic...
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // 500ms delay
        return () => clearTimeout(timer); // cleanup
    }, [searchTerm]);
    const filteredData = programData?.filter((item) =>
        item?.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * itemsPerPage;
    const currentItems = filteredData?.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };


    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_container'>
                <div className='coaches_head_wrapper'>
                    <div>
                        <h2>Programs</h2>
                    </div>
                    <div className='coaches_button_wapper'>
                        <div className='coaches_search_wrapper'>
                            <input onChange={((e) => setSearchTerm(e?.target?.value))} placeholder='Search' />
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                <div className='table_container'>
                    <table className='total_table_order_wrapper coaches_table_wrapper'>
                        <thead>
                            <tr>
                                <th>Program Name</th>
                                <th>Program Category</th>
                                {/* <th>Program Sub-Category</th> */}
                                <th>Occurrence Type</th>
                                <th style={{
                                    textAlign: 'center'
                                }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(currentItems?.length <= 0 && loading) && <td colSpan={12}>Searching programs...</td>}
                            {(currentItems?.length <= 0 && !loading) && <td colSpan={12}>No programs found...</td>}
                            {currentItems?.map((element, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className='customer_wrapper' style={{
                                            justifyContent: 'flex-start'
                                        }}>

                                            <div className='customer_details_wrapper'>
                                                <p>{element?.name}
                                                </p>

                                            </div>
                                        </div>
                                    </td>
                                    <td>{element?.program_category?.name}</td>
                                    {/* <td>Program Sub-Category 1</td> */}
                                    <td style={{
                                        textTransform: 'capitalize'
                                    }}>{element?.occurrence_type}</td>
                                    <td>
                                        <div onClick={(() => navigate(`/dashboard/program/single-program/${element?.id}`))} style={{
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
                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </>
    )
}

export default ProgramTable
