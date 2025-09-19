import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.APP_PASSWORD
    }
  });
};

// Email templates
const emailTemplates = {
  suspended: (username, reason) => ({
    subject: '🚫 บัญชีของคุณถูกระงับการใช้งาน - Goodmeal',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #ef4444, #dc2626); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 36px;">🚫</span>
            </div>
            <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 700;">บัญชีถูกระงับการใช้งาน</h1>
          </div>

          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              เรียน คุณ <strong style="color: #1f2937;">${username}</strong>
            </p>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              ขออภัยในความไม่สะดวก บัญชีของคุณใน <strong style="color: #059669;">Goodmeal</strong> ถูกระงับการใช้งานชั่วคราว
            </p>

            ${reason ? `
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin: 0 0 10px; font-size: 16px; font-weight: 600;">เหตุผลในการระงับ:</h3>
              <p style="color: #7f1d1d; margin: 0; font-size: 15px; line-height: 1.5;">${reason}</p>
            </div>
            ` : ''}

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
              หากคุณต้องการข้อมูลเพิ่มเติมหรือต้องการอุทธรณ์การตัดสินใจนี้ กรุณาติดต่อทีมสนับสนุนของเรา
            </p>
          </div>

          <!-- Contact Info -->
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; font-weight: 600;">ติดต่อสนับสนุน</h3>
            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
              📧 อีเมล: support@goodmeal.com<br>
              📞 โทร: 02-XXX-XXXX<br>
              🕒 เวลาทำการ: จันทร์-ศุกร์ 9:00-18:00 น.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 Goodmeal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `
  }),

  unsuspended: (username) => ({
    subject: '✅ บัญชีของคุณถูกปลดระงับแล้ว - Goodmeal',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 20px;">
        <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #10b981, #059669); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 36px;">✅</span>
            </div>
            <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 700;">บัญชีถูกปลดระงับแล้ว</h1>
          </div>

          <!-- Content -->
          <div style="margin-bottom: 30px;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              เรียน คุณ <strong style="color: #1f2937;">${username}</strong>
            </p>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
              ขอแสดงความยินดี! บัญชีของคุณใน <strong style="color: #059669;">Goodmeal</strong> ถูกปลดระงับแล้ว
            </p>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <p style="color: #166534; margin: 0; font-size: 15px; line-height: 1.5; text-align: center;">
                🎉 ตอนนี้คุณสามารถเข้าใช้งานระบบได้ตามปกติแล้ว
              </p>
            </div>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
              กรุณาปฏิบัติตามกฎระเบียบและเงื่อนไขการใช้งานเพื่อหลีกเลี่ยงการถูกระงับอีกครั้งในอนาคต
            </p>
          </div>

          
          <!-- Contact Info -->
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 30px 0;">
            <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; font-weight: 600;">ติดต่อสนับสนุน</h3>
            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
              📧 อีเมล: support@goodmeal.com<br>
              📞 โทร: 02-XXX-XXXX<br>
              🕒 เวลาทำการ: จันทร์-ศุกร์ 9:00-18:00 น.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 Goodmeal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `
  })
};

// Send suspension email
export const sendSuspensionEmail = async (userEmail, username, reason) => {
  try {
    if (!process.env.EMAIL_SENDER || !process.env.APP_PASSWORD) {
      console.error('Email configuration missing in environment variables');
      return false;
    }

    const transporter = createTransporter();
    const template = emailTemplates.suspended(username, reason);

    const mailOptions = {
      from: {
        name: 'Goodmeal Admin',
        address: process.env.EMAIL_SENDER
      },
      to: userEmail,
      subject: template.subject,
      html: template.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Suspension email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending suspension email:', error);
    return false;
  }
};

// Send unsuspension email
export const sendUnsuspensionEmail = async (userEmail, username) => {
  try {
    if (!process.env.EMAIL_SENDER || !process.env.APP_PASSWORD) {
      console.error('Email configuration missing in environment variables');
      return false;
    }

    const transporter = createTransporter();
    const template = emailTemplates.unsuspended(username);

    const mailOptions = {
      from: {
        name: 'Goodmeal Admin',
        address: process.env.EMAIL_SENDER
      },
      to: userEmail,
      subject: template.subject,
      html: template.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Unsuspension email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending unsuspension email:', error);
    return false;
  }
};
