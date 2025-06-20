export const emailTemplate =(userName,token)=>{
    return `
         <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .header {
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px;
                  text-align: center;
                  font-size: 24px;
              }
              .content {
                  margin: 20px 0;
                  text-align: center;
              }
              .content h1 {
                  color: #333333;
              }
              .content p {
                  color: #666666;
                  font-size: 16px;
                  line-height: 1.6;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  color: #999999;
                  font-size: 14px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  Welcome to Our Store
              </div>
              <div class="content">
                  <h1>Hello! ${userName}</h1>
                  <p>We are excited to have you on board. Thank you for registering with us.</p>
                  <p>If you have any questions, feel free to reach out to our support team.</p>
                  <a href=${process.env.API_LINK}/auth/confirm/${token}>Confirm your Email</a>
              </div>
              <div class="footer">
                  &copy; ${new Date().getFullYear()} Bimi Cake. All rights reserved.
              </div>
          </div>
      </body>
      </html>
    `
  }