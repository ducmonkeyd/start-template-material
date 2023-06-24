import { MatSnackBarConfig } from '@angular/material';
import * as moment from 'moment';
import { environment } from '@env/environment.prod';
import { TranslateService } from '@ngx-translate/core';

export module Configs {
  export const languageCodeKey = 'languageCode';
  export const StartYear = 2015;
  export const fullMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  export const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  export const PageIndex = 1;
  export const PageSize = 25;
  export const VAT = 10;
  export const FileMaximunSize = 1; // MB
  export const DivideItemNumber = 6;

  export const TokenPrefix = 'supplychain';
  export const FileExtensions = ['docx', 'doc', 'pdf'];
  export const FileExtensionsContainer = ['xls', 'xlsx'];

  export const AllImageExtensions = 'image/*';

  export function NewGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  export function onGetEmptyObjectValues(inputObject: Object): Object {
    var obj = {};
    if (inputObject != null) {
      Object.keys(inputObject).map(key => {
        obj[key] = '';
      });
    }
    return obj;
  }

  export const Genders = [
    { value: 0, label: 'UnknownGender' },
    { value: 1, label: 'Male' },
    { value: 2, label: 'FeMale' }
  ];

  export const Status = [
    { value: 'Active', label: 'Kích hoạt' },
    { value: 'InActive', label: 'Không kích hoạt' }
  ];

  export const VerificationStatus = [
    { value: 'true', label: 'Hoàn thành' },
    { value: 'false', label: 'Chưa hoàn thành' }
  ];

  export const DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY'
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'DD/MM/YYYY',
      monthYearA11yLabel: 'MM YYYY'
    }
  };

  export const MatSnackBarDefaultConfig: MatSnackBarConfig = {
    duration: 15 * 1000,
    verticalPosition: 'top',
    panelClass: 'snack-bar-container',
    horizontalPosition: 'right'
  };

  export function isValidDate(input: any, format: string = 'DD/MM/YYYY'): boolean {
    return input instanceof Date || moment(input, format).isValid();
  }

  export function GetDateFormatted(dateInput: Date | string, format: string = 'DD/MM/YYYY') {
    return dateInput ? moment(dateInput).format(format) : '';
  }

  export function ParseToDate(dateInput: Date | string, format: string = 'DD/MM/YYYY') {
    return dateInput ? moment(dateInput, format).format() : '';
  }

  export function cloneArrayOrObject(arrOrObj: Array<any> | Object): Array<any> | Object {
    return JSON.parse(JSON.stringify(arrOrObj));
  }

  export const PREFIX: string = '';
  export const DECIMAL_SEPARATOR: string = '.';
  export const THOUSANDS_SEPARATOR: string = ',';
  export const SUFFIX: string = ''; //' $'
  export const PADDING = '000000';
  export const BLANK: string = ' ';

  export function TransformCurrency(value: string | number, fractionSize: number = 0): string {
    let [integer, fraction = ''] = (value || '').toString().split('.');

    fraction = fractionSize > 0 ? DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize) : '';

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);

    return PREFIX + integer + fraction + SUFFIX;
  }

  export function ParseCurrency(value: string, fractionSize: number = 2): string {
    let [integer, fraction = ''] = (value || '')
      .replace(this.PREFIX, '')
      .replace(this.SUFFIX, '')
      .split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');

    fraction =
      parseInt(fraction, 10) > 0 && fractionSize > 0
        ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
        : '';

    return integer + fraction;
  }

  export const Regex = {
    Identity: '^[\\d]{9,15}$',
    PersonNaming:
      '^[a-zA-ZsÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$',
    PhoneNumber:
      '^(?:[\\(]?[+]?[\\d]{2,3}[\\)]?)?(?:[\\s]|[\\x2d]|[\\x2e])?(?:[\\d]{3,4}(?:[\\s]|[\\x2d]|[\\x2e])?){1,2}[\\d]{3,5}$'
  };

  export function validateFile(
    file: File,
    acceptFileExtensions: string[],
    maximumSize: number,
    translate?: TranslateService
  ): string {
    if (!file) {
      return translate.instant('Commons.Error.NoImageChose');
    }

    if (file.size > maximumSize * 1024 * 1024) {
      return `${translate.instant('Commons.Error.FileTooLarge')} ${maximumSize} MB.`;
    }

    if (file.name !== null && file.name !== '' && file.name !== undefined) {
      let fileExt = file.name.replace(/^.*\./, '');
      if (acceptFileExtensions && acceptFileExtensions.length == 1 && acceptFileExtensions[0] == AllImageExtensions) {
        var pattern = /image-*/;
        if (!file.type.match(pattern)) {
          return `${translate.instant('Commons.Notification.FileUploadAllow')}: ${acceptFileExtensions.toString()}`;
        }
      } else if (
        acceptFileExtensions &&
        acceptFileExtensions.length > 0 &&
        !acceptFileExtensions.some(x => x.toUpperCase() == fileExt.toUpperCase())
      ) {
        return `${translate.instant('Commons.Notification.FileUploadAllow')}: ${acceptFileExtensions.toString()}`;
      }
    }

    return '';
  }

  export const uploadTempNewsImageUrl = 'api/News/UploadTempNewsImage';

  export const tempImageLeftUrl = environment.serverUrl + 'api/image/TempNews/img-';

  export const imageExtension = '.jpg';

  export const tempImageUrlRegex = new RegExp(tempImageLeftUrl + '[0-9]+' + imageExtension, 'g');
}
