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
}

export interface BookingConfirmConfigData {
  sendToEmails: string[];
  replyToSender: boolean;
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

  constructor(type: T, data?: ConfigDataMap[T], customerId?: number) {
    super("cfg");
    this.type = type;
    if (data !== undefined) this.data = data;
    if (customerId !== undefined) this.customerId = customerId;
  }
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
