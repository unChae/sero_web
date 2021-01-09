import axios from 'axios';
const url = process.env.VUE_APP_SERVER_URL;

export async function getAdminData(payload) {
  return await axios.post(`${url}admin/token_check`,{
    "ad_id": payload.adId,
    "ad_token": payload.adToken
  })
  .catch(err => {
    console.log(`[qrCodeApi] ${err}`)
  })
}

export async function login(payload) {
  return await axios.post(`${url}admin/login`,{
    "ad_account": payload.adAccount,
    "ad_password": payload.adPassword
  })
  .catch(err => {
    console.log(`[authApi] ${err}`)
  })
}


