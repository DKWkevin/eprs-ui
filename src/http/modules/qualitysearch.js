import axios from '../axios'


export const selectGdwzsjxqygy = (data) => {
    return axios({
        url: '/gdwzsjxqygy/select',
        method: 'post',
        data
    })
}