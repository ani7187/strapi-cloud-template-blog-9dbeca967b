import { sendAdminNotification } from "../../../../utils/notification/send-admin-notification";

export default {
  async afterCreate(event) {
    const { result, model } = event;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

        <p><strong>Full Name:</strong> ${result.full_name}</p>
        <p><strong>Email:</strong> <a href="mailto:${result.email}">${
        result.email
      }</a></p>
        <p><strong>Phone:</strong> <a href="tel:${result.phone_number}">${
        result.phone_number
      }</a></p>
        <p><strong>Company:</strong> ${result.company}</p>
        <p><strong>Page:</strong> ${result.page}</p>
        <p><strong>Date:</strong> ${result.date}</p>

        <p><strong>Has Gaming License:</strong> ${
          result.has_gaming_license ? "Yes" : "No"
        }</p>
        <p><strong>Has Existing Operation:</strong> ${
          result.has_existing_operation ? "Yes" : "No"
        }</p>

        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
        <p><strong>Message:</strong></p>
        <p>${result.message}</p>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Data Processing Consent:</strong> ${
          result.agree_data_processing ? "Yes" : "No"
        }</p>
      </div>
    `;

    await sendAdminNotification({
      subject: "New meeting book request",
      contentHtml: html,
      uid: model.uid,
      type: model.singularName,
      documentId: result.documentId,
      result: result,
    });
  },
};
