import axios from "axios";
import toast from "react-hot-toast";

export const getCoachPrograms = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('You are not authenticated')
    }

}


export const getCoachSinglePrograms = async (programId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Required details not provided....')
    }

}

export const getCoachProgramsStructure = async (programId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Required details not provided....')
    }

}

export const getValuesQuestion = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/values/questions`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const postValuesQuestion = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/values/questions`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const editValuesQuestion = async (data, structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/values/questions/${questionId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteValuesQuestion = async (structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/values/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const postMotivationWord = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/words`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getMotivationWord = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/words`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const updateMotivationWord = async (data, structureId, id, wordId) => {
    const Token = localStorage.getItem('token');
    console.log(wordId)
    if (Token && data && structureId && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/words/${wordId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteMotivationWord = async (structureId, id, wordId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/words/${wordId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getWhoAmiQuestions = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/who-am-i/questions`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postWhoAmiQuestions = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/who-am-i/questions`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}



export const editWhoAmiQuestions = async (data, structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && questionId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/who-am-i/questions/${questionId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const deleteWhoAmiQuestions = async (structureId, id, questionId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/who-am-i/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}
export const postwheelofLifeElements = async (data, structureId, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Life elements added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getwheelofLifeElements = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getWheelOfLifeQuestions = async (id, structureId, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && elementId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const postWheelofLifeQuestion = async (data, structureId, id, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && elementId) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editWheelofLifeQuestion = async (data, structureId, id, questionId, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && elementId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions/${questionId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteWheelofLifeQuestion = async (structureId, id, questionId, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId && elementId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const updateWheelofLifeLifeElements = async (data, structureId, id, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && elementId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteWheelofLifelement = async (structureId, id, elementId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && elementId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/wheel-of-life/elements/${elementId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values Questions added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getDocuments = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/upload-documents`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const postDocuments = async (data, id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/upload-documents`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Documents added succesfully...');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editDocuments = async (data, id, structureId, documentId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/upload-documents/${documentId}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Documents edited succesfully...');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const deleteDocuments = async (id, structureId, documentId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && documentId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/upload-documents/${documentId}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Document deleted succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}