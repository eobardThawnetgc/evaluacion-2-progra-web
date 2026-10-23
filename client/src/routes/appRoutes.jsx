import { Navigate, Route, Routes } from 'react-router-dom';
import GuessNumber from '../pages/guessNumber/GuessNumber';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/guessNumber" element={<GuessNumber />} />
            <Route path="/home" element={<></>} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    )
}

export default AppRouter;
