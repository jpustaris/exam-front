const sideMenu = document.querySelector('aside');
const Menubtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkmode = document.querySelector('.dark-mode');

Menubtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
   sideMenu.style.display = 'none';
});

darkmode.addEventListener('click', () =>{
     document.body.classList.toggle('dark-mode-variables');
     darkmode.querySelector('span:nth-child(1)').classList.toggle('active');
     darkmode.querySelector('span:nth-child(2)').classList.toggle('active');
});


activities.forEach(activity => {
    const tr = document.createElement('tr');
    const trContent = `
      <td>${activity.productname}</td>
      <td>${activity.productnumber}</td>
      <td>${activity.actstatus}</td>
      <td class="${activity.status === 'declined' ? 'danger'
        : activity.status === 'Pending' ? 'warning' : 'primary'}">${activity.status}</td>
    <td class="primary">Details</td>
     
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});


