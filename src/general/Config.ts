import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import BaseModel from "../BaseModel";
import Customer from "./Customer";

export enum ConfigType {
  CUSTOMER = "CUSTOMER",
  CONTACTFORM = "CONTACTFORM",
  BOOKINGCONFIRM = "BOOKINGCONFIRM",
}
export interface CustomerConfigData {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface ContactFormConfigData {
  sendToEmails: string[];
  replyToSender: boolean;
  replyText: string;
}

export interface BookingConfirmConfigData {
  sendToEmails: string[];
  replyToSender: boolean;
  replyText: string;
}

export type ConfigDataMap = {
  [ConfigType.CUSTOMER]: CustomerConfigData;
  [ConfigType.CONTACTFORM]: ContactFormConfigData;
  [ConfigType.BOOKINGCONFIRM]: BookingConfirmConfigData;
};
@Entity({ name: "configs" })
export default class Config<
  T extends ConfigType = ConfigType
> extends BaseModel {
  @Column({
    type: "enum",
    enum: ConfigType,
  })
  public type: T;

  @Column({
    type: "text",
    nullable: true,
    transformer: {
      to: (value: any) => (value ? JSON.stringify(value) : "{}"),
      from: (value: string) => (value ? JSON.parse(value) : {}),
    },
  })
  public data!: ConfigDataMap[T]; // 👈 Type-safe JSON field

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
