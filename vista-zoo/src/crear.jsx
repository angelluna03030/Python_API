import React, { useState } from 'react';

export const Create = () => {
    const [animalata, setAnimal] = useState('');
    const [patasdata, setPatas] = useState('');
    const [categoriadata, setCategoria] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();   
  
  
      // Validación básica
      if (!animalata || !patasdata || !categoriadata) {
        setErrorMessage('Por favor, completa todos los campos.');
        return;
      }
  
      if (isNaN(patasdata) || patasdata < 0) {
        setErrorMessage('El número de patas debe ser un número entero positivo.');
        return;
      }
  
      try {
        const response = await fetch('http://127.0.0.1:8000/animal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: "0",
            animal: animalata,
            patas: patasdata,
            categoria: categoriadata,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Error al crear el animal');
        }
  
        setSuccessMessage('¡Animal creado exitosamente!');
        setAnimal('');
        setPatas('');
        setCategoria('');
      } catch (error) {
        setErrorMessage('Error al crear el animal: ' + error.message);
      }
    };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Crear Animal
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="animal" className="form-label">
                    Animal
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="animal"
                    value={animalata}
                    onChange={(e) => setAnimal(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="patas" className="form-label">
                    Patas
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="patas"
                    value={patasdata}
                    onChange={(e) => setPatas(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">
                    Categoría
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoria"
                    value={categoriadata}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Crear Animal
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Open second modal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Modal 2
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Hide this modal and show the first with the button below.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back to first
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
    Crear Animal
      </button>
    </>
  );
};
