import { useReservaStore } from '../../../store/reservaStore.js';

const NavBar = () => {
    const {
        reserva,
    } = useReservaStore();

    return (
        <div className="d-flex justify-content-around bg-light p-3 rounded mb-4 border shadow-sm">
            <span className="fs-5"><strong>Saldo disponible:</strong> ${reserva.saldo?.toFixed(2) || "0.00"}</span>
            <span className="fs-5"><strong>Total a gastar:</strong> ${reserva.total?.toFixed(2) || "0.00"}</span>
        </div>
    )
}

export default NavBar;