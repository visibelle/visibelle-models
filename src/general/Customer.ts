import BaseModel from "../BaseModel";
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import User from "./User";
import Address from "./Address";
import Document from "./Document";

@Entity({
    name: "customers"
})
export default class Customer extends BaseModel {

    @Column()
    public activity: string;

    @Column({ nullable: true })
    public addressId: number;

    @Column({ nullable: true })
    public phoneFix: string;

    @Column({ nullable: true })
    public phoneMobile: string;

    @Column({ nullable: true })
    public vatId: string;

    @Column({ nullable: true })
    public IBAN: string;

    @Column()
    public ownerEmail: string;

    @Column()
    public ownerFirstName: string;

    @Column()
    public ownerLastName: string;

    @Column()
    public companyForm: string;

    // Relationships
    @OneToMany(() => User, user => user.customer)
    public users: User[];

    @OneToOne(() => Address, address => address.customer)
    @JoinColumn({ name: "addressId" })
    public address: Address;

    @OneToMany(() => Document, document => document.customer)
    public documents: Document[];

    constructor(
        activity: string,
        ownerEmail: string,
        ownerFirstName: string,
        ownerLastName: string,
        companyForm: string,
        phoneFix?: string,
        phoneMobile?: string,
        vatId?: string,
        IBAN?: string
    ) {
        super("cust");
        this.activity = activity;
        this.ownerEmail = ownerEmail;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.companyForm = companyForm;
        this.phoneFix = phoneFix;
        this.phoneMobile = phoneMobile;
        this.vatId = vatId;
        this.IBAN = IBAN;
    }

    public toJSON() {
        return {
            id: this.id,
            key: this.key,
            createdOn: this.createdOn,
            active: this.active,
            activity: this.activity,
            addressId: this.addressId,
            phoneFix: this.phoneFix,
            phoneMobile: this.phoneMobile,
            vatId: this.vatId,
            IBAN: this.IBAN,
            ownerEmail: this.ownerEmail,
            ownerFirstName: this.ownerFirstName,
            ownerLastName: this.ownerLastName,
            companyForm: this.companyForm,
            address: this.address ? this.address.toJSON() : null,
            documents: this.documents ? this.documents.map(doc => doc.toJSON()) : [],
            users: this.users ? this.users.map(user => user.toJSON()) : []
        };
    }
}