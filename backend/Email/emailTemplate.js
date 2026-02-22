export function createWelcomeEmailTemplate(name, clientURL) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to Messenger</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: 'Segoe UI', Arial, sans-serif;">
    
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #4facfe, #00f2fe); padding:40px 30px; text-align:center;">
          <img src="https://cdn-icons-png.flaticon.com/512/2462/2462719.png" 
               alt="Messenger Logo" 
               width="70" 
               style="display:block; margin:0 auto 20px auto;" />
          
          <h1 style="color:#ffffff; margin:0; font-size:28px; font-weight:600;">
            Welcome to Messenger 🚀
          </h1>
          
          <p style="color:#eafcff; margin-top:10px; font-size:15px;">
            Connect. Chat. Share. Instantly.
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 35px; color:#444;">
          
          <p style="font-size:18px; margin-top:0;">
            Hi <strong>${name}</strong>,
          </p>

          <p style="font-size:15px; line-height:1.7; color:#555;">
            We're thrilled to have you join Messenger!  
            Your account is ready — and you're just moments away from seamless, real-time conversations with friends, family, and colleagues.
          </p>

          <!-- Features Box -->
          <div style="background:#f8fbff; border-radius:12px; padding:25px; margin:30px 0;">
            <h3 style="margin-top:0; color:#0077ff; font-size:16px;">
              Here's what you can do:
            </h3>

            <ul style="padding-left:20px; margin:15px 0 0 0; font-size:14px; line-height:1.8; color:#555;">
              <li>📸 Personalize your profile</li>
              <li>👥 Add and manage contacts</li>
              <li>💬 Start instant conversations</li>
              <li>📎 Share photos, videos & files</li>
              <li>🔒 Enjoy secure and private messaging</li>
            </ul>
          </div>

          <!-- CTA Button -->
          <div style="text-align:center; margin:35px 0;">
            <a href="${clientURL}" 
               style="background: linear-gradient(135deg, #4facfe, #00c6ff); 
                      color:#ffffff; 
                      text-decoration:none; 
                      padding:14px 36px; 
                      border-radius:50px; 
                      font-size:15px; 
                      font-weight:600; 
                      display:inline-block;
                      box-shadow:0 6px 18px rgba(0, 140, 255, 0.3);">
              Open Messenger
            </a>
          </div>

          <p style="font-size:14px; color:#777; line-height:1.6;">
            Need help getting started? Our support team is always ready to assist you.
          </p>

          <p style="margin-top:30px; font-size:14px;">
            Cheers,<br/>
            <strong>The Messenger Team</strong>
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafc; padding:25px; text-align:center; font-size:12px; color:#999;">
          <p style="margin:0;">© 2026 Messenger. All rights reserved.</p>
          <p style="margin:10px 0 0 0;">
            <a href="#" style="color:#0077ff; text-decoration:none; margin:0 8px;">Privacy Policy</a> |
            <a href="#" style="color:#0077ff; text-decoration:none; margin:0 8px;">Terms</a> |
            <a href="#" style="color:#0077ff; text-decoration:none; margin:0 8px;">Support</a>
          </p>
        </td>
      </tr>

    </table>

  </body>
  </html>
  `;
}