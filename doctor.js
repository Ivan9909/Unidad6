function validateForm() {
  const doctorName = document.getElementById('doctor-name').value;
  const doctorLastname = document.getElementById('doctor-lastname').value;
  const doctorCedula = document.getElementById('doctor-cedula').value;
  const doctorSpecialty = document.getElementById('doctor-specialty').value;
  const doctorConsultorio = document.getElementById('doctor-consultorio').value;
  const doctorEmail = document.getElementById('doctor-email').value;

  const nameRegex = /^[A-Za-z\s]+$/;
  const cedulaRegex = /^[0-9]+$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!nameRegex.test(doctorName)) {
    alert('Ingrese un nombre válido para el doctor.');
    return false;
  }

  if (!nameRegex.test(doctorLastname)) {
    alert('Ingrese un apellido válido para el doctor.');
    return false;
  }

  if (!cedulaRegex.test(doctorCedula)) {
    alert('Ingrese un número de cédula válido para el doctor (10 dígitos).');
    return false;
  }

  if (doctorSpecialty === '') {
    alert('Seleccione una especialidad para el doctor.');
    return false;
  }

  if (doctorConsultorio === '') {
    alert('Ingrese un consultorio válido para el doctor.');
    return false;
  }

  if (!emailRegex.test(doctorEmail)) {
    alert('Ingrese un correo de contacto válido para el doctor.');
    return false;
  }

  return true;
}

document.getElementById('doctor-form').addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm()) {
    const doctor = {
      name: document.getElementById('doctor-name').value,
      lastname: document.getElementById('doctor-lastname').value,
      cedula: document.getElementById('doctor-cedula').value,
      specialty: document.getElementById('doctor-specialty').value,
      consultorio: document.getElementById('doctor-consultorio').value,
      email: document.getElementById('doctor-email').value
    };

    saveData(doctor, 'doctors');
    console.log(doctor);
    alert('Doctor guardado correctamente.');
    this.reset();
  }
});

function saveData(data, filename) {
  doctors = []; 
  const file = "./doctors.json"; 
  const reader = new FileReader();
  

  fetch(file)
  .then(resp => resp.json())
  .then(lista => {
    doctors = lista;
    doctors.push(data);
    console.log(doctors);
    download(doctors,filename);
  })
  .catch( e => {
    doctors.push(data);
    console.log(doctors);
    console.log(e);
    download(doctors,filename);
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