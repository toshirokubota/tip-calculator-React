
export function staticAsset(assetName: string): string {
    return `${import.meta.env.BASE_URL}${assetName}`
}

export function calculateTipAmount(bill: number, tipPercentage: number) {
    return bill * tipPercentage / 100.0;
}

export function calculateTotalAmount(bill: number, tipPercentage: number) {
    return bill + calculateTipAmount(bill, tipPercentage);
}
