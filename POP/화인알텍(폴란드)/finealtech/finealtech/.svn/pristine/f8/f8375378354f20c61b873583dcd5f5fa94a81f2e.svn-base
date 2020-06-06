using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmNonProdTime : Form
    {
        DateTime _startdt = DateTime.Now;
        DateTime _enddt = DateTime.Now;
        string _work_day = "";
        string _nowclassid = "";
        string _nowworkcd = "";
        string _nowtype = "";

        int _sec = 1;
        string _colorFlag = "R";

        public frmNonProdTime(string title, string work_day, string nowclassid, string nowworkcd, string nowtype, string startflag)
        {
            InitializeComponent();

            lblTitle.Text = title;
            _work_day    = work_day;
            _nowclassid   = nowclassid;
            _nowworkcd    = nowworkcd;
            _nowtype      = nowtype;

            _startdt = DateTime.Now;

            if(startflag == "START")
            {
                nonwork_insert(startflag);
            }
            else
            {
                _sec = int.Parse(startflag);
                TimeSpan ts = TimeSpan.FromTicks(_sec);
                lblTime.Text = ts.Hours.ToString("00") + ":" + ts.Minutes.ToString("00") + ":" + ts.Seconds.ToString("00");
            }
            
            timerNonProd.Enabled = true;
        }



        private void btnStop_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("해당 비가동(" + lblTitle.Text + ")을 중지 하겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                timerNonProd.Enabled = false;
                string ts_value = "";

                _enddt = DateTime.Now;
                TimeSpan ts = _enddt - _startdt;

                ts_value = ts.Seconds.ToString();

                nonwork_insert("END");

                this.Close();
            }
        }

        private void nonwork_insert(string startFlag)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD",  clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",   clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_DATE",    _work_day);
            paramsMap.Add("P_RESOURCE_CD",  clsStatic._RESOURCE_CD);
            paramsMap.Add("P_NON_CLASS_ID", _nowclassid);
            paramsMap.Add("P_NON_WORK_CD",  _nowworkcd);
            paramsMap.Add("P_NON_TYPE",     _nowtype);
            paramsMap.Add("P_INSERTFLAG",   startFlag);
            paramsMap.Add("P_SHIFT_CD",     clsStatic._SHIFT_ID);
            paramsMap.Add("P_CREATE_BY",    clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_nonworkinsert_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "NG")
            {
                frmMessage frm = new frmMessage(dt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }
        }

        private void timerNonProd_Tick(object sender, EventArgs e)
        {
            TimeSpan ts = TimeSpan.FromSeconds(_sec++);
            lblTime.Text = ts.Hours.ToString("00") + ":" + ts.Minutes.ToString("00") + ":" + ts.Seconds.ToString("00");

            if(_colorFlag == "R")
            {
                lblTime.BackColor = Color.Yellow;
                lblTime.ForeColor = Color.Red;
                _colorFlag = "Y";
            }
            else
            {
                lblTime.BackColor = Color.Red;
                lblTime.ForeColor = Color.Yellow;
                _colorFlag = "R";
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("비가동이 진행중입니다. 화면을 닫으시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                this.Close();
            }
        }
    }
}
