import { requestNotificationTemplate } from "./email-templates";

export async function sendAdminNotification({
  subject,
  contentHtml,
  uid,
  type,
  documentId,
  result,
}: {
  subject: string;
  contentHtml: string;
  uid?: string;
  type?: string;
  documentId?: string;
  result?: Record<string, any>;
}) {
  // Load Global settings
  const global: any = await strapi.entityService.findMany(
    "api::global.global",
    {
      populate: ["notification"],
    }
  );

  let adminEmail = global.notification_receive_email;
  let webhookUrl = global.notification_webhook_url;
  let ccEmail = "";

  if (type && global.notification) {
    const specificNotification = global.notification.find(
      (n: any) => n.type === type
    );
    if (specificNotification && specificNotification.email) {
      ccEmail = adminEmail;
      adminEmail = specificNotification.email;
    }
    if (specificNotification && specificNotification.webhook_url) {
      webhookUrl = specificNotification.webhook_url;
    }
  }

  if (adminEmail) {
    try {
      const nodemailer = require("nodemailer");

      // Create a test account or replace with real credentials.
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: Number(process.env.SMTP_PORT) === 465 ? true : false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      // Wrap in an async IIFE so we can use await.
      (async () => {
        const info = await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: adminEmail,
          cc: ccEmail,
          subject: subject,
          html: requestNotificationTemplate(contentHtml, uid, documentId),
        });

        strapi.log.info("Email sent successfully.");
      })();

      /* await strapi.plugins["email"].services.email.send({
        to: adminEmail,
        from: process.env.SMTP_FROM,
        subject: subject,
        html: requestNotificationTemplate(contentHtml, uid, documentId),
      }); */

      // strapi.log.info("Notification email sent successfully.");
    } catch (err) {
      strapi.log.error("Failed to send email:", err);
    }
  }

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "request-type": type,
          ...(result || {}),
        }),
      });

      strapi.log.info("Webhook notified successfully.");
    } catch (err) {
      strapi.log.error("Failed to notify webhook:", err);
    }
  }
}
