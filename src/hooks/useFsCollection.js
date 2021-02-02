import { useEffect, useState } from 'react'
import firebase from 'firebase/app'

const db = firebase.firestore()

const useFsCollection = path => {
  const [items, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateDoc = (items, options = { merge: true }) => {
    db.doc(path).set(items, options)
  }

  useEffect(() => {
    if (!path) return
    setLoading(true)
    const unsubscribe = db.collection(path).onSnapshot(qs => {
      const items = qs.docs().map(docSnap => docSnap.data())
      setLoading(false)
      setError(false)
      setData(items)
    })
    return unsubscribe
  }, [path])

  return [items, updateDoc, { loading, error }]
}

export default useFsCollection
