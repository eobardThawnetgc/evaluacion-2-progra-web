import { useReservaStore } from '../../../store/reservaStore.js';

const NavBar = () => {
    const reserva = useReservaStore((state) => state.reserva);

    return (
        <div className="d-flex justify-content-around bg-light p-3 rounded mb-4 border shadow-sm">
            <span className="fs-5">
                <strong>Saldo disponible:</strong>{' '}
                ${(reserva.saldo ?? 0).toFixed(2)}
            </span>

            <span className="fs-5">
                <strong>Total a gastar:</strong>{' '}
                ${(reserva.total ?? 0).toFixed(2)}
            </span>
        </div>
    );
};

export default NavBar;