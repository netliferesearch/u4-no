import { DateOnlyInput } from '../../components/DateOnly/DateOnlyInput';

export default {
  name: 'date',
  description: 'Date of publication/last update',
  type: 'richDate',
  components: {
    input: DateOnlyInput
  },
  options: {
    inputUtc: true,
    dateFormat: 'YYYY-MM-DD',
    inputDate: true,
    inputTime: false,
  },
}
