import React, { useState, useRef } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { App, SignInButton, Message, Sent, Received } from '../styles/pages/Home'

const app = firebase.apps.length === 0
  ? firebase.initializeApp({
    apiKey: 'AIzaSyDNPXZ_m-maJbHcu7gG7xbpbg1WMo790Uw',
    authDomain: 'chatter-ca499.firebaseapp.com',
    projectId: 'chatter-ca499',
    storageBucket: 'chatter-ca499.appspot.com',
    messagingSenderId: '156472035413',
    appId: '1:156472035413:web:573aaa5dba46f9974aecdc',
    measurementId: 'G-NQ673NXY2M'
  })
  : firebase.app()

const auth = app.auth()
const firestore = app.firestore()
// const analytics = app.analytics()

const SignIn: React.FC = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <SignInButton onClick={signInWithGoogle}>Sign in with Google</SignInButton>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

const SignOut: React.FC = () => {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

interface MessageInterface{
  id: string;
  text: string;
  uid: string;
  photoURL: string;
}

interface ChatMessageProps{
  message: MessageInterface;
}

const ChatMessage: React.FC<ChatMessageProps> = (props: ChatMessageProps) => {
  const { text, uid, photoURL } = props.message

  const sent = uid === auth.currentUser.uid

  return (<>
    <Message sent={sent}>
      {sent
        ? <>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <Sent>{text}</Sent>
          </>
        : <>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <Received>{text}</Received>
          </>}

    </Message>
  </>)
}

const ChatRoom: React.FC = () => {
  const dummy: React.Ref<HTMLSpanElement> = useRef()
  const messagesRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> = firestore.collection('messages')
  const query: firebase.firestore.Query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, { idField: 'id' })

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (<>
    <main>

      {messages && messages.map((msg: MessageInterface) => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}

const Home: React.FC = () => {
  const [user] = useAuthState(auth)

  return (
    <App>
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </App>
  )
}

export default Home
