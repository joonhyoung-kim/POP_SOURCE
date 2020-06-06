﻿using SmartMom_Lib;
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

        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();


        public frmBadProductInsert(string po, string badlotqty, string badcode = "")
        {
            InitializeComponent();

            _po = po;
            _badlotqty = badlotqty;

            lblTitle.Text = "불량 실적 등록";
            txtBadCode.Text = badcode;
        }

        public frmBadProductInsert(string title, string sn, string ct, string flag, string macAddress, string gtType, string ctType, DataTable gt_DesignDt, DataTable ct_DesignDt, DataSet BasicDs)
        {
            InitializeComponent();

            lblTitle.Text = title;

            _flag = flag;
            if (flag == "SN")
            {
                txtBadCode.Text = sn;
            }
            else
            {
                txtBadCode.Text = ct;
            }

            _macAddress = macAddress;
            _gt_DesignDt = gt_DesignDt;
            _ct_DesignDt = ct_DesignDt;
            _BasicDs = BasicDs;

            _gtType = gtType;
            _ctType = ctType;

            if (flag == "CT")
            {
                clsLabelSet.label_print(_macAddress, clsStatic._PRINTID, "", "", txtBadCode.Text.Trim(), "", "Reprint", ref _BasicDs);
                btnClose_Click(null, null);
                return;
            }

            txtBadCode.Focus();
            txtBadCode.SelectAll();
            
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                /*
                else if (_flag == "SN")
                {
                    clsLabelSet.label_print(_macAddress, clsStatic._PRINTID, "", txtBadCode.Text.Trim(), "", "", "Reprint", ref _BasicDs);
                }
                else if (_flag == "CT")
                {
                    clsLabelSet.label_print(_macAddress, clsStatic._PRINTID, "", "", txtBadCode.Text.Trim(), "", "Reprint", ref _BasicDs);
                }
                */
            }
        }

        private void bad_insert(string badCode, string badQty)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_division_cd",    clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd",     clsStatic._COMPANY_CD);
            paramsMap.Add("p_serialnumber", "");
            paramsMap.Add("p_scode", "K");
            paramsMap.Add("p_ccode", "HA");
            paramsMap.Add("p_work_order_id",  _po);
            paramsMap.Add("p_wo_state",       "R");
            paramsMap.Add("p_shift_cd",       "DAY");
            paramsMap.Add("p_work_person",    clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty",       "0");
            paramsMap.Add("p_bad_qty",        badQty);
            paramsMap.Add("p_description",    "POP 불량 실적");
            paramsMap.Add("p_close_flag",     "N");
            paramsMap.Add("p_badcode",        badCode);
            paramsMap.Add("p_update_by",      clsStatic._USER_ID);
            paramsMap.Add("p_label_id",       "");
            paramsMap.Add("p_ip_address", clsStatic._CTPRINT);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if(dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                clsStatic._dialogValue = "OK";
                this.Close();
            }
            else
            {
                frmMessage frm = new frmMessage(dt.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                frm.ShowDialog();
                txtBadCode.Focus();
                txtBadCode.SelectAll();
            }

        }

        /// <summary>
        /// 확인 클릭
        /// </summary>
        private void btnOK_Click(object sender, EventArgs e)
        {
            if(txtBadCode.Text == "")
            {
                frmMessage frm = new frmMessage("불량코드를 입력해 주십시오.", "AUTOCLOSE");
                frm.ShowDialog();
            }

            if(int.Parse(lblBadQty.Text) < 1)
            {
                frmMessage frm = new frmMessage("불량수량은 0 보다 커야 합니다.", "AUTOCLOSE");
                frm.ShowDialog();
            }


            if (_flag == "BADPRODUCT")
            {
                bad_insert(txtBadCode.Text, lblBadQty.Text);
            }
        }

        /// <summary>
        /// 불량수량 변경
        /// </summary>
        private void lblBadQty_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(lblBadQty.Text);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblBadQty.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }
    }
}
