import BaseModel from "../BaseModel";
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Customer from "./Customer";

export enum FormTypes {
  CONTACTFORM = "CONTACTFORM",
}

@Entity({
  name: "forms",
})
export default class Form extends BaseModel {
  // Relationships
  @ManyToOne(() => Customer, (customer) => customer.documents)
  public customer: Customer;

  @Column({
    nullable: false,
  })
  public customerId: number;

  @Column({
    type: "enum",
    enum: FormTypes,
    default: FormTypes.CONTACTFORM,
    nullable: false,
  })
  public type: FormTypes;

  @Column({
    type: "simple-json", // or "jsonb" for PostgreSQL
    nullable: true,
    default: {},
  })
  public data: Record<string, any>;

  @Column({
    type: "simple-json", // or "jsonb" for PostgreSQL
    nullable: true,
    default: [],
  })
  public attachments: string[]; // or use a more specific type

  constructor(
    customerId: number,
    type: FormTypes = FormTypes.CONTACTFORM,
    data: Record<string, any> = {},
    attachments: string[] = []
  ) {
    super("cust");
    this.customerId = customerId;
    this.type = type;
    this.data = data;
    this.attachments = attachments;
  }

  public toJSON() {
    return {
      id: this.id,
      key: this.key,
      createdOn: this.createdOn,
      active: this.active,
      customerId: this.customerId,
      type: this.type,
      data: this.data ?? {},
      attachments: this.attachments ?? [],
    };
  }
}
