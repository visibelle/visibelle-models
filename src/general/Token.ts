import { Entity, Column, ManyToOne, Unique, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import User from "./User";

export enum TokenType {
    setPassword = "SETPASSWORD",
    apiKey = "APIKEY",
    confirmEmail = "CONFIRMEMAIL",
}


@Entity({
    name: "tokens"
})
@Unique(["token"])
export default class Token {

    @PrimaryGeneratedColumn()
    public id: number;


    @CreateDateColumn()
    public createdOn: Date;

    @Column({
        type: "enum",
        enum: TokenType,
        nullable: false
    })
    public type: TokenType;

    @Column()
    public token: string;

    @Column({ nullable: true })
    public expiresAfter!: Date;

    @Column({ nullable: true })
    public objectId: number;

    @Column({type:"varchar", length:'5000', default:'' , nullable: true })
    public data: string;


    @Column({
        nullable: true
    })
    public createdById: number;

    @ManyToOne((type) => User)
    public createdBy!: User;

    constructor(
        type: TokenType,
        objectId: number,
        tokenSize: 'small' | 'normal',
        expiresAfter?: Date,
        data?: string,
        createdById?: number
    ) {
        this.createdOn = new Date();
        this.type = type;
        this.token = tokenSize === 'small' ? `${(Math.floor(Math.random() * (999999 - 100000 + 1))) + 100000}`: `${(Math.floor(Math.random() * (999999999999 - 100000000000 + 1))) + 100000000000}`;
        this.expiresAfter = expiresAfter;
        this.objectId = objectId;
        this.data = data;
        this.createdById = createdById;

    }
    public toJSON() {
        return {
            id: this.id,
            createdOn: this.createdOn,
            type: this.type,
            token: this.token,
            expiresAfter: this.expiresAfter,
            objectId: this.objectId,
            data: this.data,
            createdById: this.createdById,
        };
    }
}