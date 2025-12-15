import { sendAdminNotification } from "../../../../utils/notification/send-admin-notification";

export default {
  async afterCreate(event) {
    const { result, model } = event;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p><strong>Position:</strong> ${result.position}</p>
        <p><strong>Email:</strong> <a href="mailto:${result.email}">${result.email}</a></p>
        <p><strong>Page:</strong> ${result.page}</p>
      </div>
      `;

    await sendAdminNotification({
      subject: "New role request",
      contentHtml: html,
      uid: model.uid,
      type: model.singularName,
      documentId: result.documentId,
      result: result,
    });
  },
};
