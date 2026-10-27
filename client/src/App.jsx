import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/appRoutes';
import "./index.css"
import ToastContainer from './utils/toast';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
