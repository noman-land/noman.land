import styled from 'styled-components';
import { Body, Button, Container } from './components';
import { useWebAuthn } from './webAuthnHooks';

const Welcome = styled.div`
  margin-top: 2rem;
`;

const App = () => {
  const { authed, userId, register, logIn, logOut, deleteAccount } =
    useWebAuthn();

  return (
    <Container>
      <Body>
        <div>
          <Button disabled={!!userId} onClick={register}>
            Register
          </Button>
          <Button disabled={!userId || authed} onClick={logIn}>
            Log In
          </Button>
          <Button disabled={!authed} onClick={logOut}>
            Log Out
          </Button>
          <Button disabled={!authed || !userId} onClick={deleteAccount}>
            Delete Account
          </Button>
        </div>
        {!!userId && authed && <Welcome>Hello {userId}</Welcome>}
      </Body>
    </Container>
  );
};

export default App;
