import React, { PropTypes } from 'react';
import { DatePicker, List } from 'antd-mobile';


import { createForm } from 'rc-form';
import 'moment/locale/zh-cn';
import moment from 'moment';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2016-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

{/*如果不是使用 List.Item 作为 children*/}
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', height: '0.9rem', lineHeight: '0.9rem', padding: '0 0.3rem' }}
  >
    {props.children}
    <span style={{ float: 'right', color: '#888' }}>{props.extra}</span>
  </div>
);


function DatePickerComponent ( { mode, title, extra, value, onOk, maxDate, minDate} ) {
return (
    <DatePicker mode={ mode } maxDate={ maxDate } minDate={minDate} title={ title } extra={ extra } value={ value } onOk= {val => onOk(val) }>
      <CustomChildren>时间选择</CustomChildren>
    </DatePicker>
  );
}

// DatePickerComponent.propTypes = {
//  mode: PropTypes.string.isRequired,
//  title: PropTypes.string.isRequired,
//  minDate: PropTypes.object.isRequired,
//  maxDate: PropTypes.object.isRequired,
//  extra: PropTypes.string.isRequired,
//  value: PropTypes.oneOfType([
//    PropTypes.string.isRequired,
//    PropTypes.object.isRequired
//  ]),
//  onOk: PropTypes.func.isRequired
// }

export default DatePickerComponent;