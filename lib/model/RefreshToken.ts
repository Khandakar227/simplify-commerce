import pool from '@/lib/conn';

interface IRefreshToken {
    id: number;
    token: string;
    userId: number;
    userType: string;
    isBlacklisted: boolean;
    createdAt: Date;
}

export class RefreshToken {
    static async create (data: { token: string, userId: number, userType: string }) {
        await pool.execute(`INSERT INTO refresh_token (token, userId, userType) VALUES (?, ?, ?)`,
        [data.token, data.userId, data.userType]);
    }

    static async findByToken (token: string) {
        const [rows] = await pool.execute(`SELECT * FROM refresh_token WHERE token = ?`, [token]);
        return (rows as IRefreshToken[])[0];
    }

    static async blacklist (token: string) {
        await pool.execute(`UPDATE refresh_token SET isBlacklisted = 1 WHERE token = ?`, [token]);
    }

    static async isBlacklisted (token: string) {
        const [rows] = await pool.execute(`SELECT * FROM refresh_token WHERE token = ? AND isBlacklisted = 1`, [token]);
        return (rows as IRefreshToken[])[0];
    }

    static async deleteByUserId (userId: number) {
        await pool.execute(`DELETE FROM refresh_token WHERE userId = ?`, [userId]);
    }

    static async deleteByToken (token: string) {
        await pool.execute(`DELETE FROM refresh_token WHERE token = ?`, [token]);
    }

    static async deleteAll () {
        await pool.execute(`DELETE FROM refresh_token`);
    }
}