export class KeyValuePair {
  public key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public value: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
