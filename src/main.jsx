// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { JournalProvider } from "./components/common/journalContext.jsx";


//common 


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <JournalProvider>
      <App />
    </JournalProvider>
  </StrictMode>
)
