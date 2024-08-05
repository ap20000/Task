$(document).ready(function() {
  // Registration form submission
  $('#registerForm').on('submit', function(event) {
    event.preventDefault();
    const fullName = $('#fullName').val();
    const email = $('#email').val();
    const password = $('#password').val();

    console.log('Registering user:', { fullName, email, password }); // Debug log

    axios.post('http://localhost:3000/register', { fullName, email, password })
      .then(response => {
        console.log('Registration response:', response.data); // Debug log
        $('#registerSection').removeClass('active');
        $('#loginSection').addClass('active');
      })
      .catch(error => {
        console.error('Error during registration:', error);
      });
  });

  // Login form submission
  $('#loginForm').on('submit', function(event) {
    event.preventDefault();
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();

    console.log('Logging in user:', { email, password }); // Debug log

    axios.post('http://localhost:3000/login', { email, password })
      .then(response => {
        console.log('Login response:', response.data); // Debug log
        $('#loginSection').removeClass('active');
        $('#userSection').show();
        loadUsers();
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  });

  // Load users function
  function loadUsers() {
    axios.get('http://localhost:3000/users')
      .then(response => {
        console.log('Users loaded:', response.data); // Debug log
        const users = response.data;
        const userTableBody = $('#userTable tbody');
        userTableBody.empty();
        users.forEach(user => {
          userTableBody.append(`
            <tr data-toggle="modal" data-target="#userModal" data-id="${user._id}">
              <td>${user._id}</td>
              <td>${user.fullName}</td>
              <td>${user.email}</td>
            </tr>
          `);
        });
        $('#userTable').show();
      })
      .catch(error => {
        console.error('Error loading users:', error);
      });
  }
  // Show forgot password form
  $('#forgotPasswordBtn').on('click', function() {
    $('#loginSection').removeClass('active');
    $('#forgotPasswordSection').addClass('active');
  });

  // Handle reset password form submission
  // Reset Password form submission
  $('#resetPasswordForm').on('submit', function(event) {
    event.preventDefault();
    const email = $('#resetEmail').val();
    const newPassword = $('#newPassword').val();

    axios.post('http://localhost:3000/reset-password', { email, newPassword })
      .then(response => {
        alert('Password has been reset');
        $('#resetPasswordForm')[0].reset();
      })
      .catch(error => {
        console.error('Error resetting password:', error);
        alert('Failed to reset password');
      });
  });
  // Show user details in modal
  $('#userModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const userId = button.data('id');

    console.log('Fetching user details for ID:', userId); // Debug log

    axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => {
        console.log('User details response:', response.data); // Debug log
        const user = response.data;
        $('#userId').text(user._id);
        $('#userFullName').text(user.fullName);
        $('#userEmail').text(user.email);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  });
});
