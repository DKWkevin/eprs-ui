import {dateFormat} from "@/utils/functions";
import {downloadFile} from "@/utils/Blob";

export default {
  name: 'Hbyjsjxz',
  data() {
    return {
      icon: '',
      perms: 'region:hbyjsjxz:select',
      loading: false,
      label: 'action.downloadNumber',
      base: {
        querydate: null,
        stcompanyid: '1',
        type: '0'
      },
    }
  },
  created() {
    this.base.querydate = new Date(this.getNewDate() + ' 00:00:00');
  },
  methods: {
    xmlToStrings() {
      let startdate = null;
      let endofdate = null;
      let usedate = null;
      if (this.base.querydate === null || this.base.querydate === '') {
        alert("日期不能为空");
        return false;
      } else {
        startdate = dateFormat("YYYY-mm-dd", this.base.querydate) + " 00:00:00";
        endofdate = dateFormat("YYYY-mm-dd", this.base.querydate) + " 23:59:59";
        usedate = dateFormat("YYYY-mm-dd", this.base.querydate);
      }
      if (this.base.stcompanyid === null || this.base.stcompanyid === '') {
        alert("类型为门店或者地区不能为空");
        return false;
      }
      if (this.base.type === null || this.base.type === '') {
        alert("类型为进货,销售或者库存不能为空");
        return false;
      }
      if (this.base.type === '2') {
        downloadFile("/hbyjsjxz/selectrem?stcompanyid=" + this.base.stcompanyid, this);
      } else if (this.base.type === '0') {
        downloadFile("/hbyjsjxz/selectsu?startdate=" + startdate + "&endofdate=" + endofdate + "&stcompanyid=" + this.base.stcompanyid, this);
      } else if (this.base.type === '1') {
        downloadFile("/hbyjsjxz/selectsales?startdate=" + startdate + "&endofdate=" + endofdate + "&useday=" + usedate + "&stcompanyid=" + this.base.stcompanyid, this);
      }
    }
  }
}
