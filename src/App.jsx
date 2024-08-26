import styled from 'styled-components'
import { PersonasPage } from './page/PersonasPage';

function App() {

  return (
    <>
      
      <Div>
        <PersonasPage/>
        
      </Div>
    </>
  )
}

export default App

const Div=styled.div`
  margin-top: 0px;
  margin: 0;
`;