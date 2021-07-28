import axios from 'axios';
import {GET_ERRORS,SET_QUESTIONS,SET_ANSWER,ADD_TO_SEQUENCE,Add_Matching_List} from './types'
const backEndIP= require('../../config/URLS.json').backEndIP;

export const setQuestions = () => dispatch =>{
    ////console.log("questions")

    axios.get(`${backEndIP}/routes/api/questions`)
    .then(res => {
     const questions = res.data.data ;   
     //console.log(questions)
     localStorage.setItem('questions',questions);
     dispatch(storeQuestions(questions));  
    })
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err
    })
    );
};


export const addTOSequence = sequence => dispatch =>{
     dispatch(addSequence(sequence));  
};
export const setAnswer = (sequence,id) => dispatch =>{
    //console.log("here1")
    //console.log(sequence)
    //console.log(id)
    
    
    axios.post(`${backEndIP}/routes/api/quizzes/user`,{sequence})
    .then(res => {
     const users = res.data.data ;   
     //console.log(res.data)
     dispatch(addMatchingList(users)); 
    })
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err
    })
    );
};
export const getMatchingList = () => dispatch =>{
    ////console.log("hereNadine")

    axios.get(`${backEndIP}/routes/api/quizzes/user`)
    .then(res => {
     const users = res.data.data ;   
     //console.log(res.data)
     dispatch(addMatchingList(users)); 
    })
    .catch(err=>
        dispatch({
            type:GET_ERRORS,
            payload:err
    })
    );
};

export const storeQuestions = ( questions )=>{
    return {
        type:SET_QUESTIONS,
        payload:questions
    }
}

export const storeAnswer  = ( sequence )=>{
    return {
        type:SET_ANSWER,
        payload:sequence
    }
}
export const addSequence  = ( sequence )=>{
    return {
        type:ADD_TO_SEQUENCE,
        payload:sequence
    }
}
export const addMatchingList  = ( matchingList  )=>{
    return {
        type:Add_Matching_List,
        payload:matchingList
    }
}
