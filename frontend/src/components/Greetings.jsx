export default function Greetings({ user = "user" }) {
  const date = new Date();
  const hour = date.getHours();
  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = "morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "afternoon";
  } else {
    greeting = "night";
  }
  // console.log(date.toLocaleTimeString());
  return (
    <p>
      Good {greeting}, {user}
    </p>
  );
}
