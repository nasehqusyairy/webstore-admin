export function toRupiah(number) {
  let rupiah = '';
  const numberrev = number.toString().split('').reverse().join('');
  for (let i = 0; i < numberrev.length; i++) {
    rupiah += numberrev[i];
    if ((i + 1) % 3 === 0 && i !== (numberrev.length - 1)) {
      rupiah += '.';
    }
  }
  return `Rp. ${rupiah.split('').reverse().join('')}`;
}

export function fromRupiah(rupiah) {
  return parseInt(rupiah.replace(/Rp\.|\./g, ''), 10);
}