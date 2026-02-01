export default function isAllowed() {
  const now = new Date();

  // Convert to IST
  const istTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const hour = istTime.getHours();

  // Allow only between 10 and 11 IST
  return hour >= 10 && hour < 13;
}
