import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { AbstractColor } from "./AbstractColor";
import { AbstractItem } from "./AbstractItem";

@Entity()
export default class Item implements AbstractItem {
  @PrimaryColumn()
  id!: number;

  @Column()
  "chat_link"!: string;

  @Column()
  icon!: string;

  @OneToOne("Color", "item", { cascade: true })
  @JoinColumn()
  color!: AbstractColor;
}
