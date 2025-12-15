// import axios from "axios";

// export default {
//   async afterUpdate(event: any) {
//     const url = process.env.FRONT_REVALIDATE_URL;
//     const secret = process.env.REVALIDATE_SECRET;
//     const bypassToken = process.env.VERCEL_BYPASS_TOKEN;

//     const { data } = event.params.data;

//     if (!url) {
//       return;
//     }

//     try {
//       const response = await axios.post(
//         url,
//         { /* path: data?.locale ? `/${data.locale}` : , */ type: "page" },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "x-webhook-secret": secret ?? "",
//             "x-vercel-protection-bypass": bypassToken ?? "",
//           },
//           timeout: 8000,
//           validateStatus: () => true,
//         }
//       );

//       strapi.log.info(
//         `Revalidation response ${response.status} - ${response.statusText}`
//       );
//     } catch (error) {
//       strapi.log.error("Failed to revalidate Next.js homepage", error);
//     }
//   },
// };
