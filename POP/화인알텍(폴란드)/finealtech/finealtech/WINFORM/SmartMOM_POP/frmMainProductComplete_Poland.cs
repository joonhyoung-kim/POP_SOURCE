using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Diagnostics;
using System.Runtime.InteropServices;


namespace SmartMOM_POP
{
    public partial class frmMainProductComplete_Poland : Form
    {
        string _lotType = "";
        bool _search_open_flag = false;
        string _gtType = "";
        string _ctType = "";
        int _gtQty = 0;
        int _ctQty = 0;
        string _palletType = "";
        string _labelspec = "";
        string _labeldesc = "";
        string _work_day = "";
        string _start_time = "";
        string _gridFlag = "grdPackList";
        string _ctLabeltype = "";
        string _wostate = "";

        DataTable _gt_DesignDt = new DataTable();
        DataTable _ct_DesignDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        DataTable _woDt = new DataTable();

        public frmMainProductComplete_Poland()
        {
            InitializeComponent();

            grdPackList.Dock = DockStyle.Fill;
            grdAllList.Dock = DockStyle.Fill;
            grdBad.Dock = DockStyle.Fill;

            grdAllList.Visible = false;
            grdBad.Visible = false;

            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);

            initLabel();
            InitPackList();
            InitAllList();
            InitGanbanList();
            InitBADList();

            lblUser.Text = clsStatic._USER_NAME;
            btnWorkType.Text = clsStatic._INPUTTYE;

            clsStatic.Hotkey_Register(this);

            now_nonwork_load("INIT");
        }

        private void now_nonwork_load(string initFlag)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_nonwork.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if(dt.Rows.Count > 0)
            {
                string workdate = dt.Rows[0]["WORKDATE"].ToString();
                string nonclassid = dt.Rows[0]["NONCLASSID"].ToString();
                string nonwolrkcd = dt.Rows[0]["NONWORKCD"].ToString();
                string nontype = dt.Rows[0]["NONTYPE"].ToString();
                string nontypename = dt.Rows[0]["NONTYPENAME"].ToString();
                string losstime = dt.Rows[0]["LOSSTIME"].ToString();

                frmNonProdTime frm = new frmNonProdTime(nontypename, workdate, nonclassid, nonwolrkcd, nontype, losstime);
                frm.ShowDialog();
            }
            else if(initFlag != "INIT")
            {
                if (_work_day == "")
                {
                    today_info_load();
                    result_info_load();
                }

                frmNonProd frm = new frmNonProd(_work_day);
                frm.ShowDialog();
            }

        }

        private void today_info_load()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_getstarttime_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            DateTime sysDate;
            DateTime startDate;
            DateTime endDate;
            for (int i=0;i<dt.Rows.Count;i++)
            {
                sysDate = DateTime.Parse(dt.Rows[i]["NOWDATE"].ToString());
                startDate = DateTime.Parse(dt.Rows[i]["STARTTIME"].ToString());
                endDate = DateTime.Parse(dt.Rows[i]["ENDTIME"].ToString());

                if(sysDate >= startDate && sysDate < endDate)
                {
                    _work_day   = dt.Rows[i]["APPLYDATE"].ToString();
                    _start_time = dt.Rows[i]["STARTTIME"].ToString();
                    clsStatic._SHIFT_ID = dt.Rows[i]["SHIFTCD"].ToString();
                    break;
                }

                // 시간구간내 존재하지 않을 경우 강제로 해당 일자 정보 삽입
                if(i == dt.Rows.Count - 1)
                {
                    _work_day   = dt.Rows[i]["APPLYDATE"].ToString();
                    _start_time = dt.Rows[i]["STARTTIME"].ToString();
                    clsStatic._SHIFT_ID = dt.Rows[i]["SHIFTCD"].ToString();
                }
            }
        }

        private void result_info_load()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("RESOURCE_CD", clsStatic._RESOURCE_CD);
            paramsMap.Add("WORK_DAY", _work_day);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_getresultendtime_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if(dt.Rows[0]["WORKDAY"].ToString() != "NODATA")
            {
                _work_day = dt.Rows[0]["WORKDAY"].ToString();
            }
            if (dt.Rows[0]["STARTTIME"].ToString() != "NODATA")
            {
                _start_time = dt.Rows[0]["STARTTIME"].ToString();
            }
        }

        private void frmMainProductComplete_Poland_FormClosing(object sender, FormClosingEventArgs e)
        {
            clsStatic.Hotkey_Register(this);
        }


        const int WM_HOTKEY = 0x0312;
        protected override void WndProc(ref Message message)
        {
            switch (message.Msg)
            {
                case WM_HOTKEY:
                    Keys key = (Keys)(((int)message.LParam >> 16) & 0xFFFF);
                    //KeyModifiers modifier = (KeyModifiers)((int)message.LParam & 0xFFFF);
                    //MessageBox.Show("HotKey Pressed :" + modifier.ToString() + " " + key.ToString());

                    if(Keys.F1 == key)
                    {
                        lblRot_Click(null, null);
                    }
                    else if (Keys.F2 == key)
                    {
                        btnNonProd_Click(null, null);
                    }
                    else if (Keys.F6 == key)
                    {
                        button_po_search();
                    }
                    else if (Keys.F7 == key)
                    {
                        clsStatic._dialogValue = "";
                        clsStatic.UnHotkey_Register(this);
                        frmLoginIDInsert frm = new frmLoginIDInsert(lblMakelotqty.Text);
                        frm.ShowDialog();
                        clsStatic.Hotkey_Register(this);
                        if (clsStatic._dialogValue != "")
                        {
                            lblMakelotqty.Text = clsStatic._dialogValue;

                            clsStatic._dialogValue = "";
                        }
                    }
                    else if (Keys.F8 == key)
                    {
                    }
                    else if (Keys.F12 == key)
                    {
                        txtSN_Focus();
                    }
                    break;
            }
            base.WndProc(ref message);
        }


        private void initLabel()
        {

        }

        private void InitPackList()
        {
            //                                    0         1                   2      
            string[] headerText = new string[] {  "GANBAN", "SN",                "QTY"     }; // 3
            string[] columnName = new string[] {  "CT",     "WORKORDERRESULTID", "GOODQTY" };
            string[] columnType = new string[] {  "T",     "T",                 "T"        };

            int[] columnWidth    = new int[]   {  200,     300,                 100        };
            bool[] columnVisible = new bool[]  {  true,    true,                true       };
            bool[] columnDisable = new bool[]  {  true,    true,                true       };
            string[] cellAlign = new string[]  {  "C",     "C",                 "C"        };

            grdPackList.SetBorderAndGridlineStyles();
            grdPackList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdPackList.DefaultCellStyle.Font = new Font("맑은고딕", 14, FontStyle.Bold);
            grdPackList.RowTemplate.Height = 40;
            grdPackList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 12F, FontStyle.Bold);
            grdPackList.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdPackList.BackgroundColor = Color.Black;
            grdPackList.RowsDefaultCellStyle.BackColor = Color.Black;
            grdPackList.RowsDefaultCellStyle.ForeColor = Color.White;
        }

        private void InitAllList()
        {
            //                                    0         1                   2      
            string[] headerText = new string[] {  "GANBAN", "SN",                "QTY"     }; // 3
            string[] columnName = new string[] {  "CT",     "WORKORDERRESULTID", "GOODQTY" };
            string[] columnType = new string[] {  "T",     "T",                 "T"        };

            int[] columnWidth    = new int[]   {  200,     300,                 100        };
            bool[] columnVisible = new bool[]  {  true,    true,                true       };
            bool[] columnDisable = new bool[]  {  true,    true,                true       };
            string[] cellAlign = new string[]  {  "C",     "C",                 "C"        };

            grdAllList.SetBorderAndGridlineStyles();
            grdAllList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdAllList.DefaultCellStyle.Font = new Font("맑은고딕", 14, FontStyle.Bold);
            grdAllList.RowTemplate.Height = 40;
            grdAllList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 12F, FontStyle.Bold);
            grdAllList.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdAllList.BackgroundColor = Color.Black;
            grdAllList.RowsDefaultCellStyle.BackColor = Color.Black;
            grdAllList.RowsDefaultCellStyle.ForeColor = Color.White;
        }


        private void InitGanbanList()
        {
            //                                    0          1      2      
            string[] headerText = new string[] {  "GANBAN",  "QTY", "Available QTY"   }; // 3
            string[] columnName = new string[] {  "GANBANID","QTY", "INSQTY"          };
            string[] columnType = new string[] {  "T",       "T",    "T"              };
                                                                                    
            int[] columnWidth    = new int[]   {  250,       150,    150              };
            bool[] columnVisible = new bool[]  {  true,      true,   true             };
            bool[] columnDisable = new bool[]  {  true,      true,   true             };
            string[] cellAlign = new string[]  {  "C",       "C",    "C"              };

            grdGanbanList.SetBorderAndGridlineStyles();
            grdGanbanList.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanbanList.DefaultCellStyle.Font = new Font("맑은고딕", 14, FontStyle.Bold);
            grdGanbanList.RowTemplate.Height = 40;
            grdGanbanList.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 12F, FontStyle.Bold);
            grdGanbanList.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdGanbanList.BackgroundColor = Color.Black;
            grdGanbanList.RowsDefaultCellStyle.BackColor = Color.Black;
            grdGanbanList.RowsDefaultCellStyle.ForeColor = Color.White;
        }

        private void InitBADList()
        {
            //                                   0                   1      
            string[] headerText = new string[] { "SN",                "QTY"     }; //2
            string[] columnName = new string[] { "WORKORDERRESULTID", "BADQTY"  };
            string[] columnType = new string[] {  "T",                "T"       };

            int[] columnWidth    = new int[]   {  300,                150       };
            bool[] columnVisible = new bool[]  {  true,               true      };
            bool[] columnDisable = new bool[]  {  true,               true      };
            string[] cellAlign = new string[]  { "C",                 "C"       };

            grdBad.SetBorderAndGridlineStyles();
            grdBad.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdBad.DefaultCellStyle.Font = new Font("맑은고딕", 14, FontStyle.Bold);
            grdBad.RowTemplate.Height = 40;
            grdBad.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 12F, FontStyle.Bold);
            grdBad.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
            grdBad.BackgroundColor = Color.Black;
            grdBad.RowsDefaultCellStyle.BackColor = Color.Black;
            grdBad.RowsDefaultCellStyle.ForeColor = Color.White;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void btnPerson_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(clsStatic._PERSONCOUNT);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                clsStatic._PERSONCOUNT = clsStatic._dialogValue;

                btnPerson.Text = "Person(" + clsStatic._PERSONCOUNT + ")";

                clsStatic._dialogValue = "";
            }
        }

        private void lblMakelotqty_Click(object sender, EventArgs e)
        {

        }

        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Chartreuse;
            }
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        private void btnPoSearch_Click(object sender, EventArgs e)
        {
            button_po_search();
        }

        private void button_po_search()
        {

            string tmpWorkorderid = clsStatic._WORK_ORDER_ID;
            clsStatic._WORK_ORDER_ID = "";

            _search_open_flag = true;

            clsStatic.UnHotkey_Register(this);
            frmPOSearch frm = new frmPOSearch("ALL");
            frm.ShowDialog();
            clsStatic.Hotkey_Register(this);

            _search_open_flag = false;


            if (clsStatic._WORK_ORDER_ID != "")
            {
                wo_search("OK");
            }
            else
            {
                clsStatic._WORK_ORDER_ID = tmpWorkorderid;
            }

            txtSN_Focus();
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }

        private int gtCount()
        {
            int retbuf = 0;
            for (int i = 0; i < grdPackList.Rows.Count; i++)
            {
                int qty = int.Parse(grdPackList.Rows[i].Cells["QTY"].Value.ToString());

                retbuf += qty;
            }

            return retbuf;
        }

        private void btnLEDLot_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmLEDLot frm = new frmLEDLot();
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                btnLEDLot.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        

        private void btnBadQty_Click(object sender, EventArgs e)
        {
            if (btnPoSearch.Text == "Select")
            {
                toMessage("작업지시를 먼저 선택하여 주세요!");
                txtSN_Focus();
                return;
            }

            button_badqty();
        }

        private void button_badqty()
        {
            if(_wostate != "R")
            {
                frmWOMessage frm1 = new frmWOMessage("작업지시가 완료되어 불량등록이 불가능합니다.", 2);
                frm1.ShowDialog();
                return;
            }

            if (_work_day == "")
            {
                today_info_load();
                result_info_load();
            }

            clsStatic._dialogValue = "";
            frmBadProductInsert frm = new frmBadProductInsert(btnPoSearch.Text, "1", clsStatic._SHIFT_ID, _work_day, _start_time, "", "");
            frm.ShowDialog();

            if (clsStatic._dialogValue == "OK")
            {
                wo_search("NO");
            }
        }

        private void btnRePrint_Click(object sender, EventArgs e)
        {
            if (grdAllList.Rows.Count > 0)
            {
                string ct = grdGanbanList.Rows[0].Cells["GANBANID"].Value.ToString();
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", ct, "", "Reprint", ref _BasicDs);
            }
        }

        private void lblDestination_Click(object sender, EventArgs e)
        {
            clsStatic._resouceType = "DESTINATION";
            clsStatic._dialogValue = "";
            frmCommonSelect frm = new frmCommonSelect("향지");
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblDestination.Text = clsStatic._dialogValue;
                clsStatic._dialogValue = "";
            }
        }

        private string sntowo()
        {
            string retbuf = "OK";
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD",  clsStatic._COMPANY_CD);
            paramsMap1.Add("SN",          txtSN.Text.Trim());
            
            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_sntowo_list.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            string wo = dt.Rows[0]["WORKORDERID"].ToString();
            string itemid = dt.Rows[0]["ITEMID"].ToString();
            string wostate = dt.Rows[0]["WOSTATE"].ToString();
            if (lblItem.Text == "")
            {
                if (wo != btnPoSearch.Text && wo != "NODATA")
                {
                    clsStatic._WORK_ORDER_ID = dt.Rows[0]["WORKORDERID"].ToString();
                    wo_search("OK");
                }
                return retbuf;
            }

            if(wo == "NODATA")
            {
                frmWOMessage frm = new frmWOMessage("정확한 라벨을 스캔하여 주세요.", 2);
                frm.ShowDialog();
                retbuf = "NG";
                txtSN.Text = "";
                txtSN_Focus();
            }
            else if (btnPoSearch.Text != wo && lblItem.Text == itemid)
            {
                if(_wostate != "T")
                {
                    frmWOMessage frm = new frmWOMessage("해당 작업지시를 완료 시킨 후 작업을 진행하세요!", 10);
                    frm.ShowDialog();
                    retbuf = "NG";
                    txtSN.Text = "";
                    txtSN_Focus();
                    //clsStatic._dialogValue = "";
                    //frmWOMessage frm = new frmWOMessage("작업지시 번호가 변경 되었습니다. 기존 작업지시 상태를 변경하겠습니까?", "", "Complete", "Halt", "Close", "T", "H", "");
                    //frm.ShowDialog();

                    //if (clsStatic._dialogValue != "")
                    //{
                    //    List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                    //    Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                    //    paramsMap.Add("p_err_code", "");
                    //    paramsMap.Add("p_err_msg", "");
                    //    paramsMap.Add("p_runCount", "");
                    //    paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                    //    paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                    //    paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
                    //    paramsMap.Add("P_NOWSTATE", clsStatic._dialogValue);
                    //    paramsMap.Add("P_PRESTATE", _wostate);
                    //    paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                    //    paramsList.Add(paramsMap);

                    //    retvalue = "";

                    //    DataTable haltDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                    //    if (haltDt.Rows[0]["p_err_code"].ToString() == "NG")
                    //    {
                    //        frmWOMessage frm1 = new frmWOMessage(dt.Rows[0]["p_err_msg"].ToString(), 10);
                    //        frm1.ShowDialog();
                    //        retbuf = "NG";
                    //    }
                    //    else
                    //    {
                    //        clsStatic._WORK_ORDER_ID = dt.Rows[0]["WORKORDERID"].ToString();
                    //        wo_search("OK");
                    //    }
                    //}
                    //else
                    //{
                    //    retbuf = "NG";
                    //}
                }
                else
                {
                    clsStatic._WORK_ORDER_ID = wo;
                    wo_search("OK");
                }
            }
            else if (btnPoSearch.Text != dt.Rows[0]["WORKORDERID"].ToString() && lblItem.Text != dt.Rows[0]["ITEMID"].ToString())
            {
                frmWOMessage frm = new frmWOMessage("해당 작업지시를 완료 시킨 후 작업을 진행하세요!", 10);
                frm.ShowDialog();
                retbuf = "NG";
                txtSN.Text = "";
                txtSN_Focus();
            }
            return retbuf;
        }

        private DataRow[] getbadnoncode(string value)
        {
            DataRow[] retbuf = null;
            DataRow[] drs = clsStatic._badnonDt.Select("CODEID = '" +value + "'");

            if(drs.Length > 0)
            {
                if (drs[0]["CODETYPE"].ToString().Trim() == "BADCODE" && btnPoSearch.Text == "Select")
                {
                    frmWOMessage frm = new frmWOMessage("스캔한 내용은 불량코드입니다! 작업지시를 먼저 선택하여 주세요!", 0);
                    frm.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return null;
                }

                retbuf = drs;
            }

            return retbuf;
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if(txtSN.Text.Trim() == "")
                {
                    return;
                }

                DataRow[] drs = getbadnoncode(txtSN.Text);

                if(drs != null)
                {
                    string codetype = drs[0]["CODETYPE"].ToString();
                    string codeid = drs[0]["CODEID"].ToString();
                    string codename = drs[0]["CODENAME"].ToString();

                    if (_work_day == "")
                    {
                        today_info_load();
                        result_info_load();
                    }

                    if (codetype == "NONWORK")
                    {
                        string nontype = codeid;
                        string nowclassid = drs[0]["NONCLASSID"].ToString();
                        string nowworkcd = drs[0]["NONWORKCD"].ToString();

                        frmNonProdTime frm = new frmNonProdTime(codename, _work_day, nowclassid, nowworkcd, nontype, "START");
                        frm.ShowDialog();
                        return;
                    }
                    else if (codetype == "BADCODE")
                    {
                        frmBadProductInsert frm = new frmBadProductInsert(btnPoSearch.Text, "1", clsStatic._SHIFT_ID, _work_day, _start_time, codeid, codename);
                        frm.ShowDialog();
                        return;
                    }
                }

                if(txtSN.Text.Trim().Length < 8)
                {
                    frmWOMessage frm = new frmWOMessage("존재하지 않는 ID라벨입니다.", 2);
                    frm.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }
                
                string processflag = sntowo();

                if(processflag != "OK")
                {
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (txtSN.Text.Trim().Length == 8)
                {
                    if (txtSN.Text.Trim().Substring(0, 1) == "C" && btnWorkType.Text == "Ganban Scan")
                    {
                        List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                        Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                        paramsMap.Add("p_err_code", "");
                        paramsMap.Add("p_err_msg", "");
                        paramsMap.Add("p_runCount", "");
                        paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
                        paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
                        paramsMap.Add("P_SN", txtSN.Text.Trim());
                        paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

                        paramsList.Add(paramsMap);

                        string retvalue = "";

                        DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ctmapping_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

                        if (dt.Rows[0]["p_err_code"].ToString() == "NG")
                        {
                            toMessage(dt.Rows[0]["p_err_msg"].ToString());
                            return;
                        }

                        wo_search("OK");
                        txtSN.Text = "";
                        txtSN_Focus();
                    }
                    else
                    {
                        frmWOMessage frm1 = new frmWOMessage("정확한 간반라벨을 스캔하여 주세요.", 2);
                        frm1.ShowDialog();
                        txtSN.Text = "";
                        txtSN_Focus();
                    }
                    return;
                }
                else if (txtSN.Text.Trim().Length != 8 && btnWorkType.Text == "Ganban Scan")
                {
                    frmWOMessage frm1 = new frmWOMessage("정확한 간반라벨을 스캔하여 주세요.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }
                    if (_wostate == "T")
                {
                    frmWOMessage frm1 = new frmWOMessage("작업지시가 완료되어 실적 입력이 불가능 합니다.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (_wostate == "C")
                {
                    frmWOMessage frm1 = new frmWOMessage("작업지시가 취소되어 실적 입력이 불가능 합니다.", 2);
                    frm1.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                if (_wostate != "R" && _wostate != "A" && _wostate != "H")
                {
                    frmWOMessage frm = new frmWOMessage("먼저 작업지시를 Start 하세요!", 5);
                    frm.ShowDialog();
                    txtSN.Text = "";
                    txtSN_Focus();
                    return;
                }

                product_insert(txtSN.Text);
                txtSN.Text = "";
            }
        }

        private void product_insert(string sn)
        {
            int checkplanqty = int.Parse(lblWOPlanQty.Text.Trim());
            int checkprodqty = 0;


            //실적수량 = 양품수량 로직임으로 해당로직 수정
            checkprodqty = int.Parse(lblWOProdQty.Text.Trim());

            //계획 대비 실적수량이 오바되어도 작업지시를 강제로 T 시키기 때문에 계획수량 < 실적수량 일때 로직 삭제
            //2019-07-24   배철한 수석
            //if (checkplanqty <= checkprodqty)
            //{
            //    toMessage("생산이 완료되었습니다!");
            //    txtSN_Focus();
            //    return;
            //}


            string qty = "";

            qty = lblMakelotqty.Text;

            int prodqty = 0;

            //실적수량 = 양품수량 로직임으로 해당로직 수정
            prodqty = int.Parse(lblWOProdQty.Text.Trim());

            int plan_qty = int.Parse(lblWOPlanQty.Text.Replace(",", ""));

            prodqty = plan_qty - prodqty;

            //계획 대비 실적수량이 오바되어도 작업지시를 강제로 T 시키기 때문에 계획수량 < 실적수량 일때 로직 삭제
            //2019-07-24   배철한 수석
            //if (_lotType == "SN" || qty == "99999")
            //{
            //    if (int.Parse(qty) > prodqty)
            //    {
            //        qty = prodqty.ToString();
            //    }
            //}

            if(_work_day == "")
            {
                today_info_load();
                result_info_load();
            }

            string packFlag = "NOPACK";
            //계획 대비 실적수량이 오바되어도 작업지시를 강제로 T 시키기 때문에 계획수량 <= 실적수량 일때 박스 강제 구성 로직 삭제
            //2019-07-24   배철한 수석
            //if (_gtQty + int.Parse(qty) >= _ctQty || int.Parse(lblWOPlanQty.Text.Trim().Replace(",", "")) <= int.Parse(lblWOProdQty.Text.Trim().Replace(",", "")) + 1)
            if (_gtQty + int.Parse(qty) >= _ctQty && btnWorkType.Text != "Online")
            {
                packFlag = "PACK";
            }

            string packlistcount = (grdPackList.RowCount + 1).ToString();

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_enddate", "");
            paramsMap.Add("p_ctprintno", "");
            paramsMap.Add("p_pre_item_id", "");
            paramsMap.Add("p_serialnumber", sn);
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", btnPoSearch.Text);
            paramsMap.Add("p_wo_state", "R");
            paramsMap.Add("p_shift_cd", clsStatic._SHIFT_ID);
            paramsMap.Add("p_work_person", clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty", qty);
            paramsMap.Add("p_bad_qty", "0");
            paramsMap.Add("p_description", "POP 실적");
            paramsMap.Add("p_close_flag", "N");
            paramsMap.Add("p_badcode", "NODATA");
            paramsMap.Add("p_destination", lblDestination.Text.Trim());
            paramsMap.Add("p_update_by", clsStatic._USER_ID);
            paramsMap.Add("p_short_sn", "");
            paramsMap.Add("p_long_sn", "");
            paramsMap.Add("p_work_day", _work_day);
            paramsMap.Add("p_starttime", _start_time);
            paramsMap.Add("p_ctqty", packlistcount);
            paramsMap.Add("p_labeltype", _ctLabeltype);
            paramsMap.Add("p_packflag", packFlag);
            paramsMap.Add("p_ganbanseq", (grdGanbanList.RowCount + 1).ToString());
            paramsMap.Add("p_resource_cd", clsStatic._RESOURCE_CD);
            //paramsMap.Add("p_short_sn", _shortsn);
            //paramsMap.Add("p_long_sn", _longsn);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "S")
            {
                _start_time = dt.Rows[0]["p_enddate"].ToString();

                if(dt.Rows[0]["p_ctprintno"].ToString() != "NODATA")
                {
                    clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", dt.Rows[0]["p_ctprintno"].ToString(), "", "", ref _BasicDs);
                }

                wo_search("NO");

                //if (_gtQty >= _ctQty)
                //{
                //    sn_ct_packing();
                //}
                //else
                //{
                //    string packbuf = lot_ctpacking();

                //    if (packbuf == "NOPACKING")
                //    {
                //        int planqty = int.Parse(lblPlanQty.Text.Trim());

                //        //실적수량 = 양품수량 로직임으로 해당로직 수정
                //        prodqty = int.Parse(lblGoodQty.Text.Trim());

                //    }
                //}
            }
            else
            {
                frmWOMessage frm = new frmWOMessage(dt.Rows[0]["p_err_msg"].ToString(), 20);
                frm.ShowDialog();
                txtSN.Text = "";
                txtSN_Focus();
                return;
            }

        }

        private void btnNonProd_Click(object sender, EventArgs e)
        {
            now_nonwork_load("LOSS");
        }

        private void wo_start()
        {
            string work_order_id = _woDt.Rows[0]["WORKORDERID"].ToString().Trim();

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_serialnumber", "LOTSTART");
            paramsMap.Add("p_division_cd",   clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd",    clsStatic._COMPANY_CD);
            paramsMap.Add("p_work_order_id", work_order_id);
            paramsMap.Add("p_wo_state",      "R");
            paramsMap.Add("p_shift_cd",      "DAY");
            paramsMap.Add("p_work_person",   clsStatic._PERSONCOUNT);
            paramsMap.Add("p_good_qty",      "0");
            paramsMap.Add("p_bad_qty",       "0");
            paramsMap.Add("p_description",   "작업지시 시작");
            paramsMap.Add("p_close_flag",    "N");
            paramsMap.Add("p_badcode",       "NODATA");
            paramsMap.Add("p_update_by", clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";
            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popworesult_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void wo_search(string destinationFlag)
        {
            if (_work_day == "")
            {
                today_info_load();
                result_info_load();
            }
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap1.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap1.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsMap1.Add("PLAN_DATE",     _work_day);


            paramsList1.Add(paramsMap1);

            _gtType = "";
            string retvalue = "";

            _woDt.Dispose();
            _woDt = new DataTable();
            _woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopwo.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if(_woDt == null)
            {
                initLabel();
                return;
            }

            if(_woDt.Rows.Count == 0)
            {
                initLabel();
                return;
            }

            //if(_woDt.Rows[0]["WOSTATE"].ToString().Trim() == "A" && _woDt.Rows[0]["POPINPUTTYPE"].ToString().Trim() == "BUTTON")
            if (_woDt.Rows[0]["WOSTATE"].ToString().Trim() == "A")
            {
                //wo_start();
            }

            _gtType = _woDt.Rows[0]["POPGTLABELID"].ToString();
            _ctType = _woDt.Rows[0]["POPCTLABELID"].ToString();
            _palletType = _woDt.Rows[0]["POPPALLETLABELID"].ToString();

            btnPoSearch.Text       = _woDt.Rows[0]["WORKORDERID"].ToString();
            //lblPlandate.Text       = _woDt.Rows[0]["PLANDATE"].ToString(); 
            lblMakelotqty.Text     = _woDt.Rows[0]["POPMAKELOTQTY"].ToString();
            lblItem.Text           = _woDt.Rows[0]["ITEMID"].ToString();
            lblItemdesc.Text       = _woDt.Rows[0]["ITEMNAME"].ToString();
            lblWOPlanQty.Text      = _woDt.Rows[0]["CONFIRMQTY"].ToString();
            lblWOProdQty.Text      = _woDt.Rows[0]["QTY"].ToString();
            lblWONGQty.Text        = _woDt.Rows[0]["BADQTY"].ToString();
            //txtSN.Text             = "";
            _ctQty                 = int.Parse(_woDt.Rows[0]["POPCTQTY"].ToString());
            btnPerson.Text         = "투입인원(" + clsStatic._PERSONCOUNT + "명)";
            _labeldesc             = _woDt.Rows[0]["LABELDESC"].ToString();
            _labelspec             = _woDt.Rows[0]["LABELSPEC"].ToString();
            if (destinationFlag == "OK")
            {
                lblDestination.Text = _woDt.Rows[0]["DESTINATION"].ToString();
            }
            lblDayPlanQty.Text      = _woDt.Rows[0]["TODAYPLAN"].ToString();
            lblDayProdQty.Text      = _woDt.Rows[0]["TODAYGOODQTY"].ToString();
            lblDayNGQty.Text        = _woDt.Rows[0]["TODAYBADQTY"].ToString();
            _wostate                = _woDt.Rows[0]["WOSTATE"].ToString();

            if(_wostate == "A")
            {
                btnHalt.Text = "Order Stanby";
            }
            else if (_wostate == "H")
            {
                btnHalt.Text = "Order Halt";
            }
            else if (_wostate == "R")
            {
                btnHalt.Text = "Order Running";
            }
            else if (_wostate == "C")
            {
                btnHalt.Text = "Order Cancel";
            }
            else if (_wostate == "T")
            {
                btnHalt.Text = "Order Complete";
            }

            _ctLabeltype              = _woDt.Rows[0]["LABELTYPE"].ToString();
            if(_ctLabeltype == "ROLL")
            {
                string buf = clsStatic._RESOURCE_TEXT + "(" + clsStatic._RESOURCE_CD + ") : " + "OnLine Print";
                if(buf != btnTitle.Text)
                {
                    btnTitle.Text = buf;
                }
                btnWorkType.Text = "Online";
            }
            else
            {
                string buf = clsStatic._RESOURCE_TEXT + "(" + clsStatic._RESOURCE_CD + ")";
                if (buf != btnTitle.Text)
                {
                    btnTitle.Text = buf;
                }
            }

            _lotType = _woDt.Rows[0]["POPINPUTTYPE"].ToString();
            if (_lotType == "BUTTON")
            {
                txtSN.Enabled = false;
                txtSN.BackColor = Color.LightGray;
                //btnLabelPrint.Text = "Button";
            }
            else
            {
                txtSN.Enabled = true;
                txtSN.BackColor = Color.Yellow;
                //btnLabelPrint.Text = "Barcode";
            }

            List<Dictionary<string, object>> paramsList2 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap2 = new Dictionary<string, object>();
            paramsMap2.Add("p_err_code", "");
            paramsMap2.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap2.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap2.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap2.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsMap2.Add("CT",            "NODATA");
            paramsList2.Add(paramsMap2);
            DataTable packDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopgt_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdPackList.DataBindDataSource(packDt, false, false);

            List<Dictionary<string, object>> paramsList3 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap3 = new Dictionary<string, object>();
            paramsMap3.Add("p_err_code", "");
            paramsMap3.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap3.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap3.Add("RESOURCE_CD",   clsStatic._RESOURCE_CD);
            paramsMap3.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsMap3.Add("CT",            "");
            paramsList3.Add(paramsMap3);
            DataTable allDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopgt_list.dummy", paramsList3, clsStatic._serviceSelectURL, ref retvalue);
            grdAllList.DataBindDataSource(allDt, false, false);

            List<Dictionary<string, object>> paramsList4 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap4 = new Dictionary<string, object>();
            paramsMap4.Add("p_err_code", "");
            paramsMap4.Add("DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap4.Add("COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap4.Add("WORK_ORDER_ID", clsStatic._WORK_ORDER_ID);
            paramsList4.Add(paramsMap4);
            DataTable ganbanDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_polandpopganban_list.dummy", paramsList4, clsStatic._serviceSelectURL, ref retvalue);
            grdGanbanList.DataBindDataSource(ganbanDt, false, false);

            int ganbanSum = 0;
            for(int i=0;i<ganbanDt.Rows.Count;i++)
            {
                ganbanSum += int.Parse(ganbanDt.Rows[i]["QTY"].ToString().Trim());
            }
            lblGanbanQty.Text = String.Format("{0:#,##0}", ganbanSum);

            DataTable badDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popbadprod_list.dummy", paramsList2, clsStatic._serviceSelectURL, ref retvalue);
            grdBad.DataBindDataSource(badDt, false, false);

            _gtQty = gtCount();
            if (_ctQty == 0)
            {
                lblBoxCount.Text = _gtQty.ToString() + " EA";
            }
            else
            {
                lblBoxCount.Text = _gtQty.ToString() + " / " + _ctQty.ToString();
            }
        }

        private void lblRot_Click(object sender, EventArgs e)
        {
            if (_gridFlag == "grdPackList")
            {
                grdPackList.Visible = false;
                grdAllList.Visible = true;
                grdBad.Visible = false;
                _gridFlag = "grdAllList";
                lblPackTitle.Text = "All Packing List";
            }
            else if (_gridFlag == "grdAllList")
            {
                grdPackList.Visible = false;
                grdAllList.Visible = false;
                grdBad.Visible = true;
                _gridFlag = "grdBadList";
                lblPackTitle.Text = "NG List";
            }
            else if (_gridFlag == "grdBadList")
            {
                grdPackList.Visible = true;
                grdAllList.Visible = false;
                grdBad.Visible = false;
                _gridFlag = "grdPackList";
                lblPackTitle.Text = "Packing List";
            }
        }

        private void btnTitle_Click(object sender, EventArgs e)
        {
            wo_search("NO");
            txtSN_Focus();
        }

        private void toMessage(string message)
        {
            lblMessage.Text = message;
            timerMessage.Enabled = true;
        }

        private void timerMessage_Tick(object sender, EventArgs e)
        {
            timerMessage.Enabled = false;
            lblMessage.Text = "";
        }

        private void btnWorkType_Click(object sender, EventArgs e)
        {

        }

        private void btnHalt_Click(object sender, EventArgs e)
        {
            string packFlag = "NOPACK";
            clsStatic._dialogValue = "";
            frmWOMessage frm = new frmWOMessage("작업지시 상태를 변경하겠습니까?", "", "Complete", "Halt", "Close", "T", "H", "");
            frm.ShowDialog();

            if(clsStatic._dialogValue == "")
            {
                return;
            }

            if (clsStatic._dialogValue == "T")
            {
                string flag = "";

                for(int i=0;i<grdPackList.RowCount;i++)
                {
                    string tmpbuf = grdPackList.Rows[i].Cells["GANBAN"].Value.ToString();
                    if(tmpbuf=="NODATA")
                    {
                        frmWOMessage frm1 = new frmWOMessage("간반이 구성되지 않은 제품이 존재합니다.", 2);
                        frm1.ShowDialog();
                        return;
                    }
                }
            }

            if (btnWorkType.Text == "Online")
            {
                if (clsStatic._dialogValue == "T")
                {
                    if (_gtQty > 0)
                    {
                        packFlag = "PACK";
                    }
                }
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ctnumber", "");
            paramsMap.Add("P_DIVISION_CD",   clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD",    clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
            paramsMap.Add("P_NOWSTATE",      clsStatic._dialogValue);
            paramsMap.Add("P_PRESTATE",      _wostate);
            paramsMap.Add("P_PACKFLAG",      packFlag);
            paramsMap.Add("P_ITEM_ID",       lblItem.Text);
            paramsMap.Add("P_GANBANQTY",     _gtQty.ToString());
            paramsMap.Add("P_GANBANSEQ",     (grdGanbanList.RowCount +1 ).ToString());
            paramsMap.Add("P_CREATE_BY",     clsStatic._USER_ID);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_polandpopwoupdate_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "NG")
            {
                toMessage(dt.Rows[0]["p_err_msg"].ToString());
                return;
            }

            if (dt.Rows[0]["p_ctnumber"].ToString() != "NODATA")
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", dt.Rows[0]["p_ctnumber"].ToString(), "", "", ref _BasicDs);
            }

            wo_search("OK");
            clsStatic._dialogValue = "";
            txtSN_Focus();
        }

         private void sn_ct_packing()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ct", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_WORK_ORDER_ID", btnPoSearch.Text);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);



            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_popctpacking_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (dt.Rows[0]["p_err_code"].ToString() == "OK")
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", dt.Rows[0]["p_ct"].ToString(), "", "", ref _BasicDs);
            }
            wo_search("NO");

        }

        private void init_process()
        {
            btnPoSearch.Text = "Select";
            lblItem.Text = "";
            lblItemdesc.Text = "";
            lblDayPlanQty.Text = "0";
            lblDayProdQty.Text = "0";
            lblDayNGQty.Text = "0";
            lblWOPlanQty.Text = "0";
            lblWOProdQty.Text = "0";
            lblWONGQty.Text = "0";
            txtSN.Text = "";
            lblBoxCount.Text = "";
            lblGanbanQty.Text = "";
            grdPackList.RemoveAll();
            grdAllList.RemoveAll();
            grdBad.RemoveAll();
            grdGanbanList.RemoveAll();
        }

        private void btnInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("화면을 초기화 하겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init_process();
            }
        }
    }
}
