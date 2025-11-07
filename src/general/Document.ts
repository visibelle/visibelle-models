import BaseModel from "../BaseModel";
import { Entity, Column, ManyToOne } from "typeorm";
import Customer from "./Customer";

@Entity({
  name: "documents",
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

  @Column()
  public fileName: string;

  // Relationships
  @ManyToOne(() => Customer, (customer) => customer.documents)
  public customer: Customer;

  @Column()
  public customerId: number;

  constructor(
    customerId: number,
    type: string,
    url: string,
    fileSize: number,
    extraInfo?: string,
    fileName?: string
  ) {
    super("doc");
    this.customerId = customerId;
    this.type = type;
    this.url = url;
    this.fileSize = fileSize;
    this.extraInfo = extraInfo;
    this.fileName = fileName;
  }

  public toJSON() {
    return {
      id: this.id,
      key: this.key,
      createdOn: this.createdOn,
      active: this.active,
      customerId: this.customerId,
      type: this.type,
      extraInfo: this.extraInfo,
      url: this.url,
      fileSize: this.fileSize,
      fileName: this.fileName,
    };
  }
}
