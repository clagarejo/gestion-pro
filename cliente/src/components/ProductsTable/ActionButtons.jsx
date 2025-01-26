import { useEffect } from 'react';
import { FaCloudUploadAlt, FaPlus, FaTrash } from 'react-icons/fa';

export const ActionButtons = ({ handleFileUpload, handleOpenModal, handleMassiveDeleteProducts, fileInputRef, selected }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [fileInputRef]);

    return (
        <div className="action-buttons">
            <button onClick={() => fileInputRef.current.click()} className="massive-upload">
                <FaCloudUploadAlt /> Cargar productos
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />

            <button onClick={() => handleOpenModal()} className="add_product">
                <FaPlus style={{ marginRight: '10px' }} /> Crear producto
            </button>

            {selected.length >= 2 && (
                <button onClick={handleMassiveDeleteProducts} className="masive-delete">
                    <FaTrash style={{ marginRight: '10px' }} /> Eliminar productos
                </button>
            )}
        </div>
    );
};
