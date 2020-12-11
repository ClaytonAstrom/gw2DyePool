import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Item from "./Item";

@Entity()
export default class Color {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("int", { array: true, nullable: true })
  cloth!: number[] | null;

  @Column("int", { array: true, nullable: true })
  leather!: number[] | null;

  @Column("int", { array: true, nullable: true })
  metal!: number[] | null;

  @Column("int", { array: true, nullable: true })
  fur!: number[] | null;

  @OneToOne(() => Item)
  @JoinColumn()
  item!: Item;
}
