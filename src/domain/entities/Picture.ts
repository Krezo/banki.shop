export class Picture {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: number,
    public readonly images: string[],
    public readonly sold: boolean,
    public readonly oldPrice?: number
  ) { }
}
