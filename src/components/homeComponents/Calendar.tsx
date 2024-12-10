import React from 'react';
import {
    Calendar,
} from 'react-native-calendars';
import { commonStyles } from '../../commonStyles';
import { View } from 'react-native';

export default function CalendarComponent () : React.JSX.Element {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const lastDay = new Date(currentYear, currentMonth + 1, 0);


    return (
        <View>
            <Calendar
                style={commonStyles.calendar}
                current={currentDate.toISOString().split('T')[0]}
                minDate={`${currentYear}-${currentMonth + 1}-1`}
                maxDate={`${currentYear}-${currentMonth + 1}-${lastDay.getDate()}`}
                onDayPress={(day : any) => {console.log('selected day', day);}}
                monthFormat={'MMMM yyyy'}
                hideExtraDays={false}
                disableMonthChange={true}
                firstDay={1}
                hideDayNames={false}
                showWeekNumbers={false}
                onPressArrowLeft={(subtractMonth : any) => subtractMonth()}
                onPressArrowRight={(addMonth : any) => addMonth()}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={false}
                markedDates={{}}
                showSixWeeks={false}
                allowSelectionOutOfRange={true}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'blue',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'darkgreen',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                }}
            />
        </View>
    );
}
