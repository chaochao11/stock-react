import React from 'react';
import { Router, Route } from 'dva/router';
import Frame from './routes/frame/frame';
import Login from './routes/login/login';
import Forget from './routes/forget-pwd/index';
import ScanPage from './routes/scan-page/index';
import SelOrderNum from './routes/sel-order-num/index';
import OrderSuccess from './routes/order-success/index';
import SupSuccess from './routes/sup-success/index';
import SelSupplier from './routes/sel-supplier/index';
import DetailsOrder from './routes/details-order/index';
import DetailsSup from './routes/details-sup/index';
import FirmByOrder from './routes/firm-by-order/index';
import FirmBySup from './routes/firm-by-sup/index';
import Filter from './routes/filter/index';
import ChkListBySup from './routes/chk-list-by-sup/index';
import ChkListByOrder from './routes/chk-list-by-order/index';
// import BeforeSelSup from './routes/before-sel-sup/index';
import SelStoreOrder from './routes/sel-store-order/index';
import SelStoreSup from './routes/sel-store-sup/index';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Frame}>
        <Route path="login" component={Login} />
        <Route path="forget-pwd" component={Forget} />
        <Route path="scan-page" component={ScanPage} />

        <Route path="order" component={({ children }) => <div>{children}</div>}>
          <Route path="sel-order-num" component={SelOrderNum} />
          <Route path="chk-list-by-order/:billno" component={ChkListByOrder} />
          <Route path="firm-by-order/:billno" component={FirmByOrder} />
          <Route path="details-order/:billno" component={DetailsOrder} />
          <Route path="sel-store-order" component={SelStoreOrder} />
        </Route>

        <Route path="sup" component={({ children }) => <div>{children}</div>}>
          <Route path="sel-supplier" component={SelSupplier} />
          
          <Route path="chk-list-by-sup/:supplierid" component={ChkListBySup} />
          <Route path="firm-by-sup/:supplierid" component={FirmBySup} />
          <Route path="details-sup/:supplierid" component={DetailsSup} />
          <Route path="filter" component={Filter} />
          <Route path="sel-store-sup" component={SelStoreSup} />
        </Route>

        <Route path="order-success" component={OrderSuccess} />
        <Route path="sup-success" component={SupSuccess} />

      </Route>
    </Router>
  );
}

export default RouterConfig;
