const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Use this line to load environment variables from the .env file
require('dotenv').config();

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        // Access variables using process.env
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.submitGiftCard = functions.https.onCall(async (data, context) => {
    // You no longer need to check for the user's email here
    // as we're getting it from the client-side
    const { giftCardCode, userEmail } = data;

    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    const userId = context.auth.uid;

    const mailOptions = {
        from: `ClassWave <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL, // Access variable using process.env
        subject: `New Gift Card Submission from ${userEmail}`,
        html: `
            <h1>New Gift Card Submission</h1>
            <p><strong>User ID:</strong> ${userId}</p>
            <p><strong>User Email:</strong> ${userEmail}</p>
            <p><strong>Gift Card Code:</strong> ${giftCardCode}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Gift card submitted successfully!' };
    } catch (error) {
        console.error('There was an error while sending the email:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send email.');
    }
});