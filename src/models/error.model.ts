import { ValidatorsEnum } from '../enums/validators.enum';

export class ErrorModel {
  inputId: string;
  errorType: ValidatorsEnum;

  constructor(inputId: string, errorType: ValidatorsEnum) {
    this.inputId = inputId;
    this.errorType = errorType;
  }
}