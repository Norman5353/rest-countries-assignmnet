// import { useNotification } from "@kyvg/vue3-notification";
export default function sendAlert(msg,type = "success",title="" ) {
  const notification = useNotification();

  notification.notify({
    title: title,
    type: type,
    // title: "Authorization",
    text: msg,
    duration: 2500,
    position: "top center",
    top: "100px",
  });
  // Trigger the notification
}
