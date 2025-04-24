import { LABELS, NAMES, PLACEHOLDERS } from "./form";

interface FormFieldConfig {
  name: string;
  label: string;
  placeholder: string;
  readOnly?: boolean;
  spaceNotAllowed?: boolean;
}

export const COMMON_AUTH_FORM_FIELDS: FormFieldConfig[] = [
  { name: NAMES.EMAIL, label: LABELS.EMAIL, placeholder: PLACEHOLDERS.EMAIL, spaceNotAllowed: true },
];

export const LOGIN_FORM_FIELDS: FormFieldConfig[] = [
  { name: NAMES.NAME, label: LABELS.NAME, placeholder: PLACEHOLDERS.NAME, spaceNotAllowed: true },
];

export const REGISTER_FORM_FIELDS: FormFieldConfig[] = [{ name: NAMES.NAME, label: LABELS.NAME, placeholder: PLACEHOLDERS.NAME }];

export const PASSWORD_FIELD: FormFieldConfig = { name: NAMES.PASSWORD, label: LABELS.PASSWORD, placeholder: PLACEHOLDERS.PASSWORD };

export const CATEGORY_FIELDS: FormFieldConfig[] = [
  { name: NAMES.NAME, label: LABELS.CATEGORY_NAME, placeholder: PLACEHOLDERS.CATEGORY_NAME },
];

export const PRODUCT_FIELDS: FormFieldConfig[] = [
  { name: NAMES.NAME, label: LABELS.PRODUCT_NAME, placeholder: PLACEHOLDERS.PRODUCT_NAME },
  { name: NAMES.PRICE, label: LABELS.PRICE, placeholder: PLACEHOLDERS.PRICE },
];

export const USER_FIELDS: FormFieldConfig[] = [
  { name: NAMES.NAME, label: LABELS.USER_NAME, placeholder: PLACEHOLDERS.USER_NAME, spaceNotAllowed: true },
];

export const ORDER_FIELDS: FormFieldConfig[] = [
  { name: NAMES.QUANTITY, label: LABELS.QUANTITY, placeholder: PLACEHOLDERS.QUANTITY, readOnly: false },
  { name: NAMES.PRICE, label: LABELS.PRICE, placeholder: PLACEHOLDERS.PRICE, readOnly: true },
];

export const TO_USER_FIELD: FormFieldConfig = { name: NAMES.TO_USER, label: LABELS.TO_USER, placeholder: PLACEHOLDERS.TO_USER };
