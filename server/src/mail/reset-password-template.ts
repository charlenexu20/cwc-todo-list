export const resetPasswordTemplate = (token, id) => {
  return `
  <html>
    <h1>Reset your Project Planning Tool password</h1>
    <p><a href="http://localhost:3000/reset-password/${token}/${id}" target="_blank">Click here to reset your password</a></p>
    <small>
      If you didn't request a reset, don't worry. You can safely ignore this email.
    </small>
  </html>`;
};
