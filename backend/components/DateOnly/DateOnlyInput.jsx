import {DateInput,DateTimeInput, set, unset} from 'sanity'

export const DateOnlyInput = (props) => {
    const { onChange, value } = props;
    
    // get date part of the utc datetime
    const dateValue = value?.utc ? value.utc.split( "T" )[0] : null;

    const handleDateChange = (event) => {
        const newValue = event.value ? event.value + "T00:00:00" : null;
        onChange(newValue ? set(newValue, ['utc']) : unset())    
    }
    return <DateInput {...props} onChange={handleDateChange} value={dateValue} />
}