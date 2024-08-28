import React, { useState, useEffect } from 'react';
import { Create } from './crear';
import { EditAnimal } from './editar';


export const Tabla = () => {
  const [animals, setAnimals] = useState([]);
  const [animalToDelete, setAnimalToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/zoo')
      .then(response => response.json())
      .then(data => setAnimals(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/animal/${animalToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el animal');
      }

      setAnimals(animals.filter(animal => animal.id !== animalToDelete));
      setSuccessMessage('¡Animal eliminado exitosamente!');
      setShowDeleteModal(false);
    } catch (error) {
      setErrorMessage('Error al eliminar el animal: ' + error.message);
    }
  };

  return (
    <>
      <Create />
      <div className="container mt-5">
        <h2 className="mb-4">Zoo Animals</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Animal</th>
              <th>Patas</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(animal => (
              <tr key={animal.id}>
                <td>{animal.id}</td>
                <td>{animal.animal}</td>
                <td>{animal.patas}</td>
                <td>{animal.categoria}</td>
                <td>
                  <EditAnimal animalId={animal.id} />
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => {
                      setAnimalToDelete(animal.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este animal?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
