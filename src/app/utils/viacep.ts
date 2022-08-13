import axios from 'axios'

export default async function getAddress (cep: string) {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response)
  return data
}
