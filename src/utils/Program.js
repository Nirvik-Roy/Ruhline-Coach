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

export const getCardGameQuestionSets = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/question-sets`, {
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

export const editCardGameQuestionSet = async (data, structureId, id, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && setId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/question-sets/${setId}`, data, {
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


export const postQuestionsInsideQuestionSet = async (data, structureId, id, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/question-sets/${setId}/questions`, data, {
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


export const editQuestionsInsideQuestionSet = async (data, structureId, id, questionId, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && structureId && id && setId && questionId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/question-sets/${setId}/questions/${questionId}`, data, {
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


export const deleteQuestionsInsideSet = async (structureId, id, questionId, setId) => {
    const Token = localStorage.getItem('token');
    if (Token && structureId && id && questionId && setId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/question-sets/${setId}/questions/${questionId}`, {
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


export const getCardGameQuestions = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/cards`, {
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

export const postCardGamecards = async (data, id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/cards`, data, {
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

export const editCardGamecards = async (data, id, structureId, cardId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id && cardId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/cards/${cardId}`, data, {
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


export const deleteCardGameCards = async (id, structureId, cardId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && cardId) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/card-game/cards/${cardId}`, {
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

export const postQuoteCategory = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/quote-category`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getAllquoteCategory = async (programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/quote`, {
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
        toast.error('No required data provided..')
    }
}


export const editQuoteCategory = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getSingleQuoteCategory = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/${id}`, {
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

export const getAllQuotes = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes?quote_category_id=${id}`, {
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


export const postQuote = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const editQuote = async (data, id) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Quote edited succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getSingleQuote = async (id) => {
    const Token = localStorage.getItem('token');
    if (Token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/quote-category/quotes/${id}`, {
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

export const postValuesIntermediate = async (data, programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && programId && structureId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-values`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Values added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getValuesIntermediate = async (programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-values`, {
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
        toast.error('Required data not provided...')
    }
}


export const postGoalSettings = async (programId, structureId, data) => {
    const Token = localStorage.getItem('token');
    if (Token && data && programId && structureId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-goal-settings`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Goal settings added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getGoalSettings = async (programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-goal-settings`, {
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
        toast.error('Required data not provided..')
    }
}

export const postCommonMistakes = async (data, programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && programId && structureId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-eight-most-common-mistakes`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Mistakes added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getCommonMistakes = async (programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-eight-most-common-mistakes`, {
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


export const postEachGoal = async (data, programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && programId && structureId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-questions-goal-why`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Goal Added Success..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const getEachGoal = async (programId, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}/structure/${structureId}/intermediate-questions-goal-why`, {
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
export const getSpecificYmethod = async (id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && id && structureId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/intermediate-y-method`, {
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

export const putSpecificYmethod = async (data, id, structureId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${id}/structure/${structureId}/intermediate-y-method`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Common mistakes added succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const updateProgramCoachAvailablity = async (data, programId) => {
    const Token = localStorage.getItem('token');
    if (Token && data && programId) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/program/${programId}/availability`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Coach availablity updated succesfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}

export const getProgramCoachAvailablity = async ( programId) => {
    const Token = localStorage.getItem('token');
    if (Token && programId) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/${programId}/availability`, {
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


export const getCoachAppoinments = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/program/sessions/calendar`, {
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

