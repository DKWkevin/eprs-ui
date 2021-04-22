import Vue from "vue";
import functions from './utils/functions';
import KtButton from './views/Core/KtButton';
import HovTools from './views/Core/HovTools';
import ETable from './views/Core/ETable';
import EQuery from "./views/Core/EQuery";
import HovToolsDb from './views/Core/HovToolsDb';
import Edialog from "./views/Core/Edialog";
import UploadButton from "./views/Core/uploadButton"

export default function (Vue) {
  /*
  制空表单
  data  表单名
  */
  Vue.prototype.formIsNull = functions.formIsNull;
  Vue.prototype.exportExcelDOM = functions.exportExcelDOM;
  Vue.prototype.getNewDate = functions.getNewDate;
  Vue.prototype.numberDateFormat = functions.numberDateFormat;
  /*权限按钮*/
  Vue.component('kt-button', KtButton);
  /*hov*/
  Vue.component('hov-tools', HovTools);
  /*表格*/
  Vue.component('e-table', ETable);
  /*查询条件*/
  Vue.component('e-query', EQuery);
  /*hovDb*/
  Vue.component('hov-tools-db', HovToolsDb);
  /*模态窗口*/
  Vue.component('e-dialog', Edialog);
  /*模态窗口*/
  Vue.component('upload-button', UploadButton);
}

