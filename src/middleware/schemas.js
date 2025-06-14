import libphonenumber from "google-libphonenumber";
import Joi from "joi";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const phoneValidation = Joi.string()
  .custom((value, helper) => {
    try {
      if (!value.startsWith("+970") && !value.startsWith("+972")) {
        return helper.message("The phone number must start with +970 or +972");
      }

      const region = value.startsWith("+970") ? "PS" : "IL";
      const phoneNumber = phoneUtil.parseAndKeepRawInput(value, region);

      if (!phoneUtil.isValidNumber(phoneNumber)) {
        return helper.message("Invalid phone number");
      }

      return value;
    } catch (error) {
      return helper.message("Invalid phone number format");
    }
  })
  .messages({
    "any.required": "Phone number is required",
    "string.empty": "Phone number cannot be empty",
  });


  export const pagination = {
    page: Joi.number().positive().min(1).required(),
    limit: Joi.number().min(1).max(5).required(),
  };