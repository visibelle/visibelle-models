import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import BaseModel from "../BaseModel";
import Customer from "./Customer";

export enum ConfigType {
  CUSTOMER = "CUSTOMER",
  CONTACTFORM = "CONTACTFORM",
  BOOKINGCONFIRM = "BOOKINGCONFIRM",
}

@Entity({ name: "configs" })
export default class Config extends BaseModel {
  // Enum kolom
  @Column({
    type: "enum", // Postgres & MySQL: gebruik enum
    enum: ConfigType,
  })
  public type: ConfigType;

  // JSON kolom
  @Column({
    // Postgres: "jsonb", MySQL: "json"
    type: "json",
    nullable: false,
    default: "'{}'" ,
  })
  public data: Record<string, any>;

  // FK naar customer
  @Column()
  public customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.configs, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "customerId" })
  public customer: Customer;

  public toJSON() {
    return {
      id: this.id,
      key: this.key,
      createdOn: this.createdOn,
      active: this.active,
      type: this.type,
      data: this.data,
      customerId: this.customerId,
    };
  }
}