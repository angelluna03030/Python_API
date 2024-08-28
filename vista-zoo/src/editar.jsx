import React, { useState, useEffect } from 'react';

export const EditAnimal = ({ animalId }) => {
  const [animal, setAnimal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/animal/${animalId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del animal');
        }
        const data = await response.json();
        setAnimal(data);
      } catch (error) {
        setErrorMessage('Error al obtener los datos del animal: ' + error.message);
      }
    };
    fetchAnimal();
  }, [animalId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!animal.animal || !animal.patas || !animal.categoria) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    if (isNaN(animal.patas) || animal.patas < 0) {
      setErrorMessage('El número de patas debe ser un número entero positivo.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/animal/${animalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animal),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el animal');
      }

      setSuccessMessage('¡Animal actualizado exitosamente!');
    } catch (error) {
      setErrorMessage('Error al actualizar el animal: ' + error.message);
    }
  };

  return (
    <div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {animal && (
        <>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editAnimalModal">
            Editar Animal
          </button>

          <div className="modal fade" id="editAnimalModal" tabIndex="-1" aria-labelledby="editAnimalModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editAnimalModalLabel">Editar Animal</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="animalName" className="form-label">Nombre del Animal</label>
                      <input
                        type="text"
                        className="form-control"
                        id="animalName"
                        value={animal.animal}
                        onChange={(e) => setAnimal({ ...animal, animal: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="animalPatas" className="form-label">Número de Patas</label>
                      <input
                        type="number"
                        className="form-control"
                        id="animalPatas"
                        value={animal.patas}
                        onChange={(e) => setAnimal({ ...animal, patas: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="animalCategoria" className="form-label">Categoría</label>
                      <input
                        type="text"
                        className="form-control"
                        id="animalCategoria"
                        value={animal.categoria}
                        onChange={(e) => setAnimal({ ...animal, categoria: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
