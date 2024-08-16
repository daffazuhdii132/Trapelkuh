function formatDate(date) {
  const tanggal = new Date(date);
  return tanggal.toLocaleString("id-ID", { timeZoneName: "short" });
}

export default formatDate;
