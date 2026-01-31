

// module.exports = () => {
//   const now = new Date();
//   const ist = new Date(
//     now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
//   );
//   return ist.getHours() === 10;
// };
export default function isAllowed() {
  const hour = new Date().getHours();
  return hour >= 10 && hour < 11;
}
