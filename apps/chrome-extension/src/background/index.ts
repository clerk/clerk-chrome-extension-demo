import { getToken } from './get-token'

console.log('BACKGROUND SCRIPT LOADING')

const getAndPrintToken = async () => {
  const token = await getToken()
  console.log("clerk token", token)
  setTimeout(() => {
    getAndPrintToken()
  }, 10000)
}

getAndPrintToken()
