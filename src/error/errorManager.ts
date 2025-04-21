import { FlowErrorParams } from "@subflow/types";

export class ErrorManager {
  private static errors: FlowErrorParams<any>[] = [];

  public static add(error: FlowErrorParams<any>) {
    this.errors.push(error);
  }

  public static view() {
    return this.errors;
  }

  public static clear() {
    this.errors = [];
  }
}
