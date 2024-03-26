import {AbstractControl, ValidatorFn} from "@angular/forms";

export function dateRangeValidator(bookedDates: { startDate: Date, endDate: Date }[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    if (!isNaN(selectedDate.getTime())) {
      for (const range of bookedDates) {
        if (selectedDate >= range.startDate && selectedDate <= range.endDate) {
          return { 'dateDisabled': true };
        }
      }
    }
    return null;
  };
}
