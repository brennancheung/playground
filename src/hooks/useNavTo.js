import { useHistory } from 'react-router-dom'

export const useNavTo = () => {
  const history = useHistory()
  return url => () => history.push(url)
}
