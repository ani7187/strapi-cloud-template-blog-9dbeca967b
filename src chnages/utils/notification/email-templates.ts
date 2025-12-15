export function requestNotificationTemplate(
  content: any,
  uid: string,
  documentId: string
): string {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Request Submission</title>
        <style>
  /* Reset */
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    font-family: Arial, sans-serif;
    background: #eef2f6; /* matches screenshot */
    color: #333;
  }

  .email-bg {
    padding: 40px 0;
    width: 100%;
    background: #eef2f6;
  }

  .container {
    max-width: 550px;
    background: #fff;
    margin: 0 auto;
    border-radius: 6px;
    padding: 40px 50px;
    text-align: left;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 25px 0;
    color: #446084; /* similar to screenshot */
  }

  /* Light block with dark left border */
  .info-box {
    background: #f2f6fb;
    padding: 20px 25px;
    border-left: 4px solid #2b3a48;
    border-radius: 4px;
    margin-bottom: 35px;
  }

  .info-box p {
    margin: 10px 0;
    font-size: 15px;
  }

  .info-box strong {
    display: block;
    margin-bottom: 2px;
    color: #576c7f;
  }

  /* Button */
  .btn {
    display: inline-block;
    padding: 12px 25px;
    background: #2b3548;
    color: #fff !important;
    text-decoration: none;
    font-weight: 600;
    border-radius: 6px;
    font-size: 14px;
  }

  .footer {
    text-align: center;
    margin-top: 50px;
    color: #8c99a8;
    font-size: 12px;
  }
</style>

      </head>
      <body>
        <div class="email-bg">
          <div class="container">
            ${content ? `<div class="info-box">${content}</div>` : ""}
            ${
              uid && documentId
                ? `<p>
                    <a href="${
                      process.env.BACKEND_ADMIN_URL || "http://localhost:1337"
                    }/admin/content-manager/collection-types/${uid}/${documentId}" 
                        class="btn" target="_blank"
                        rel="noopener"
                    >
                        See Online
                    </a>
                </p>`
                : ""
            }
            <div class="footer">
              &copy; ${new Date().getFullYear()} Digitain. All rights reserved.
            </div>
          </div>
        </div>
      </body>
      </html>
      `;
}
