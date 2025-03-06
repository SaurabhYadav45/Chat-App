export const formatTime = (timestamp) => {
    if (!timestamp) return "";
  
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
  
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };