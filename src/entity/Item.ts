import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export default class Item {
  @PrimaryColumn()
  id!: number;

  @Column()
  "chat_link"!: string;

  @Column()
  icon!: string;
}
