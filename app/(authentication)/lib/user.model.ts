import "server-only"

import { compare, hash } from "bcryptjs"

import { IUser } from "@/app/(authentication)/lib/user.interface"
import { User as NextUser } from "next-auth"
import { UserRole } from "@/app/(authentication)/lib/types/userRole.types"

export class User implements NextUser, IUser {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        private _password?: string,
        public created_at?: Date,
        public updated_at?: Date,
        public role?: UserRole,
        public isSubscribed: boolean = false
    ) {
        this.role = role ?? UserRole.guest
    }

    static hashPassword(password: string): Promise<string> {
        return hash(password, 10)
    }

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.name,
            json.email,
            json.password,
            json.created_at,
            json.updated_at,
            json.role,
            json.isSubscribed
        )
    }

    async changePassword(password: string) {
        this._password = await User.hashPassword(password)
    }

    comparePassword(password: string): Promise<boolean> {
        if (this._password === undefined) return Promise.resolve(false)

        return compare(password, this._password)
    }

    toJson(): any {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at,
            role: this.role,
        }
    }
}
