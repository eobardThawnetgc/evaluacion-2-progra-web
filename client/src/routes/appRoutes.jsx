import { Navigate, Route, Routes } from 'react-router-dom';

import MenuPage from '../pages/menu';
import GuessNumber from '../pages/guessNumber/GuessNumber';
import MenuRestaurante from '../pages/foodDei/MenuRestaurante';
import BandejaReserva from '../pages/foodDei/components/BandejaReserva';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MenuPage />} />
            
            <Route path="/guessNumber" element={<GuessNumber />} />
            
            <Route path="/food-dei" element={<MenuRestaurante />} />
            
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/food-dei/reserva" element={<BandejaReserva />} />
        </Routes>
    )
}

export default AppRouter;