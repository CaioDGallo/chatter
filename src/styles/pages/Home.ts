import styled from 'styled-components'

export const App = styled.div`

text-align: center;
  max-width: 728px;
  margin: 0 auto;

header {
  background-color: #181717;
  height: 10vh;
  min-height: 50px;
  color: white;
  position: fixed;
  width: 100%;
  max-width: 728px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  padding: 10px;
  box-sizing: border-box;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: rgb(40, 37, 53);
}

main {
  padding: 10px;
  height: 80vh;
  margin: 10vh 0 10vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

main::-webkit-scrollbar {
  width: 0.25rem;
}

main::-webkit-scrollbar-track {
  background: #1e1e24;
}

main::-webkit-scrollbar-thumb {
  background: #6649b8;
}

form {
  height: 10vh;
  position: fixed;
  bottom: 0;
  background-color: rgb(24, 23, 23);
  width: 100%;
  max-width: 728px;
  display: flex;
  font-size: 1.5rem;
}

form button {
  width: 20%;
  background-color: rgb(56, 56, 143);
}


input {
  line-height: 1.5;
  width: 100%;
  font-size: 1.5rem;
  background: rgb(58, 58, 58);
  color: white;
  outline: none;
  border: none;
  padding: 0 10px;
}

button {
  background-color: #282c34; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  font-size: 1.25rem;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


ul, li {
  text-align: left;
  list-style: none;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px 5px;
}
`

export const SignInButton = styled.button`
  color: #282c34;
  background: white;
  max-width: 400px;
  margin: 0 auto;
`

interface MessageProps{
  readonly sent: boolean;
}

export const Message = styled.div<MessageProps>`
  display: flex;
  align-items: center;

  flex-direction: ${props => (props.sent ? 'row-reverse' : 'row')};

  p {
  max-width: 500px;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  text-align: center;
}
`

export const Sent = styled.p`
  color: white;
  background: #0b93f6;
  align-self: flex-end;
`

export const Received = styled.p`
  background: #e5e5ea;
  color: black;
`
