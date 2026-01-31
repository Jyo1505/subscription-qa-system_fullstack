export default function isAllowed() {
  const now = new Date();
  const hour = now.getHours();
  return hour === 10; // 10–11 AM
}
