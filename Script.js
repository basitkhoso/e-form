/* ---------- Progress Bar ---------- */
const form = document.querySelector('main');
const sections = document.querySelectorAll('section');
const progressBar = document.getElementById('progressBar');

function updateProgress(){  
  let filled = 0;
  sections.forEach(sec=>{
    const inputs = sec.querySelectorAll('input,textarea,select');
    inputs.forEach(inp=>{
      if((inp.type==='range' && inp.value!=='') || (inp.type!=='range' && inp.value.trim()!==''))
        filled++;
    });
  });
  const totalInputs = form.querySelectorAll('input,textarea,select').length;
  progressBar.style.width = `${(filled/totalInputs)*100}%`;
}
form.addEventListener('input',updateProgress);

/* ---------- Submit Button ---------- */
const toast = document.getElementById('toast');
document.getElementById('submitBtn').onclick = ()=>{
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),3000);
  form.reset(); progressBar.style.width='0';
};

/* ---------- Dark Mode Toggle ---------- */
const toggle = document.getElementById('darkToggle');
toggle.onclick = ()=>{
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme', dark ? 'light':'dark');
  toggle.classList.toggle('active',!dark);
};

/* ---------- Print Button ---------- */
document.getElementById('printBtn').onclick = ()=>window.print();

/* ---------- Reveal Animations ---------- */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.style.animationPlayState='running';
  });
},{threshold:.1});
sections.forEach(sec=>observer.observe(sec));
