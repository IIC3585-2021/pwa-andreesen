const posts = document.querySelector(".posts");
const side_menu = document.getElementById('side-menu')



const not_logged_menu = `
    <li><a class="subheader">TwitterAndreesen PWA</a></li>
    <li><a href="/" class="waves-effect">
      <i class="material-icons">home</i>Home</a>
    </li>
    <li><a href="/pages/about.html" class="waves-effect">
      <i class="material-icons">account_circle</i>Login</a>
    </li>
    <li><div class="divider"></div></li>
    <li><a href="/pages/contact.html" class="waves-effect">
      <i class="material-icons">app_registration</i>Register</a>
    </li>
  `

const logged_menu = `
<li><a class="subheader">TwitterAndreesen PWA</a></li>
<li><a href="/" class="waves-effect">
  <i class="material-icons">home</i>Home</a>
</li>
<li><a href="/pages/about.html" class="waves-effect">
  <i class="material-icons">account_circle</i>My Profile</a>
</li>
<li><div class="divider"></div></li>
<li><a class="waves-effect" id="logout-btn">
  <i class="material-icons">logout</i>logout</a>
</li>
`

document.addEventListener('DOMContentLoaded', async function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});

  var user = await localStorage.getItem('user')
  if (user) {
    side_menu.innerHTML += logged_menu
    const logout_btn = document.getElementById('logout-btn')
    logout_btn.addEventListener('click', () => {
      localStorage.clear()
      side_menu.innerHTML = not_logged_menu
    })
  } else {
    side_menu.innerHTML += not_logged_menu
  }
  
});

// Render Post data
const renderPost = (data, id) => {
  const html = `
  <div class="card-panel posts white row" data-id="${id}">
      <img src="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg" alt="recipe thumb">
      <div class="posts-details">
        <div class="posts-title">${data.user}</div>
        <div class="posts-ingredients">${data.caption}</div>
      </div>
      
    </div>
  `;
  posts.innerHTML += html
} 




