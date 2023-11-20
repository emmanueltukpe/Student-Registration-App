function generateOtpCode(): string {
        const codeASNumber = Math.floor(100000 + Math.random() * 900000);
        return String(codeASNumber);
}

console.log(generateOtpCode);
