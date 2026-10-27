
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Toast,
    ToastHeader,
    ToastBody,
} from "reactstrap";
import { useToastStore } from "../store/useToast";

const configuracion = {
    success: {
        titulo: "¡Todo salió bien!",
        fondo: "#d1e7dd",
    },
    error: {
        titulo: "Ha ocurrido un error",
        fondo: "#f8d7da",
    },
    warning: {
        titulo: "Atención",
        fondo: "#fff3cd",
    },
    info: {
        titulo: "Información",
        fondo: "#cff4fc",
    },
};

function ToastContainer() {
    const toast = useToastStore((state) => state.toast);
    const hideToast = useToastStore((state) => state.hideToast);

    useEffect(() => {
        if (!toast) return;

        const duracion = toast.duracion ?? 3000;

        const temporizador = setTimeout(() => {
            hideToast();
        }, duracion);

        return () => clearTimeout(temporizador);
    }, [toast, hideToast]);

    return (
        <div
            className="toast-container-custom"
            aria-live="polite"
            aria-atomic="true"
        >
            <AnimatePresence mode="wait">
                {toast && (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >
                        {(() => {
                            const config =
                                configuracion[toast.tipo] || configuracion.info;

                            return (
                                <Toast className="app-toast">
                                    <ToastHeader
                                        close={
                                            <button
                                                type="button"
                                                className="btn-close"
                                                aria-label="Cerrar notificación"
                                                onClick={hideToast}
                                            />
                                        }
                                    >
                                        <span className="toast-title">
                                            {config.titulo}
                                        </span>
                                    </ToastHeader>

                                    <ToastBody
                                        style={{
                                            backgroundColor: config.fondo,
                                            color: "#212529",
                                        }}
                                    >
                                        {toast.mensaje}
                                    </ToastBody>
                                    <div
                                        className="toast-progress"
                                        style={{
                                            backgroundColor: config.color,
                                            animationDuration: `${toast.duracion ?? 3000}ms`,
                                        }}
                                    />
                                </Toast>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ToastContainer;
