// 1. Dark / Light mode (disimpan di localStorage)
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
function setTheme(t){
  root.setAttribute('data-theme', t);
  if (toggle) toggle.textContent = t === 'dark' ? '☀️' : '🌙';
}
let saved = 'light';
try { saved = localStorage.getItem('tema') || 'light'; } catch (e) {}
setTheme(saved);
if (toggle) toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('tema', next); } catch (e) {}
});

// 2. Menu hamburger (layar HP)
const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
if (burger) burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// 3. Filter kategori destinasi
const filterBtns = document.querySelectorAll('.filters button');
const cards = document.querySelectorAll('.card[data-kategori]');
filterBtns.forEach(btn => btn.addEventListener('click', () => {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const k = btn.dataset.filter;
  cards.forEach(c => c.classList.toggle('hide', k !== 'semua' && c.dataset.kategori !== k));
}));

// 4. Validasi form kontak
const form = document.getElementById('form-kontak');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const nama = form.nama.value.trim();
  const email = form.email.value.trim();
  const pesan = form.pesan.value.trim();
  if (!nama) return alert('Nama tidak boleh kosong!');
  if (!/^\S+@\S+\.\S+$/.test(email)) return alert('Masukkan email yang valid, contoh: nama@email.com');
  if (pesan.length < 10) return alert('Pesan minimal 10 karakter.');
  document.getElementById('pesan-sukses').textContent = 'Terima kasih, ' + nama + '! Pesanmu sudah saya terima.';
  form.reset();
});