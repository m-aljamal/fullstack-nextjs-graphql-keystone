export default function formatMoney(amount = 0) {
  const options = {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  };
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formater = Intl.NumberFormat("tr-TR", options);

  return formater.format(amount / 100);
}
