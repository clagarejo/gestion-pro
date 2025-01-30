import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCloudUploadAlt, FaPlus } from 'react-icons/fa';

export const ActionButtons = ({ handleFileUpload, handleOpenModal, fileInputRef }) => {
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
        </div>
    );
};

ActionButtons.propTypes = {
    handleFileUpload: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    fileInputRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }).isRequired
};
