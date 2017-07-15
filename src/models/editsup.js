
import moment from 'moment';

/**
 * list 详情列表
 */
const state = () => {
  return {
    loading: false,
    list: [],
    addList: [],
    name: '',
    details: [],
    storeList: [],
    filter: '',
    checkrepeat: true,
    dateFilter: {
      key: `${+new Date()}`,
      dateFrom: moment().subtract( 1, 'days' ).format( 'YYYY-MM-DD' ),
      dateTo: moment().subtract( 1, 'days' ).format( 'YYYY-MM-DD' ),
      state: -1
    }
  };
};


export default {
  namespace: 'editsup',
  state: state(),
  reducers: {
    init() {
      return state();
    },
    // 详情提交
    submit( state, { payload }) {
      return { ...state, details: { ...state.details, ...payload }};
    },
    saveDetails( state ) {
      const list = state.addList;
      const detail = list.find(({ key }) => key === state.details.key );
      if ( detail ) {
        Object.assign( detail, state.details );
        return { ...state, addList: [...list]};
      }
      return { ...state };
    },
    store( state, { payload }) {
      console.log(payload)
      return { ...state, ...payload };
    },
    confirm( state, { payload }) {
      const list = state.list;
      const details = list.filter(({ orderguid }) => orderguid === payload.orderguid );
      if ( details.length ) {
        details.forEach(( detail ) => {
          Object.assign( detail, {
            checkcomplete: !!payload.tag
          });
        });
        return { ...state, list: [...list]};
      }
      return { ...state };
    },
    remain( state, { payload }) {
      // console.log(payload)
      return { ...state, name: { ...payload }};
    },
    show( state, { payload }) {
      return { ...state, details: { ...payload }};
    },
    update( state, { payload }) {
      return { ...state, list: [ ...state.list, ...payload.list ]};
    },
    remove( state, { payload }) {
      const { addList } = state;
      const newlist = addList.filter(({ orderguid }) => orderguid !== payload.orderguid );
      return { ...state, addList: newlist };
    },
    addBill( state, { payload }) {
      // 添加商品
      let addList = state.addList;
      let index = -1;
      // 如果有删掉没有添加
      if ( addList.length > 0 ) {
        for ( let i = 0; i < addList.length; i++ ) {
          if ( addList[i].orderguid === payload.orderguid ) {
            index = i;
          }
        }
      }
      if ( index !== -1 ) {
        addList = addList.filter(({ orderguid }) => orderguid !== payload.orderguid );
      } else {
        addList = [ ...addList, payload ];
      }
      return { ...state, addList };
    }
  },
  effects: {

  },
  subscriptions: {}
};
