import { Navigate, Route, Routes } from 'react-router-dom';

import MenuPage from '../pages/menu';
import GuessNumber from '../pages/guessNumber/GuessNumber';
// Importa tu nuevo archivo aquí (ajusta la ruta según la carpeta que creaste)
import MenuRestaurante from '../pages/foodDei/MenuRestaurante';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/guessNumber" element={<GuessNumber />} />
            
            {/* Agrega la ruta de tu componente */}
            <Route path="/food-dei" element={<MenuRestaurante />} />
            
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    )
}

export default AppRouter;