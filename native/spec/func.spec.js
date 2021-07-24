const { validateInput, taxRelif, taxScheme, calTaxScheme } = require('../func');

// UNIT TEST
test('output validate', () => {
    const text = validateInput('ANDRA', true, false);
    expect(text).toBe(true);
});

// UNIT TEST
test('output check status relief', () => {
    const text = taxRelif('TK0');
    expect(text).toBe(54000000);
});

// UNIT TEST
test('output Taxable Callucate', () => {
    const expected = taxScheme(300000000);
    expect(expected).toMatchObject({"result": 45000000, "rumus": ["50000000 * 5% = 2500000", "200000000 * 15% = 30000000", "50000000 * 25% = 12500000"]});
});

// INTEGRATION TEST
test('output Taxable Callucate 2', () => {
    const expected = calTaxScheme(25000000, 'TK0');
    expect(expected).toMatchObject({reliefStatus: "TK0 - IDR 54,000,000.00", taxableIncome: "IDR 246,000,000.00", taxIncome : "IDR 31,900,000.00", taxIncomeFormula: [
        "50000000 * 5% = 2500000",
        "196000000 * 15% = 29400000",
      ]});
});
