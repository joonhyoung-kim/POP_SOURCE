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
    public partial class frmBadProductInsert : Form
    {
        string _po = "";
        string _badlotqty = "0";
        string _flag = "BADPRODUCT";
        string _macAddress = "";
        string _gtType = "";
        string _ctType = "";
        string _shift_id = "";
        string _work_day = "";
        string _start_time = "";

        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();


        public frmBadProductInsert(string po, string badlotqty, string shift_id, string work_day, string start_time, string badcode, string badname)
        {
            InitializeComponent();

            _po = po;
            _badlotqty = badlotqty;
            _shift_id  = shift_id;
            _work_day = work_day;
            _start_time = start_time;

            lblTitle.Text = "불량 실적 등록";

            if (badcode != "")
            {
                frmWOMessage frm = new frmWOMessage(badname, 2);
                frm.ShowDialog();

                txtSN.Text = badcode;
                bad_process();
            }
        }

        public frmBadProductInsert(string title, string sn, string ct, string flag, string macAddress, string gtType, string ctType, DataTable gt_DesignDt, DataTable ct_DesignDt, DataSet BasicDs)
        {
            InitializeComponent();

            lblTitle.Text = title;

            _flag = flag;
            if (flag == "SN")
            {
                txtSN.Text = sn;
            }
            else
            {
                txtSN.Text = ct;
            }

            _macAddress = macAddress;
            _gt_DesignDt = gt_DesignDt;
            _ct_DesignDt = ct_DesignDt;
            _BasicDs = BasicDs;

            _gtType = gtType;
            _ctType = ctType;

            if (flag == "CT")
            {
                clsLabelSet.label_print(_macAddress, clsStatic._PRINTID, "", "", txtSN.Text.Trim(), "", "Reprint", ref _BasicDs);
                btnClose_Click(null, null);
                return;
            }

            txtSN.Focus();
            txtSN.SelectAll();
            
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                bad_process();
            }
        }

        private void bad_process()
        {
            if (_flag == "BADPRODUCT")
            {
                bad_insert(txtSN.Text);
            }
            else if (_flag == "SN")
            {
                clsLabelSet.label_print(_macAddress, clsStatic._PRINTID, "", txtSN.Text.Trim(), "", "", "Reprint", ref _BasicDs);
            }
            else if (_flag == "CT")
            {
                clsLabelSet.label_print(_macAddress, clsStatic._PRINTID, "", "", txtSN.Text.Trim(), "", "Reprint", ref _BasicDs);
            }
        }

        public void bad_insert(string sn)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_enddate", "");
            paramsMap.Add("p_ctprintno", "");
            paramsMap.Add("p_serialnumber", "BADCODE");
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", _po);
            paramsMap.Add("p_wo_state", "R");
            paramsMap.Add("p_shift_cd", _shift_id);
            paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty", "0");
            paramsMap.Add("p_bad_qty", _badlotqty);
            paramsMap.Add("p_description", "POP 불량 실적");
            paramsMap.Add("p_close_flag", "N");
            paramsMap.Add("p_badcode", sn);
            paramsMap.Add("p_destination", "");
            paramsMap.Add("p_update_by", clsStatic._USER_ID);
            paramsMap.Add("p_short_sn", "");
            paramsMap.Add("p_long_sn", "");
            paramsMap.Add("p_work_day", _work_day);
            paramsMap.Add("p_starttime", _start_time);
            paramsMap.Add("p_ctqty", "0");
            paramsMap.Add("p_labeltype", "SN");
            paramsMap.Add("p_packflag", "");
            paramsMap.Add("p_ganbanseq", "0");
            paramsMap.Add("p_resource_cd", clsStatic._RESOURCE_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if(dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                clsStatic._dialogValue = "OK";
                this.Close();
            }
            else
            {
                frmMessage frm = new frmMessage(dt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm.ShowDialog();
                txtSN.Focus();
                txtSN.SelectAll();
            }

        }
    }
}
