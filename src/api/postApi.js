import axios from 'axios';
const url = process.env.VUE_APP_SERVER_URL;

export async function getPostData(payload) {
  return await axios.post(`${url}web/get_request_data`,{payload})
  .catch(err => {
    console.log(`[postApi] ${err}`)
  })
}

export async function updatePostState(payload) {
  return await axios.post(`${url}web/update_post_state`,{payload})
  .catch(err => {
    console.log(`[postApi] ${err}`)
  })
}