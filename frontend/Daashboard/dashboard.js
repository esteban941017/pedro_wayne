document.addEventListener('DOMContentLoaded', function () {
  const role = localStorage.getItem('role');
  if (!role) {
    window.location.href = 'login.html';
    return;
  }

  if (role !== 'admin') {
    document.getElementById('resources').style.display = 'none';
  }

  // Add resource management functionality
  window.addResource = function () {
    const resourceList = document.getElementById('resourceList');
    const resource = document.createElement('div');
    resource.innerText = 'New Resource';
    resourceList.appendChild(resource);
  };
});

document.addEventListener('DOMContentLoaded', function () {
  const resourceForm = document.getElementById('resourceForm');
  const resourceList = document.getElementById('resourceList');

  resourceForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const resourceName = document.getElementById('resourceName').value;
    const resourceDescription = document.getElementById(
      'resourceDescription'
    ).value;

    addResource(resourceName, resourceDescription);
    resourceForm.reset();
  });

  function addResource(name, description) {
    const resource = {
      id: Date.now(),
      name,
      description,
    };

    // Guardar no localStorage
    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources.push(resource);
    localStorage.setItem('resources', JSON.stringify(resources));

    // Atualizar a lista de recursos
    renderResources();
  }

  function deleteResource(id) {
    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources = resources.filter((resource) => resource.id !== id);
    localStorage.setItem('resources', JSON.stringify(resources));

    renderResources();
  }

  function renderResources() {
    const resources = JSON.parse(localStorage.getItem('resources')) || [];
    resourceList.innerHTML = '';

    resources.forEach((resource) => {
      const resourceItem = document.createElement('div');
      resourceItem.className = 'resource-item';
      resourceItem.innerHTML = `
        <h3>${resource.name}</h3>
        <p>${resource.description}</p>
        <button onclick="deleteResource(${resource.id})">Delete</button>
      `;
      resourceList.appendChild(resourceItem);
    });
  }

  // Inicializar a lista de recursos
  renderResources();
});

// Expor a função deleteResource globalmente
window.deleteResource = function (id) {
  deleteResource(id);
};
