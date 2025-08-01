import { snakeCase } from 'lodash';
import { ValidationError } from 'class-validator';
import { UnprocessableEntityException } from '@nestjs/common';
import { IValidationErrors } from '../models';

export class ValidationHelpers {
  static constructValidationErrors(validationErrors: ValidationError[]): never {
    const errorResponse: IValidationErrors[] = [];

    validationErrors.forEach((e) => {
      if (e.constraints) {
        errorResponse.push(...ValidationHelpers.validationHandler([e]));
      }
      if (e.children) {
        errorResponse.push(
          ...ValidationHelpers.validationHandler(
            e.children,
            e.property?.toLowerCase(),
          ),
        );
      }
    });

    throw new UnprocessableEntityException({
      message: `ValidationError`,
      errors: errorResponse,
    });
  }

  static validationHandler(
    errors: ValidationError[],
    prop: string = null,
  ): IValidationErrors[] {
    const parentProp = prop ? `${snakeCase(prop)}.` : '';
    const errorResponse: IValidationErrors[] = [];

    for (const e of errors) {
      if (e.constraints) {
        const constraintKeys = Object.keys(e.constraints);

        for (const item of constraintKeys) {
          errorResponse.push({
            message: `err_${parentProp}${e.property.toLowerCase()}_${snakeCase(
              item,
            )}`,
            field: e.property,
          });
        }
      } else {
        errorResponse.push(
          ...ValidationHelpers.validationHandler(
            e.children,
            e.property?.toLowerCase(),
          ),
        );
      }
    }

    return errorResponse;
  }
}
