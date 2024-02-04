/* eslint-disable no-unused-vars */
import { JoiRequestValidationError } from '@global/helpers/error-handler';
import { Request } from 'express';
import { ObjectSchema } from 'joi';

// Define the type for the decorator function
type IJoiDecorator = (target: unknown, key: string, descriptor: PropertyDescriptor) => void;

// Define the decorator function
export function joiValidation(schema: ObjectSchema): IJoiDecorator {
  // The decorator function returns another function that receives information about the decorated method
  return (_target: unknown, _key: string, descriptor: PropertyDescriptor) => {
    // Save a reference to the original method
    const originalMethod = descriptor.value;

    // Modify the method to perform Joi validation on the request body
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = async function (...args: any[]) {
      // Extract the request object from the method arguments
      const req: Request = args[0];
      // Use Joi to validate the request body based on the provided schema
      const { error } = await Promise.resolve(schema.validate(req.body));
      // If there's a validation error, throw a custom error with the error message
      if (error?.details) {
        throw new JoiRequestValidationError(error.details[0].message);
      }
      // If validation passes, call the original method with the arguments
      return originalMethod.apply(this, args);
    };
    // Return the modified descriptor
    return descriptor;
  };
}
