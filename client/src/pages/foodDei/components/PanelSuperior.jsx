import React from 'react';
import { Alert, Badge } from 'reactstrap';

const PanelSuperior = ({ reservaData, errorReserva }) => {

  const saldoActual = reservaData?.saldo ?? 25.00;
  const totalReserva = reservaData?.total ?? 0.00;

  return (
    <div className="mb-4">
      {errorReserva && (
        <Alert color="warning" className="mb-3">
          {errorReserva}
        </Alert>
      )}

      <Alert color="info" className="d-flex justify-content-between align-items-center shadow-sm">
        <div>
          <span className="fw-bold">Tu saldo actual: </span> 
          <span>${Number(saldoActual).toFixed(2)}</span>
        </div>
        <div>
          <span className="fw-bold">Total de tu Reserva: </span>
          <Badge color="dark" pill className="ms-2 px-3 py-2 fs-6">
            ${Number(totalReserva).toFixed(2)}
          </Badge>
        </div>
      </Alert>
    </div>
  );
};

export default PanelSuperior;