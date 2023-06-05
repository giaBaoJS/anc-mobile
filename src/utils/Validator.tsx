import i18next from 'i18next';

class Validator {
  target: any;
  errors: Array<string>;
  constructor(target: any) {
    this.target = target;
    this.errors = [];
  }
  getError = (): string | null =>
    this.errors.length > 0 ? this.errors[0] : null;

  required = (): Validator => {
    if (!this.target || this.target === null || this.target === undefined) {
      this.errors.push(i18next.t('Validator.Require'));
    }
    return this;
  };

  email = (): Validator => {
    const emailReg =
      /^[a-zA-Z0-9_\-/?+][.a-zA-Z0-9_\-/?+]*@([a-zA-Z0-9_-]*[a-zA-Z0-9_-]\.)+([a-zA-Z0-9][a-zA-Z0-9]*)$/;
    if (this.target && !emailReg.test(this.target)) {
      this.errors.push(i18next.t('Validator.Email'));
    }
    return this;
  };

  safeCharacter = (): Validator => {
    const safeCharacterReg = /[.,/;]/;
    if (this.target && safeCharacterReg.test(this.target)) {
      this.errors.push(i18next.t('Validator.SafeCharacter'));
    }
    return this;
  };

  zipcode = (): Validator => {
    const pattern = /^[0-9]{3}-?[0-9]{4}$/;
    if (this.target && !pattern.test(this.target)) {
      this.errors.push(i18next.t('Validator.ZipCode'));
    }
    return this;
  };

  min = (length: number): Validator => {
    if (this.target && this.target.length < length) {
      this.errors.push(
        i18next.t('Validator.Min').replace('$5', length.toString()),
      );
    }
    return this;
  };

  max = (length: number): Validator => {
    if (this.target && this.target.length > length) {
      this.errors.push(
        i18next.t('Validator.Max').replace('$5', length.toString()),
      );
    }
    return this;
  };

  length = (length: number): Validator => {
    if (this.target && this.target.length !== length) {
      this.errors.push(
        i18next.t('Validator.Length').replace('$5', length.toString()),
      );
    }
    return this;
  };

  month = (): Validator => {
    const monthNumber = Number(this.target);
    const monthInRange = monthNumber >= 1 && monthNumber <= 12;

    const monthRegrex = /^[0-9]{1,2}$/;
    if (this.target && (!monthRegrex.test(this.target) || !monthInRange)) {
      this.errors.push(i18next.t('Validator.Month'));
    }

    return this;
  };

  number = (): Validator => {
    const numberReg = /^[0-9]*$/;
    if (this.target && !numberReg.test(this.target)) {
      this.errors.push(i18next.t('Validator.Number'));
    }
    return this;
  };
}

export default Validator;
