import { sendAdminNotification } from "../../../../utils/notification/send-admin-notification";

export default {
  async afterCreate(event) {
    const { result, model } = event;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p><strong>Name:</strong> ${result.first_name} ${result.last_name}</p>
          <p><strong>Email:</strong> <a href="mailto:${result.email}">${result.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${result.phone_number}">${result.phone_number}</a></p>
          <p><strong>Company:</strong> ${result.company}</p>
          <p><strong>Position/Role:</strong> ${result.position_role}</p>
          <p><strong>Page:</strong> ${result.page}</p>
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <p>${result.message}</p>
      </div>
      `;

    await sendAdminNotification({
      subject: "New about bussines request",
      contentHtml: html,
      uid: model.uid,
      type: model.singularName,
      documentId: result.documentId,
      result: result,
    });
  },
};
