import BaseModel from "../BaseModel";
import { Entity, Column, ManyToOne } from "typeorm";
import Customer from "./Customer";

@Entity({
    name: "documents"
})
export default class Document extends BaseModel {

    @Column()
    public type: string;

    @Column({ nullable: true })
    public extraInfo: string;

    @Column()
    public url: string;

    @Column()
    public fileSize: number;

    // Relationships
    @ManyToOne(() => Customer, customer => customer.documents)
    public customer: Customer;

    constructor(
        type: string,
        url: string,
        fileSize: number,
        extraInfo?: string
    ) {
        super("doc");
        this.type = type;
        this.url = url;
        this.fileSize = fileSize;
        this.extraInfo = extraInfo;
    }

    public toJSON() {
        return {
            id: this.id,
            key: this.key,
            createdOn: this.createdOn,
            active: this.active,
            type: this.type,
            extraInfo: this.extraInfo,
            url: this.url,
            fileSize: this.fileSize
        };
    }
}