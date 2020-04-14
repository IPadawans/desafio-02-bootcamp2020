import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      return setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo repositorio cadastrado: ${Date.now()}`,
      url: "www.novorepositorio.com",
      techs: ["Node", "ReactJS", "React Native"],
    });

    const repository = response.data;

    setRepositories([...respositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = respositories.findIndex(
      (repository) => repository.id === id
    );

    respositories.splice(repositoryIndex, 1);
    setRepositories([...respositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
