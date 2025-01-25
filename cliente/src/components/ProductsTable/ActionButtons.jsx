import { FaCloudUploadAlt, FaPlus, FaTrash } from 'react-icons/fa';

export const ActionButtons = ({ handleFileUpload, handleOpenModal, handleMassiveDeleteProducts, fileInputRef, selected }) => {
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

            {selected.length >= 1 && (
                <button onClick={handleMassiveDeleteProducts} className="masive-delete">
                    <FaTrash style={{ marginRight: '10px' }} /> Eliminar productos
                </button>
            )}
        </div>
    )
};

