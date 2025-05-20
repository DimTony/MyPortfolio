"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function sendContactMessage(formData: any) {
    try {
        // 1. Store message in database
        //@ts-ignore
        const message = await prisma.contactMessage.create({
            data: {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            }
        });

        // 2. Send notification email with Brevo configuration
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com", // Brevo's SMTP server
            port: parseInt(process.env.EMAIL_PORT || "587"), // Convert to number, default to 587
            secure: process.env.EMAIL_SECURE === "true", // Convert string to boolean
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD, // This should be your SMTP key from Brevo
            },
            tls: {
                ciphers: 'SSLv3', // Force using specific ciphers
                rejectUnauthorized: true
            }
        });

        // Optional: Verify connection before sending
        // await new Promise((resolve, reject) => {
        //     transporter.verify(function(error, success) {
        //         if (error) {
        //             console.log("Server connection failed:", error);
        //             reject(error);
        //         } else {
        //             console.log("Server is ready to take our messages");
        //             resolve(success);
        //         }
        //     });
        // });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `New Contact Message from ${formData.name}`,
            text: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`,
            html: `
            <h2>New Contact Message</h2>
            <p><strong>From:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
            `,
        });

        return { success: true, message: "Message sent successfully" };
    } catch (error) {
        console.error("Error sending contact message:", error);
        return { success: false, message: "Failed to send message" };
    }
}