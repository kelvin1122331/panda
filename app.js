(() => {
  const pandaFace = (light = false) => `<svg viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M12.1 15.2C8.5 10.8 10.7 6.7 14.6 8.2c2 .8 3.5 2.3 4.5 4.2M31.9 15.2c3.6-4.4 1.4-8.5-2.5-7-2 .8-3.5 2.3-4.5 4.2" stroke="currentColor" stroke-width="3.3" stroke-linecap="round"/><path d="M22 10.8c-7.1 0-12.1 4.9-12.1 12.7 0 7.2 4.5 12.3 12.1 12.3s12.1-5.1 12.1-12.3c0-7.8-5-12.7-12.1-12.7Z" fill="currentColor"/><path d="M17.2 23.2c1.3-1.6 2.9-2.4 4.8-2.4s3.5.8 4.8 2.4c-1.3 3.3-2.9 4.9-4.8 4.9s-3.5-1.6-4.8-4.9Z" fill="${light ? '#fff' : '#c8f3df'}"/><circle cx="17" cy="20.2" r="1.45" fill="${light ? '#0d0e1d' : '#fff'}"/><circle cx="27" cy="20.2" r="1.45" fill="${light ? '#0d0e1d' : '#fff'}"/></svg>`;

  const root = document.getElementById('panda-widget-root');
  if (!root) return;
  root.innerHTML = `
    <div class="panda-widget widget-hidden" id="panda-widget" aria-label="Panda AI widget">
      <button class="panda-launcher" id="panda-launcher" type="button" aria-label="Buka Panda AI" aria-expanded="false">
        ${pandaFace()}
        <span class="launcher-status"></span>
        <span class="launcher-hint">Tanya Panda</span>
      </button>
      <section class="panda-panel widget-hidden" id="panda-panel" aria-label="Panda AI chat">
        <header class="widget-head">
          <div class="widget-avatar">${pandaFace()}</div>
          <div class="widget-head-copy"><strong>Panda AI</strong><span id="widget-status"><i class="online-dot"></i> Siap terhubung</span></div>
          <div class="widget-head-actions">
            <button class="widget-settings" id="widget-settings" type="button" aria-label="Atur koneksi">⚙</button>
            <button class="widget-minimize" id="widget-minimize" type="button" aria-label="Minimalkan">−</button>
            <button class="widget-close" id="widget-close" type="button" aria-label="Tutup">×</button>
          </div>
        </header>
        <div class="widget-screen setup-screen" id="setup-screen">
          <div class="setup-center">
            <div class="setup-illustration">${pandaFace()}</div>
            <h2>Hubungkan otaknya.</h2>
            <p class="setup-subtitle">Pilih model AI favoritmu. API key hanya digunakan di perangkat ini dan tidak disimpan oleh Panda.</p>
          </div>
          <form class="setup-form" id="setup-form">
            <div class="field">
              <label class="field-label" for="provider">Pilih provider AI</label>
              <div class="field-control select-wrap"><select id="provider" name="provider"><option value="demo">Mode demo — tanpa API key</option><option value="openai">OpenAI — ChatGPT</option><option value="gemini">Google — Gemini</option><option value="anthropic">Anthropic — Claude</option><option value="custom">Custom — OpenAI compatible</option></select></div>
            </div>
            <div class="field">
              <label class="field-label" for="model">Model</label>
              <div class="field-control select-wrap"><select id="model" name="model"></select></div>
            </div>
            <div class="field" id="api-key-field">
              <label class="field-label" for="api-key">API key</label>
              <div class="field-control key-control"><input id="api-key" name="apiKey" type="password" autocomplete="off" placeholder="Paste API key di sini" /><button type="button" class="show-key" id="show-key" aria-label="Tampilkan API key">⊙</button></div>
            </div>
            <div class="field custom-endpoint" id="custom-endpoint-field">
              <label class="field-label" for="endpoint">Endpoint URL</label>
              <div class="field-control"><input id="endpoint" name="endpoint" type="url" placeholder="https://api.example.com/v1/chat/completions" /></div>
            </div>
            <div class="form-note"><b>✦</b><span>Untuk produksi, gunakan server-side proxy agar API key tetap aman. Panda demo berjalan langsung di browser.</span></div>
            <button class="run-button" type="submit">Jalankan Panda <span>↗</span></button>
            <button class="demo-button" id="use-demo" type="button">Coba dulu dengan mode demo</button>
            <div class="setup-error" id="setup-error" role="alert"></div>
            <div class="powered-by">PANDA AI · YOUR MODEL, YOUR CONTROL</div>
          </form>
        </div>
        <div class="widget-screen settings-screen widget-hidden" id="settings-screen">
          <div class="settings-intro"><div class="settings-kicker"><span>⚙</span> PREFERENCES</div><h2>Atur Panda-mu.</h2><p>Sesuaikan tampilan Panda agar pas dengan alur kerja dan ruang di layarmu.</p></div>
          <div class="settings-list">
            <div class="setting-row setting-toggle-row"><span class="setting-icon">◉</span><span class="setting-copy"><strong>Sembunyikan Panda</strong><small>Launcher disembunyikan saat panel ditutup.</small></span><label class="switch"><input id="hide-launcher" type="checkbox" /><span></span></label></div>
            <div class="setting-row setting-range-row"><span class="setting-icon">◐</span><span class="setting-copy"><strong>Opacity tombol</strong><small>Atur seberapa transparan floating button.</small><div class="range-line"><input id="launcher-opacity" type="range" min="40" max="100" step="1" value="100" /><output id="opacity-value">100%</output></div></span></div>
            <div class="setting-row setting-range-row"><span class="setting-icon">↗</span><span class="setting-copy"><strong>Ukuran tombol</strong><small>Buat Panda lebih kecil atau lebih mudah ditekan.</small><div class="range-line"><input id="launcher-size" type="range" min="48" max="86" step="1" value="63" /><output id="size-value">63 px</output></div></span></div>
          </div>
          <div class="settings-tip"><span>✦</span><p>Pengaturan ini berlaku langsung di halaman ini dan tersimpan di browser-mu.</p></div>
          <div class="settings-actions"><button class="settings-back" id="settings-back" type="button">← Kembali ke chat</button><button class="settings-reset" id="settings-reset" type="button">Reset</button></div>
        </div>
        <div class="widget-screen chat-screen widget-hidden" id="chat-screen">
          <div class="message-list" id="message-list" aria-live="polite"></div>
          <div class="quick-prompts" id="quick-prompts"><button class="quick-prompt" type="button">Ringkas teks ini</button><button class="quick-prompt" type="button">Bantu brainstorm</button><button class="quick-prompt" type="button">Buat lebih profesional</button></div>
          <div class="composer-wrap"><form class="composer" id="chat-form"><textarea id="chat-input" rows="1" aria-label="Tulis pertanyaan" placeholder="Tanya apa saja..."></textarea><button class="send-button" id="send-button" type="submit" aria-label="Kirim pesan">↑</button></form><div class="composer-hint">Panda bisa membantu dengan banyak hal <span>Enter untuk kirim · Shift + Enter untuk baris baru</span></div></div>
        </div>
      </section>
    </div>`;

  const widget = document.getElementById('panda-widget');
  const launcher = document.getElementById('panda-launcher');
  const panel = document.getElementById('panda-panel');
  const setupScreen = document.getElementById('setup-screen');
  const chatScreen = document.getElementById('chat-screen');
  const settingsScreen = document.getElementById('settings-screen');
  const setupForm = document.getElementById('setup-form');
  const providerInput = document.getElementById('provider');
  const modelInput = document.getElementById('model');
  const apiKeyInput = document.getElementById('api-key');
  const endpointInput = document.getElementById('endpoint');
  const apiKeyField = document.getElementById('api-key-field');
  const endpointField = document.getElementById('custom-endpoint-field');
  const setupError = document.getElementById('setup-error');
  const messageList = document.getElementById('message-list');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-button');
  const widgetStatus = document.getElementById('widget-status');
  const toast = document.getElementById('toast');
  const settingsButton = document.getElementById('widget-settings');
  const hideLauncherInput = document.getElementById('hide-launcher');
  const opacityInput = document.getElementById('launcher-opacity');
  const opacityValue = document.getElementById('opacity-value');
  const sizeInput = document.getElementById('launcher-size');
  const sizeValue = document.getElementById('size-value');

  const models = {
    demo: [['panda-demo', 'Panda Demo Brain']],
    openai: [['gpt-4o-mini', 'GPT-4o mini'], ['gpt-4.1-mini', 'GPT-4.1 mini'], ['gpt-4o', 'GPT-4o']],
    gemini: [['gemini-2.0-flash', 'Gemini 2.0 Flash'], ['gemini-2.5-flash', 'Gemini 2.5 Flash'], ['gemini-2.5-pro', 'Gemini 2.5 Pro']],
    anthropic: [['claude-3-5-haiku-latest', 'Claude 3.5 Haiku'], ['claude-3-7-sonnet-latest', 'Claude 3.7 Sonnet']],
    custom: [['custom-model', 'Custom model']]
  };
  const providerNames = { demo: 'Demo mode', openai: 'OpenAI', gemini: 'Gemini', anthropic: 'Claude', custom: 'Custom API' };
  const defaultSettings = { hideOnClose: false, opacity: 100, size: 63 };
  let savedSettings = {};
  try { savedSettings = JSON.parse(localStorage.getItem('panda-settings') || '{}'); } catch { savedSettings = {}; }
  const state = { config: null, messages: [], loading: false, wasDragged: false, settings: { ...defaultSettings, ...savedSettings } };

  function saveSettings() {
    try { localStorage.setItem('panda-settings', JSON.stringify(state.settings)); } catch { /* Storage can be blocked in private previews. */ }
  }
  function applyRangeFill(input) {
    const min = Number(input.min); const max = Number(input.max); const value = Number(input.value);
    input.style.background = `linear-gradient(to right, var(--widget-purple) 0%, var(--widget-purple) ${((value - min) / (max - min)) * 100}%, #e4e3eb ${((value - min) / (max - min)) * 100}%, #e4e3eb 100%)`;
  }
  function applyLauncherSettings() {
    const settings = state.settings;
    launcher.style.opacity = String(Number(settings.opacity) / 100);
    launcher.style.setProperty('--launcher-size', `${Number(settings.size)}px`);
    const faceSize = Math.round(Number(settings.size) * .73);
    launcher.querySelector('svg').style.width = `${faceSize}px`;
    launcher.querySelector('svg').style.height = `${faceSize}px`;
    hideLauncherInput.checked = Boolean(settings.hideOnClose);
    opacityInput.value = settings.opacity;
    opacityValue.textContent = `${settings.opacity}%`;
    sizeInput.value = settings.size;
    sizeValue.textContent = `${settings.size} px`;
    applyRangeFill(opacityInput); applyRangeFill(sizeInput);
  }

  function populateModels(provider) {
    modelInput.innerHTML = (models[provider] || models.demo).map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
    const custom = provider === 'custom';
    apiKeyField.style.display = provider === 'demo' ? 'none' : 'block';
    endpointField.classList.toggle('visible', custom);
    apiKeyInput.required = provider !== 'demo';
    endpointInput.required = custom;
    apiKeyInput.placeholder = provider === 'openai' ? 'sk-...' : provider === 'gemini' ? 'AIza...' : provider === 'anthropic' ? 'sk-ant-...' : 'Paste API key di sini';
  }

  function showScreen(screen) {
    const chat = screen === 'chat';
    const settings = screen === 'settings';
    setupScreen.classList.toggle('widget-hidden', chat || settings);
    chatScreen.classList.toggle('widget-hidden', !chat);
    settingsScreen.classList.toggle('widget-hidden', !settings);
    settingsButton.style.display = chat || settings ? 'grid' : 'none';
    if (settings) widgetStatus.innerHTML = '<i class="online-dot"></i> Pengaturan Panda';
    else widgetStatus.innerHTML = chat ? `<i class="online-dot"></i> ${providerNames[state.config?.provider || 'demo']} · ${state.config?.model || 'ready'}` : '<i class="online-dot"></i> Siap terhubung';
  }

  function openPanel() {
    panel.classList.remove('widget-hidden');
    launcher.setAttribute('aria-expanded', 'true');
    showScreen(state.config ? 'chat' : 'setup');
    if (state.config) setTimeout(() => chatInput.focus(), 100);
  }
  function closePanel() {
    panel.classList.add('widget-hidden');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.style.display = state.settings.hideOnClose ? 'none' : 'grid';
  }
  function activatePanda(open = true) {
    widget.classList.remove('widget-hidden');
    launcher.style.display = 'grid';
    if (open) openPanel();
    else launcher.focus();
  }

  function updateSetupError(message = '') { setupError.textContent = message; }

  function formatTime() { return new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(new Date()); }
  function addMessage(role, text, isTyping = false) {
    const item = document.createElement('div');
    item.className = `message ${role}${isTyping ? ' typing-message' : ''}`;
    if (role === 'assistant') {
      item.innerHTML = `<div class="message-avatar">${pandaFace()}</div><div><div class="message-bubble${isTyping ? ' typing-bubble' : ''}">${isTyping ? '<i></i><i></i><i></i>' : ''}</div>${!isTyping ? `<div class="message-time">${formatTime()}</div>` : ''}</div>`;
      if (!isTyping) item.querySelector('.message-bubble').textContent = text;
    } else {
      item.innerHTML = `<div><div class="message-bubble"></div><div class="message-time">${formatTime()}</div></div>`;
      item.querySelector('.message-bubble').textContent = text;
    }
    messageList.appendChild(item);
    messageList.scrollTop = messageList.scrollHeight;
    return item;
  }
  function renderConversation() {
    messageList.innerHTML = '';
    state.messages.forEach(({ role, content }) => addMessage(role, content));
    messageList.scrollTop = messageList.scrollHeight;
  }

  function welcomeMessage(provider) {
    if (provider === 'demo') return 'Halo! Aku Panda 👋\n\nAku sedang berjalan dalam mode demo. Coba tanyakan apa saja untuk melihat cara kerjaku.';
    return `Halo! Aku Panda 👋\n\nAku sudah terhubung ke ${providerNames[provider]}. Ada yang bisa kubantu hari ini?`;
  }

  async function runPanda(config) {
    state.config = config;
    state.messages = [{ role: 'assistant', content: welcomeMessage(config.provider) }];
    renderConversation();
    showScreen('chat');
    setTimeout(() => chatInput.focus(), 150);
  }

  function demoAnswer(text) {
    const lower = text.toLowerCase();
    if (lower.includes('ringkas') || lower.includes('summary')) return 'Tentu. Kirimkan teks yang ingin diringkas, lalu aku akan mengubahnya menjadi poin-poin inti yang lebih mudah dipahami.';
    if (lower.includes('brainstorm') || lower.includes('ide')) return 'Yuk brainstorm. Mulai dari tujuan akhirnya dulu, lalu kita pecah menjadi beberapa opsi yang paling mungkin dijalankan. Apa yang sedang kamu bangun?';
    if (lower.includes('profesional') || lower.includes('formal')) return 'Bisa. Kirimkan copy-nya dan aku akan merapikan struktur, pilihan kata, serta nadanya agar lebih profesional tanpa terdengar kaku.';
    if (lower.includes('halo') || lower.includes('hai')) return 'Halo juga! Aku siap membantu riset, menulis, merangkum, menerjemahkan, atau memikirkan ide bersamamu.';
    return `Aku menangkap pertanyaanmu: “${text}”\n\nDalam mode demo, aku bisa menunjukkan alur percakapannya. Hubungkan API Gemini, ChatGPT, atau Claude untuk mendapatkan jawaban AI penuh yang sesuai konteksmu.`;
  }

  async function askProvider(userText) {
    const config = state.config;
    if (!config || config.provider === 'demo') {
      await new Promise(resolve => setTimeout(resolve, 650));
      return demoAnswer(userText);
    }
    const history = state.messages.map(message => ({ role: message.role, content: message.content }));
    if (config.provider === 'openai' || config.provider === 'custom') {
      const url = config.provider === 'custom' ? config.endpoint : 'https://api.openai.com/v1/chat/completions';
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` }, body: JSON.stringify({ model: config.model, messages: [{ role: 'system', content: 'You are Panda, a concise, helpful AI assistant. Answer in the same language as the user.' }, ...history], temperature: 0.7 }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || 'API request failed');
      return data?.choices?.[0]?.message?.content || 'Tidak ada jawaban dari model.';
    }
    if (config.provider === 'gemini') {
      const contents = history.map(item => ({ role: item.role === 'assistant' ? 'model' : 'user', parts: [{ text: item.content }] }));
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ systemInstruction: { parts: [{ text: 'You are Panda, a concise, helpful AI assistant. Answer in the same language as the user.' }] }, contents, generationConfig: { temperature: 0.7 } }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || 'Gemini request failed');
      return data?.candidates?.[0]?.content?.parts?.map(part => part.text).join('') || 'Tidak ada jawaban dari model.';
    }
    if (config.provider === 'anthropic') {
      const response = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-api-key': config.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' }, body: JSON.stringify({ model: config.model, max_tokens: 1000, system: 'You are Panda, a concise, helpful AI assistant. Answer in the same language as the user.', messages: history.map(item => ({ role: item.role, content: item.content })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || 'Claude request failed');
      return data?.content?.map(part => part.text || '').join('') || 'Tidak ada jawaban dari model.';
    }
    throw new Error('Provider belum didukung.');
  }

  async function sendMessage(value) {
    const text = value.trim();
    if (!text || state.loading || !state.config) return;
    state.loading = true;
    sendButton.disabled = true;
    chatInput.value = '';
    chatInput.style.height = 'auto';
    state.messages.push({ role: 'user', content: text });
    addMessage('user', text);
    const typing = addMessage('assistant', '', true);
    try {
      const answer = await askProvider(text);
      typing.remove();
      state.messages.push({ role: 'assistant', content: answer });
      addMessage('assistant', answer);
    } catch (error) {
      typing.remove();
      const friendly = error.message.includes('Failed to fetch') ? 'Koneksi atau CORS bermasalah. Untuk produksi, arahkan request melalui server-side proxy.' : `Belum berhasil terhubung: ${error.message}`;
      state.messages.push({ role: 'assistant', content: friendly });
      addMessage('assistant', friendly);
    } finally {
      state.loading = false;
      sendButton.disabled = false;
      chatInput.focus();
    }
  }

  providerInput.addEventListener('change', () => { populateModels(providerInput.value); updateSetupError(); });
  document.getElementById('show-key').addEventListener('click', () => {
    const isPassword = apiKeyInput.type === 'password';
    apiKeyInput.type = isPassword ? 'text' : 'password';
    document.getElementById('show-key').textContent = isPassword ? '◉' : '⊙';
  });
  setupForm.addEventListener('submit', event => {
    event.preventDefault();
    const provider = providerInput.value;
    const apiKey = apiKeyInput.value.trim();
    const endpoint = endpointInput.value.trim();
    if (provider !== 'demo' && apiKey.length < 5) { updateSetupError('Masukkan API key yang valid untuk melanjutkan.'); apiKeyInput.focus(); return; }
    if (provider === 'custom' && !endpoint) { updateSetupError('Masukkan endpoint URL untuk custom provider.'); endpointInput.focus(); return; }
    updateSetupError();
    runPanda({ provider, model: modelInput.value, apiKey, endpoint });
  });
  document.getElementById('use-demo').addEventListener('click', () => { providerInput.value = 'demo'; populateModels('demo'); updateSetupError(); runPanda({ provider: 'demo', model: 'panda-demo', apiKey: '', endpoint: '' }); });
  settingsButton.addEventListener('click', () => { openPanel(); showScreen('settings'); });
  document.getElementById('settings-back').addEventListener('click', () => { showScreen(state.config ? 'chat' : 'setup'); });
  hideLauncherInput.addEventListener('change', () => { state.settings.hideOnClose = hideLauncherInput.checked; saveSettings(); });
  opacityInput.addEventListener('input', () => { state.settings.opacity = Number(opacityInput.value); opacityValue.textContent = `${state.settings.opacity}%`; applyRangeFill(opacityInput); applyLauncherSettings(); saveSettings(); });
  sizeInput.addEventListener('input', () => { state.settings.size = Number(sizeInput.value); sizeValue.textContent = `${state.settings.size} px`; applyRangeFill(sizeInput); applyLauncherSettings(); saveSettings(); });
  document.getElementById('settings-reset').addEventListener('click', () => { state.settings = { ...defaultSettings }; applyLauncherSettings(); saveSettings(); });
  document.getElementById('widget-minimize').addEventListener('click', closePanel);
  document.getElementById('widget-close').addEventListener('click', closePanel);
  launcher.addEventListener('click', () => { if (!state.wasDragged) { if (panel.classList.contains('widget-hidden')) openPanel(); else closePanel(); } state.wasDragged = false; });
  chatForm.addEventListener('submit', event => { event.preventDefault(); sendMessage(chatInput.value); });
  chatInput.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(chatInput.value); } });
  chatInput.addEventListener('input', () => { chatInput.style.height = 'auto'; chatInput.style.height = `${Math.min(chatInput.scrollHeight, 88)}px`; });
  document.querySelectorAll('.quick-prompt').forEach(button => button.addEventListener('click', () => { chatInput.value = button.textContent; chatInput.focus(); }));

  // The launcher is intentionally draggable: it can be placed over any part of a site.
  let drag = null;
  launcher.addEventListener('pointerdown', event => {
    drag = { startX: event.clientX, startY: event.clientY, moved: false, left: widget.getBoundingClientRect().left, top: widget.getBoundingClientRect().top };
    launcher.setPointerCapture(event.pointerId);
  });
  launcher.addEventListener('pointermove', event => {
    if (!drag) return;
    const dx = event.clientX - drag.startX; const dy = event.clientY - drag.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) drag.moved = true;
    if (!drag.moved) return;
    const width = launcher.offsetWidth; const height = launcher.offsetHeight;
    const left = Math.max(8, Math.min(window.innerWidth - width - 8, drag.left + dx));
    const top = Math.max(8, Math.min(window.innerHeight - height - 8, drag.top + dy));
    widget.style.left = `${left}px`; widget.style.top = `${top}px`; widget.style.right = 'auto'; widget.style.bottom = 'auto';
    state.wasDragged = true;
  });
  launcher.addEventListener('pointerup', () => { drag = null; });
  launcher.addEventListener('pointercancel', () => { drag = null; });

  // All landing-page Play Panda buttons activate the same widget.
  document.querySelectorAll('.js-play').forEach(button => button.addEventListener('click', () => activatePanda(true)));
  document.getElementById('copy-code').addEventListener('click', async () => {
    const snippet = '<script src="/widget.js" data-position="bottom-right" data-theme="light"></script>';
    try { await navigator.clipboard.writeText(snippet); } catch { /* Clipboard can be blocked in a file preview. */ }
    document.getElementById('copy-code').innerHTML = 'Copied <span>✓</span>';
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); document.getElementById('copy-code').innerHTML = 'Copy code <span>⧉</span>'; }, 1800);
  });

  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.addEventListener('click', () => {
    document.querySelector('.main-nav').classList.toggle('mobile-open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.main-nav').classList.remove('mobile-open')));

  populateModels('demo');
  applyLauncherSettings();
})();
