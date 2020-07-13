import axios from 'axios'
import { setIsAddGoalAction, setAllGoalsAction } from '../redux/actions/goalsActions'

export const route = 'http://10.0.2.2:8181/'

//goals

export const getAllGoals = async (dispatch) => {
    // console.log('getting all goals')
    let res = await axios.get(`${route}items`)
    const goals = res.data
    setAllGoalsAction(goals, dispatch)
    console.log('got all goals')
}

export const addGoal = async (goalTitle, dispatch) => {
    let key = Math.random().toString()
    let newItem = { key: key, item: goalTitle }
    await axios.post(`${route}item`, newItem)
    await getAllGoals(dispatch)
    await setIsAddGoalAction(false, dispatch)
}

export const deleteGoal = async (id, dispatch) => {
    await axios.delete(`${route}item/${id}`)
    getAllGoals(dispatch)
}


//audio

export const saveAudioToDB = async (obj) => {
    const saveAudio = {
        "type": "audio",
        "duration": obj._finalDurationMillis,
        "sound": obj.sound
    }
    await axios.post(`${route}audio`, saveAudio)
}