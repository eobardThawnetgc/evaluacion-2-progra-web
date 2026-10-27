import { Navigate, Route, Routes } from 'react-router-dom';

import MenuPage from '../pages/menu';
import GuessNumber from '../pages/guessNumber/GuessNumber';
import BandejaReserva from '../pages/foodDei/components/BandejaReserva';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MenuPage />} />
            
            <Route path="/guessNumber" element={<GuessNumber />} />
            <Route path="/food-dei" element={<BandejaReserva />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRouter;