function convertRupiah(number) {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

export default convertRupiah;
