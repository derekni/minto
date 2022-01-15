export const formatCountdownTime = (msLeft: number) => {
  const hours = Math.floor(msLeft / 3_600_000);
  const minutes = Math.floor(msLeft / 60_000) % 60;
  const seconds = Math.floor(msLeft / 1_000) % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
};
