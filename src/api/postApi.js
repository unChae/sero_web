import axios from 'axios';
const url = process.env.VUE_APP_SERVER_URL;

export async function getPostData() {
  return await axios.post(`${url}web/get_request_data`,{})
  .catch(err => {
    console.log(`[postApi] ${err}`)
  })
}
