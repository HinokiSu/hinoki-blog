import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
// Request header information is set for post request
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

interface IHttpParams {
  url: string
  data?: object
}

// Get request
export const httpGet = ({ url }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .get(url, {})
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

// Post request
export const httpPost = ({ url, data }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })

// Delete request
export const httpDelete = ({ url }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })

// Put request
export const httpPut = ({ url, data }: IHttpParams) =>
  new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
