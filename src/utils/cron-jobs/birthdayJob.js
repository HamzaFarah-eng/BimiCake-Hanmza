import cron from 'node-cron';
import { userModel } from '../../../DB/models/user.model.js';
import { sendEmail } from '../SendEmail.js';

cron.schedule('0 0 * * *', async() => {
  console.log("happy birthday")
  /*
      const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const birthdayUsers = await userModel.find({
        birthdate: { $exists: true, $ne: null },
        $expr: {
          $and: [
            { $eq: [{ $dayOfMonth: "$birthdate" }, day] },
            { $eq: [{ $month: "$birthdate" }, month + 1] } 
          ]
        }
      });

      for(const user of birthdayUsers){
        sendEmail({ to: user.email, subject: '🎉 عيد ميلاد سعيد!', html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fdf6e3; color: #333;">
              <div style="max-width: 600px; margin: auto; border: 2px solid #f4c430; border-radius: 10px; padding: 20px; background-color: #fffef0;">
                <h2 style="color: #f4c430; text-align: center;">🎂 كل عام وأنت بخير يا ${user.username}!</h2>
                <p style="font-size: 18px; text-align: center;">
                  نتمنى لك يوماً مليئاً بالفرح والسعادة ونجاح دائم في حياتك!
                </p>
                <div style="text-align: center; margin-top: 30px;">
                  <img src="https://i.imgur.com/2kq4aDn.png" alt="Happy Birthday" style="width: 200px;" />
                </div>
                <p style="text-align: center; margin-top: 20px;">🎈 فريقنا يتمنى لك سنة رائعة قادمة! 🎁</p>
              </div>
            </div>
          `})
      }
  */
  });