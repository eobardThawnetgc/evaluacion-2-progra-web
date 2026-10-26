import { Navigate, Route, Routes } from 'react-router-dom';

import MenuPage from '../pages/menu';
import GuessNumber from '../pages/guessNumber/GuessNumber';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/guessNumber" element={<GuessNumber />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    )
}

export default AppRouter;
