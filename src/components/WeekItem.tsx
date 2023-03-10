import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import TextComp from '../components/TextComp';
import week from '../utilities/week';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

type weekDay =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

interface Props {
  day: weekDay | string;
  index: number;
  onDatePress: (index: number, type: 'From' | 'To', value: string) => void;
  weekTimes: any[];
}

const WeekItem = ({day, index, onDatePress, weekTimes}: Props) => {
  const [type, setType] = useState<'From' | 'To'>('From');
  const [visible, setVisible] = useState(false);
  const [from, setFrom] = useState(weekTimes[index].from);
  const [to, setTo] = useState(weekTimes[index].to);

  useEffect(() => {
    setFrom(weekTimes[index].from);
    setTo(weekTimes[index].to);
  }, [weekTimes]);

  const onConfirm = (time: Date) => {
    const formatted = dayjs(time).format('hh:mm A');
    // if (type === 'From') {
    //   setFrom(formatted);
    // } else {
    //   setTo(formatted);
    // }
    onDatePress(index, type, formatted);
    setVisible(false);
  };

  return (
    <View>
      <TextComp text={day} type="medium" />
      <View style={styles.timeWrapper}>
        <TouchableOpacity
          onPress={() => {
            setType('From');
            setVisible(true);
          }}
          style={styles.timePicker}>
          <TextComp text={!from ? 'From' : from} type="medium" color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType('To');
            setVisible(true);
          }}
          style={styles.timePicker}>
          <TextComp text={!to ? 'To' : to} type="medium" color="gray" />
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={visible}
        mode="time"
        onConfirm={onConfirm}
        onCancel={() => setVisible(false)}
      />
    </View>
  );
};

export default WeekItem;

const styles = StyleSheet.create({
  timePicker: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    gap: 20,
  },
});
