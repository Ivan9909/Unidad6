function validateForm() {
  const patientName = document.getElementById('patient-name').value;
  const patientLastname = document.getElementById('patient-lastname').value;
  const patientCedula = document.getElementById('patient-cedula').value;
  const patientAge = document.getElementById('patient-age').value;
  const patientPhone = document.getElementById('patient-phone').value;
  const patientSpecialty = document.getElementById('patient-specialty').value;

  const nameRegex = /^[A-Za-z\s]+$/;
  const cedulaRegex = /^[0-9]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!nameRegex.test(patientName)) {
    alert('Ingrese un nombre válido para el paciente.');
    return false;
  }

  if (!nameRegex.test(patientLastname)) {
    alert('Ingrese un apellido válido para el paciente.');
    return false;
  }

  if (!cedulaRegex.test(patientCedula)) {
    alert('Ingrese un número de cédula válido para el paciente (10 dígitos).');
    return false;
  }

  if (isNaN(patientAge) || patientAge <= 0) {
    alert('Ingrese una edad válida para el paciente.');
    return false;
  }

  if (!phoneRegex.test(patientPhone)) {
    alert('Ingrese un número de teléfono válido para el paciente (10 dígitos).');
    return false;
  }

  if (patientSpecialty === '') {
    alert('Seleccione una especialidad requerida para el paciente.');
    return false;
  }

  return true;
}

document.getElementById('patient-form').addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm()) {
    const patient = {
      name: document.getElementById('patient-name').value,
      lastname: document.getElementById('patient-lastname').value,
      cedula: document.getElementById('patient-cedula').value,
      age: document.getElementById('patient-age').value,
      phone: document.getElementById('patient-phone').value,
      specialty: document.getElementById('patient-specialty').value
    };

    saveData(patient, 'patients');
    alert('Paciente guardado correctamente.');
    this.reset();
  }
});

function saveData(data, filename) {
  patients = []; 
  const file = "./patients.json"; 
  const reader = new FileReader();
  

  fetch(file)
  .then(resp => resp.json())
  .then(lista => {
    patients = lista;
    patients.push(data);
    console.log(patients);
    download(patients,filename);
  })
  .catch( e => {
    patients.push(data);
    console.log(patients);
    console.log(e);
    download(patients,filename);
  });
}

function download(data, filename) {
  const jsonData = JSON.stringify(data);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}