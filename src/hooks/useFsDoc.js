import { useEffect, useState } from 'react'
import firebase from 'firebase/app'

const db = firebase.firestore()

const useFsDoc = path => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateDoc = (data, options = { merge: true }) => {
    db.doc(path).set(data, options)
  }

  useEffect(() => {
    if (!path) return
    setLoading(true)
    const unsubscribe = db.doc(path).onSnapshot(doc => {
      const data = doc.data()
      setLoading(false)
      setError(false)
      setData(data)
    })
    return unsubscribe
  }, [path])

  return [data, updateDoc, { loading, error }]
}

export default useFsDoc
