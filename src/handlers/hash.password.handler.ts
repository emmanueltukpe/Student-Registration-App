import bcrypt from "bcrypt";

class PasswordHash {
    private saltRounds: number;

    constructor(saltRounds = 10) {
        this.saltRounds = saltRounds;
    }

    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        return hashedPassword;
    }

    async comparePasswords(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
       console.log(isMatch);
        
        return isMatch;
    }
}

export default PasswordHash;
