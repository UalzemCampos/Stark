/**
 * Formulário Stark Health
 * Envio de leads via EmailJS + armazenamento localStorage
 *
 * INSTRUÇÕES DE SETUP:
 *
 * 1. Crie uma conta gratuita em https://www.emailjs.com/
 * 2. Crie um serviço de e-mail (conecte Gmail, Outlook, etc.)
 * 3. Crie um template de e-mail com as variáveis:
 *    - {{nome}}, {{empresa}}, {{cargo}}, {{email}}, {{celular}}, {{horario}}, {{vidas}}
 * 4. Copie seu Public Key, Service ID e Template ID
 * 5. Substitua os valores abaixo (YOUR_EMAILJS_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID)
 * 6. No formulario.html, substitua 'YOUR_EMAILJS_PUBLIC_KEY' no emailjs.init()
 */

// Configuração do EmailJS
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // Substituir pela chave pública
  serviceID: 'YOUR_SERVICE_ID',         // Substituir pelo Service ID
  templateID: 'YOUR_TEMPLATE_ID',       // Substituir pelo Template ID
};

// E-mail de destino (testes → mezlau@yahoo.com.br | produção → raphael.ramos@starkhealth.com.br)
const EMAIL_DESTINO = 'mezlau@yahoo.com.br';

// Assunto do e-mail
const EMAIL_ASSUNTO = 'Novo Lead - Landing Page Stark Health';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formError = document.getElementById('formError');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validar CAPTCHA Turnstile
    const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]');
    if (!turnstileResponse || !turnstileResponse.value) {
      showError('Por favor, complete a verificação de segurança (CAPTCHA).');
      return;
    }

    // Coletar dados
    const formData = {
      nome: document.getElementById('nome').value.trim(),
      empresa: document.getElementById('empresa').value.trim(),
      cargo: document.getElementById('cargo').value.trim(),
      email: document.getElementById('email').value.trim(),
      celular: document.getElementById('celular').value.trim(),
      horario: document.getElementById('horario').value,
      vidas: document.getElementById('vidas').value,
      origem: 'Landing Page Stark Health',
      destino: EMAIL_DESTINO,
      assunto: EMAIL_ASSUNTO,
    };

    // Validar campos obrigatórios
    for (const [key, value] of Object.entries(formData)) {
      if (['origem', 'destino', 'assunto'].includes(key)) continue;
      if (!value) {
        showError('Preencha todos os campos obrigatórios.');
        return;
      }
    }

    // Desabilitar botão e mostrar loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    formError.style.display = 'none';

    try {
      // Enviar e-mail via EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.templateID,
        {
          to_email: formData.destino,
          from_name: formData.nome,
          from_email: formData.email,
          subject: formData.assunto,
          nome: formData.nome,
          empresa: formData.empresa,
          cargo: formData.cargo,
          email: formData.email,
          celular: formData.celular,
          horario: formData.horario,
          vidas: formData.vidas,
          origem: formData.origem,
          message: `Nome: ${formData.nome}\nEmpresa: ${formData.empresa}\nCargo: ${formData.cargo}\nE-mail: ${formData.email}\nCelular: ${formData.celular}\nMelhor horário para contato: ${formData.horario}\nNúmero de vidas: ${formData.vidas}\nOrigem: ${formData.origem}`
        }
      );

      // Salvar no localStorage para acompanhamento
      salvarLead(formData);

      // Redirecionar para página de obrigado
      window.location.href = 'obrigado.html';

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      showError('Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Quero falar com um especialista';
    }
  });

  function showError(message) {
    formError.textContent = message;
    formError.style.display = 'block';
  }

  /**
   * Salva o lead no localStorage como fallback de armazenamento.
   * Os leads ficam salvos no navegador para consulta posterior.
   */
  function salvarLead(data) {
    try {
      const leads = JSON.parse(localStorage.getItem('stark_leads') || '[]');
      leads.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
      });
      localStorage.setItem('stark_leads', JSON.stringify(leads));
    } catch (e) {
      console.warn('Não foi possível salvar no localStorage:', e);
    }
  }
});
