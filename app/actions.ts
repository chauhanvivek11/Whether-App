'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { error: "All fields are required." };
    }

    try {
        await resend.emails.send({
            from: 'Weather App Contact Form <onboarding@resend.dev>',
            to: 'vivekchauhan11mg@gmail.com', // Your email address
            subject: `New Message from ${name}`,
            replyTo: email,
            html: `
                <h2>New message from your Weather App contact form:</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });
        return { success: "Message sent successfully!" };
    } catch (error) {
        console.error("Email sending error:", error);
        return { error: "Failed to send message." };
    }
};