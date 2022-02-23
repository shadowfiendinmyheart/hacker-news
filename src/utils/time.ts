export const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
