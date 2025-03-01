import BaseModel from "../BaseModel";
import { Entity, Column, ManyToOne, Unique } from "typeorm";
import Customer from "./Customer";

export enum UserCoreRole {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPERADMIN = "SUPERADMIN",
}
export enum DefaultLocales {
    EN = 'en',
    NL = 'nl',
    FR = 'fr',
}

@Entity({
    name: "users"
})
@Unique(["email"]) // User unique by customerId and email
export default class User extends BaseModel {

    @Column({
        transformer: {
            to: (value: string) => value.toLowerCase(),
            from: (value: string) => value
        }
    })
    public email: string;

    @Column({
        transformer: {
            to: (value: string) => value.toLowerCase(),
            from: (value: string) => value?.length ? value.charAt(0).toUpperCase() + value.slice(1) : ''
        }
    })
    public firstName: string;

    @Column({
        transformer: {
            to: (value: string) => value.toLowerCase(),
            from: (value: string) => value?.length ? value.charAt(0).toUpperCase() + value.slice(1) : ''
        }
    })
    public lastName: string;

    @Column({
        default: false
    })
    public emailConfirmed: boolean;

    @Column({
        nullable: true
    })
    public mobilePhone: string;

    @Column({
        nullable: true
    })
    public expoPushToken: string;

    @Column({
        type: "enum",
        enum: DefaultLocales,
        default: DefaultLocales.EN
    })
    public locale: string;

    @Column({
        nullable: false,
        type: 'varchar',
        transformer: {
            to: (roles: UserCoreRole[]) => {
                if (roles && roles.length > 0) {
                    return JSON.stringify(roles)
                } else {
                    return '[]'
                }
            },
            from: (roles: string) => {
                if (roles && roles.length > 3) {
                    return JSON.parse(roles)
                } else {
                    return []
                }
            }
        }
    })
    public coreRole: UserCoreRole[];

    @Column({
        default: false
    })
    public subscribeNews: boolean;

    @Column()
    public firebaseUid: string;

    // Relationships
    @ManyToOne(() => Customer, customer => customer.users)
    public customer: Customer;
    @Column({
        nullable: false
    })
    public customerId: number;


    constructor(
        firstName: string,
        lastName: string,
        email: string,
        mobilePhone: string,
        coreRole: UserCoreRole[],
        locale: string,
        firebaseUid: string,
        subscribeNews: boolean
    ) {
        super("usr");
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobilePhone = mobilePhone;
        this.coreRole = coreRole;
        this.locale = locale;
        this.firebaseUid = firebaseUid;
        this.subscribeNews = subscribeNews;
    }

    public toJSON() {
        return {
            id: this.id,
            key: this.key,
            createdOn: this.createdOn,
            active: this.active,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            mobilePhone: this.mobilePhone,
            locale: this.locale,
            coreRole: this.coreRole,
            firebaseUid: this.firebaseUid,
            expoPushToken: this.expoPushToken,
            emailConfirmed: this.emailConfirmed,
            subscribeNews: this.subscribeNews,
        };
    }
}