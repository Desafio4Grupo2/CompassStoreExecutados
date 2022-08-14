import axios from 'axios'

export default async function getBid (code: string) {
  const { data } = await axios.get(`https://economia.awesomeapi.com.br/USD-${code}/1`)
    .then(response => {
      return response
    })
  return data[0].bid
}
