import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content, id) => {
    const anec = {content: content, id: id, votes: 0}
    const response = await axios.post(baseUrl, anec)
    return response.data
}

const upvote = async (anec) => {
    const response = await axios.put(baseUrl+"/"+anec.id, {...anec, votes: anec.votes+1})
    return response.data
}

export default { getAll, createNew, upvote }