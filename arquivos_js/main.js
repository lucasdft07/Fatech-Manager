// ===== VALIDAÇÃO + SUBMIT =====
(() => {
  'use strict';

  const form = document.getElementById('formCadastro');

  form.addEventListener('submit', (event) => {
    const email = document.getElementById('email');
    const cpf = document.getElementById('CPF');

    let valido = true;

    // EMAIL
    if (!validarEmail(email.value)) {
      email.classList.add('is-invalid');
      valido = false;
    } else {
      email.classList.remove('is-invalid');
    }

    // CPF
    if (!validarCPF(cpf.value)) {
      cpf.classList.add('is-invalid');
      valido = false;
    } else {
      cpf.classList.remove('is-invalid');
    }

    if (!form.checkValidity() || !valido) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const cliente = {
        nome: document.getElementById('nome').value,
        email: email.value,
        cpf: cpf.value,
        telefone: document.getElementById('telefone').value,
        setor: document.getElementById('setor').value,
        observacoes: document.getElementById('observacoes').value
      };

      const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
      clientes.push(cliente);
      localStorage.setItem('clientes', JSON.stringify(clientes));

      const modal = new bootstrap.Modal(document.getElementById('modalSucesso'));
      modal.show();

      form.reset();
      form.classList.remove('was-validated');
    }

    form.classList.add('was-validated');
  });

})();

// ===== MÁSCARA TELEFONE =====
const campoTelefone = document.getElementById('telefone');
campoTelefone.addEventListener('input', (e) => {
  let valor = e.target.value.replace(/\D/g, '');

  if (valor.length > 10) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  }

  e.target.value = valor;
});

// ===== MÁSCARA CPF =====
const campoCPF = document.getElementById('CPF');
campoCPF.addEventListener('input', (e) => {
  let valor = e.target.value.replace(/\D/g, '');

  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  e.target.value = valor;
});
