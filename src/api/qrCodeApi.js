import axios from 'axios';
const url = process.env.VUE_APP_SERVER_URL;

export async function getQrData(poId) {
  return await axios.post(`${url}qr/get_qr_data`,{
    "po_id": poId
  })
  .catch(err => {
    console.log(`[qrCodeApi] ${err}`)
  })
}

