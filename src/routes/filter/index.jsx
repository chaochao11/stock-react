
import React from 'react';
import moment from 'moment';
import { createForm } from 'rc-form';
import { DatePicker, List, Button, Picker } from 'antd-mobile';

const maxDate = moment( '2019-12-03 +0800', 'YYYY-MM-DD Z' ).utcOffset( 8 );
const minDate = moment( '2015-08-06 +0800', 'YYYY-MM-DD Z' ).utcOffset( 8 );

class Filter extends React.Component {

  goList() {
    this.props.form.validateFields(( errors, values ) => {
      // index页面的onSubmit
      if ( !errors ) {
        this.props.onSubmit( values );
      }
    });
  }

  render() {

    const { form, state, dateFrom, dateTo } = this.props;
    const { getFieldProps } = form;
    console.log( dateFrom );

    return ( <div>
      <List
        form={this.props.form}
        className="date-picker-list"
        style={{ backgroundColor: 'white' }}>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="选择起始时间"
          {...getFieldProps( 'dateFrom', {
            initialValue: moment( dateFrom )
          })}
          minDate={minDate}
          maxDate={maxDate}>
          <List.Item arrow="horizontal">起始时间</List.Item>
        </DatePicker>
        <DatePicker
          mode="date"
          title="选择日期"
          extra="选择结束时间"
          {...getFieldProps( 'dateTo', {
            initialValue: moment( dateTo )
          })}
          minDate={minDate}
          maxDate={maxDate}>
          <List.Item arrow="horizontal">结束时间</List.Item>
        </DatePicker>
        <Picker
          cols={1}
          data={[ // 状态(-1：全部 4：未验收 3：已验收 2：已完成 1：未完成)
            { value: -1, label: '全部' },
            { value: 4, label: '未验收' },
            { value: 3, label: '已验收' },
            { value: 2, label: '已完成' },
            { value: 1, label: '未完成' }
          ]}
          {...getFieldProps( 'state', {
            initialValue: [state]
          })}>
          <List.Item arrow="horizontal" extra="全部">单据状态</List.Item>
        </Picker>
      </List>
      <div style={{ padding: '0.15rem' }}>
        <Button onClick={() => this.goList()} style={{ backgroundColor: '#2DB245', color: '#fff', border: 'none' }}>确认</Button>
      </div>
    </div> );
  }
}

const TestWrapper = createForm()( Filter );

export default TestWrapper;
