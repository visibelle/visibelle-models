import BaseModel from "../BaseModel";
import { Entity, Column, OneToOne } from "typeorm";
import Customer from "./Customer";

@Entity({
    name: "addresses"
})
export default class Address extends BaseModel {

    @Column()
    public streetName: string;

    @Column()
    public houseNumber: string;

    @Column({ nullable: true })
    public box: string;

    @Column()
    public zipCode: string;

    @Column()
    public city: string;

    @Column()
    public country: string;

    // Relationships
    @OneToOne(() => Customer, customer => customer.address)
    public customer: Customer;

    constructor(
        streetName: string,
        houseNumber: string,
        zipCode: string,
        city: string,
        country: string,
        box?: string
    ) {
        super("addr");
        this.streetName = streetName;
        this.houseNumber = houseNumber;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
        this.box = box;
    }

    public toJSON() {
        return {
            id: this.id,
            key: this.key,
            createdOn: this.createdOn,
            active: this.active,
            streetName: this.streetName,
            houseNumber: this.houseNumber,
            box: this.box,
            zipCode: this.zipCode,
            city: this.city,
            country: this.country
        };
    }
}