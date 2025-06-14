export const PasswordResetTemplate = (code) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
          body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #eef1f5;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
              overflow: hidden;
              border: 1px solid #dcdfe3;
          }
          .header {
              background-color: #2d3748;
              color: #ffffff;
              text-align: center;
              padding: 30px 20px;
          }
          .header h1 {
              margin: 0;
              font-size: 26px;
          }
          .content {
              padding: 30px 40px;
              color: #2d3748;
              text-align: left;
          }
          .content h2 {
              font-size: 22px;
              margin-top: 0;
              color: #2c5282;
          }
          .content p {
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
          }
          .code-box {
              margin: 20px 0;
              padding: 15px;
              background-color: #edf2f7;
              border-left: 6px solid #2c5282;
              font-size: 20px;
              font-weight: bold;
              text-align: center;
              color: #2c5282;
              letter-spacing: 2px;
              border-radius: 4px;
          }
          .expiration {
              text-align: center;
              color: #c53030;
              font-size: 14px;
              margin-top: -10px;
              margin-bottom: 20px;
          }
          .footer {
              background-color: #f7fafc;
              text-align: center;
              padding: 20px;
              font-size: 14px;
              color: #718096;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Password Reset Request</h1>
          </div>
          <div class="content">
              <h2>Hello,</h2>
              <p>We received a request to reset your password. Use the code below to proceed:</p>
              <div class="code-box">${code}</div>
              <div class="expiration">This code will expire in 1 hour</div>
              <p>If you did not request a password reset, please ignore this email. No further action is required.</p>
              <p>Thank you,<br/>The Support Team</p>
          </div>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;
};
