import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Item from "./Item";

@Entity()
export default class Color {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("int", { array: true })
  "base_rgb"!: number[];

  @OneToOne(() => Item)
  @JoinColumn()
  item!: number;
}
