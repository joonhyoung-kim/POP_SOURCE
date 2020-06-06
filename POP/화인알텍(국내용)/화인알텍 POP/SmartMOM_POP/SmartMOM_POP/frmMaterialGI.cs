using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmMaterialGI : Form
    {
        DataTable _moveDt = new DataTable();
        DataTable _departureDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataTable _poDt = new DataTable();
        DataTable _woDt = new DataTable();

        public frmMaterialGI()
        {
            InitializeComponent();

            lblFromStock.Text = clsStatic._FROMLINE_DESC + "(" + clsStatic._FROMLINE + ")";
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
            lblNowdate.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            InitGridList();
        }

        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
            _scanDt.Columns.Add("TOLINE");
        }

        private void InitGridList()
        {
            //                                   0            1         2           3                4              5                6              8            7            9              10              11               12                 13                 14                   15          15             15                  15                15                   16                
            string[] headerText = new string[] { "불출상태",  "품목",   "품명",     "규격",          "현재고",      "계획수량",      "요청수량",    "잔량",      "스캔수량",  "요청일",      "구분",         "요청창고ID",    "요청창고",        "요청유형",        "불출요청번호",      "Market",   "WORK_ORDER",  "OUTSOURCINGFLAG",  "단위",           "단위수량",          "환종"         }; 
            string[] columnName = new string[] { "STATENAME", "ITEMID", "ITEMNAME", "SPECIFICATION", "CURRENTQTY",  "CONFIRMQTY",    "REQUESTQTY",  "REMAINQTY", "SCANQTY",   "REQUESTDATE", "ITEMTYPENAME", "OUTLOCATIONCD", "OUTLOCATIONNAME", "REQUESTTYPENAME", "MATERIALREQUESTID", "MARKETCD", "WORKORDERID", "OUTSOURCINGFLAG",  "CONVERSIONUNIT", "CONVERSIONUNITQTY", "CURRENCYCD"   };
            string[] columnType = new string[] { "T",         "T",      "T",        "T",             "T",           "T",             "T",           "T",          "T",        "T",           "T",            "T",             "T",                "T",              "T",                  "T",        "T",          "T",                "T",              "T",                 "T"           };
                                                                                                                                                                                                                                                                                                                                                                                           
            int[] columnWidth    = new int[]   { 110,          195,      270,        270,            130,           130,             130,           130,         130,          160,           80,             270,             270,              140,               250,                  250,        250,          250,                250,              250,                 250           };
            bool[] columnVisible = new bool[]  { true,         true,     true,       true,           true,          true,            true,          true,        true,         true,          true,           true,            true,             true,              true,                 true,       true,         true,               true,             true,                true          };
            bool[] columnDisable = new bool[]  { true,         true,     true,       true,           true,          true,            true,          true,        true,         true,          true,           true,            true,             true,              true,                 true,       true,         true,               true,             true,                true          };
            string[] cellAlign = new string[]  { "C",         "L",      "L",         "L",            "R",           "R",             "R",           "R",         "R",         "C",            "C",            "L",             "L",              "R",               "C",                  "C",        "C",          "C",                "C",              "C",                 "C"           };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if(txtSN.Text.Trim() == "")
                {
                    return;
                }
                else
                {
                    add_Ganban();
                }
                txtSN_Focus();
            }
        }

        private void add_Ganban()
        {
            string ganban = "";
            ganban = txtSN.Text.Trim();

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("WORK_ORDER_ID", "");
            paramsMap1.Add("PALLETID", "");
            paramsMap1.Add("CT", "");
            paramsMap1.Add("GANBAN_ID", ganban);
            paramsMap1.Add("DEPARTURE_GROUP_ID", "");
            paramsMap1.Add("dateFlag", "");
            paramsMap1.Add("USE_YN", "Y");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                frmMessage frm1 = new frmMessage("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if(drs.Length > 0)
            {
                frmMessage frm1 = new frmMessage("이미 입력한 간판라벨입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string toline = "";
            int scanQty = 0;
            string scanDtInsertFlag = "NO";


            for (int i=0;i<grdMain.Rows.Count;i++)
            {
                string grid_itemId = grdMain["품목", i].Value.ToString();

                if(grid_itemId == ganBodyDt.Rows[0]["ITEMID"].ToString().Trim())
                {
                    string viewtest = "";

                    int planQty = planQty = int.Parse(grdMain["잔량", i].Value.ToString().Trim().Replace(",", ""));
                    scanQty = int.Parse(ganBodyDt.Rows[0]["GOODQTY"].ToString().Trim());

                    if (planQty <= scanQty + int.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")))
                    {
                        for (int j = 0; j < grdMain.Columns.Count; j++)
                        {
                            grdMain[j, i].Style.ForeColor = Color.Red;
                        }
                    }
                    else
                    {
                        for (int j = 0; j < grdMain.Columns.Count; j++)
                        {
                            grdMain[j, i].Style.ForeColor = Color.Black;
                        }
                    }
                    toline = grdMain["요청창고ID", i].Value.ToString().Trim();
                    grdMain["스캔수량", i].Value = (int.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")) + scanQty).ToString("###,##0");
                    scanDtInsertFlag = "OK";
                    break;
                }
            }

            if(scanDtInsertFlag == "OK")
            {
                _scanDt.Rows.Add(ganban, scanQty.ToString(), toline);
            }

        }

        private void grdMain_Color_change()
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["품목", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품명", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["규격", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);

                grdMain["잔량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["잔량", i].Style.BackColor = Color.DodgerBlue;

                grdMain["스캔수량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["스캔수량", i].Style.BackColor = Color.DodgerBlue;

                int remainQty = int.Parse(grdMain["잔량", i].Value.ToString());
                int scanQty = int.Parse(grdMain["스캔수량", i].Value.ToString());
                if (remainQty <= scanQty)
                { 
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
                else
                {
                    for (int j = 0; j < grdMain.Columns.Count; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Black;
                    }
                }
            }
        }

        private void txtSN_Focus()
        {
            txtSN.BackColor = Color.Yellow;
            txtSN.Focus();
            txtSN.SelectAll();
        }


        private void txtSN_Leave(object sender, EventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Red;
            }
        }

        private void txtSN_MouseClick(object sender, MouseEventArgs e)
        {
            if (txtSN.Enabled == true)
            {
                txtSN.BackColor = Color.Yellow;
            }
        }

        private void btnPageInit_Click(object sender, EventArgs e)
        {
            frmMessage frm = new frmMessage("현재 화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                txtSN.Text = "";
                lblItem.Text = "";
                lblQty.Text = "";
                grdMain.RemoveAll();
                newScanDt();

                txtSN_Focus();
            }
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {

        }

        private void btnTransfer_Click(object sender, EventArgs e)
        {

        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                lblItem.Text = "";
                lblQty.Text = "";
            }
            else
            {
                int nownow = grdMain.CurrentRow.Index;
                lblItem.Text = grdMain["품목", nownow].Value.ToString();
                lblQty.Text = grdMain["스캔수량", nownow].Value.ToString().Trim().Replace(",", "");
            }
        }

        private void btnInput_Click(object sender, EventArgs e)
        {
            if (lblQty.Text.Trim() == "")
            {
                lblQty.Text = "0";
            }

            clsStatic._dialogValue = "";

            frmLoginIDInsert frm = new frmLoginIDInsert(lblQty.Text.Trim().Replace(",", ""));
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblQty.Text = int.Parse(clsStatic._dialogValue).ToString("###,##0");

                int nownow = grdMain.CurrentRow.Index;

                int scanQty = int.Parse(clsStatic._dialogValue);
                int remainQty = int.Parse(grdMain["잔량", nownow].Value.ToString());

                if (remainQty <= scanQty)
                {
                    for(int i=0;i<grdMain.Columns.Count;i++)
                    {
                        grdMain[i, nownow].Style.ForeColor = Color.Red;
                    }
                }
                else
                {
                    for (int i = 0; i < grdMain.Columns.Count; i++)
                    {
                        grdMain[i, nownow].Style.ForeColor = Color.Black;
                    }
                }

                grdMain["스캔수량", nownow].Value = int.Parse(clsStatic._dialogValue).ToString("###,##0");

                clsStatic._dialogValue = "";
            }
        }

        private void gi_label_tmp_insert(string move_id, string gikeycol, string toline)
        {
            List <Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD",     clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",      clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID",         move_id);
            paramsMap.Add("TRANSFER_FLAG",   "WAIT");
            paramsMap.Add("GIKEYCOL",        gikeycol);
            paramsMap.Add("TO_LOCATION_CD",  toline);
            paramsMap.Add("CREATE_BY",       clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopGiTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private string get_moveSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGIseqCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
            {
                return "NG";
            }

            if (int.Parse(checkDt.Rows[0]["MOVECNT"].ToString().Trim()) > 0)
            {
                return "NG";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getMoveseq.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return "NG";
            }

            if (dt.Rows.Count <= 0)
            {
                return "NG";
            }

            retbuf = dt.Rows[0]["MOVESEQ"].ToString().Trim();

            return retbuf;

        }

        private void gi_item_tmp_insert(string moveId, string materialRequestId, string workOrderId, string itemId, string remainQty, 
                                        string inLocationCd, string outLocationCd, string outsourcingFlag, string conversionUnit, string conversionUnitQty, 
                                        string marketCd, string currencyCd)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("divisionCd",        clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd",         clsStatic._COMPANY_CD);
            paramsMap.Add("moveId",            moveId);
            paramsMap.Add("transferFlag",      "WAIT");
            paramsMap.Add("materialRequestId", materialRequestId);
            paramsMap.Add("workOrderId",       workOrderId);
            paramsMap.Add("itemId",            itemId);
            paramsMap.Add("remainQty",         remainQty.Replace(",", ""));
            paramsMap.Add("inLocationCd",      inLocationCd);
            paramsMap.Add("outLocationCd",     outLocationCd);
            paramsMap.Add("outsourcingFlag",   outsourcingFlag);
            paramsMap.Add("createBy",          clsStatic._USER_ID);
            paramsMap.Add("conversionUnit",    conversionUnit);
            paramsMap.Add("conversionUnitQty", conversionUnitQty);
            paramsMap.Add("marketCd",          marketCd);
            paramsMap.Add("currencyCd",        currencyCd);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_giTemp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }


        private string ret_value(object value)
        {
            string retbuf = "";

            if(value == null)
            {
                return retbuf;
            }

            retbuf = value.ToString();

            return retbuf;
        }

        private void material_gi(string move_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_division_cd", clsStatic._DIVISION_CD);
            paramsMap.Add("p_company_cd", clsStatic._COMPANY_CD);
            paramsMap.Add("p_move_id", move_id);
            paramsMap.Add("p_modifier", clsStatic._USER_ID);
            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_mat_gi_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (moveDt == null)
            {
                frmMessage frm1 = new frmMessage("불출처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("불출처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage frm3 = new frmMessage("불출처리가 정상적으로 처리었습니다.", "AUTOCLOSE");
            frm3.ShowDialog();
            txtSN_Focus();
            return;
        }

        private void btnScanList_Click(object sender, EventArgs e)
        {
            frmScanView frm1 = new frmScanView(_scanDt, "불출");
            frm1.ShowDialog();
        }

        private void lblNowdate_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmNowDate frm = new frmNowDate(lblNowdate.Text.Split(' ')[0]);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblNowdate.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        private void btnSearch_Click(object sender, EventArgs e)
        {
            comboPO.TextChanged -= ComboPO_TextChanged;
            get_PO_list();
            get_WO_list();
            grdMain.RemoveAll();
            comboPO.TextChanged += ComboPO_TextChanged;
        }

        private void ComboPO_TextChanged(object sender, EventArgs e)
        {
            if(comboPO.Text == "NONE")
            {
                comboWO.Text = "NONE";
                comboWO.Enabled = false;
            }
            else if (comboPO.Text == "NO_ORDER")
            {
                comboWO.Text = "NONE";
                comboWO.Enabled = true;

                DataRow[] drs = _woDt.Select("PRODUCTORDERID = 'NO_ORDER'");

                comboWO.Items.Clear();
                comboWO.Items.Add("NONE");
                for (int i = 0; i < drs.Length; i++)
                {
                    comboWO.Items.Add(drs[i]["WORKORDERID"].ToString());
                }
                comboWO.Text = "NONE";


            }
            else
            {
                DataRow[] drs = _woDt.Select("PRODUCTORDERID = '" + comboPO.Text + "'");

                if(drs.Length > 0)
                {
                    comboWO.Items.Clear();
                    comboWO.Items.Add(drs[0]["WORKORDERID"].ToString());
                    comboWO.SelectedIndex = 0;
                }

            }
        }

        private void get_PO_list()
        {
            string nowdate = lblNowdate.Text.Split(' ')[0];
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("fromDate", nowdate);
            paramsMap.Add("toDate", nowdate);
            paramsMap.Add("locationCd", clsStatic._FROMLINE);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsList.Add(paramsMap);

            string retvalue = "";

            _poDt.Dispose(); 
            _poDt = new DataTable();
            _poDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialReleasePO_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            comboPO.Items.Clear();
            comboWO.Items.Clear();

            comboPO.Items.Add("NONE");
            for (int i=0;i<_poDt.Rows.Count;i++)
            {
                comboPO.Items.Add(_poDt.Rows[i]["PRODUCTORDERID"].ToString());
            }
            comboPO.Text = "NONE";

            comboWO.Items.Add("NONE");
            comboWO.Text = "NONE";

        }

        private void get_WO_list()
        {
            string nowdate = lblNowdate.Text.Split(' ')[0];
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("fromDate", nowdate);
            paramsMap.Add("toDate", nowdate);
            paramsMap.Add("locationCd", clsStatic._FROMLINE);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsList.Add(paramsMap);

            string retvalue = "";

            _woDt.Dispose();
            _woDt = new DataTable();
            _woDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialReleaseWO_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
        }

        private void btnListSearch_Click(object sender, EventArgs e)
        {
            if (comboPO.Text == "NONE" && comboWO.Text == "NONE")
            {
                frmMessage frm1 = new frmMessage("고객사제번, 작업지시번호 중 1개 이상 입력하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            newScanDt();
            get_GI_list();
        }

        private void get_GI_list()
        {
            string poid = "";
            string woid = "";

            if(comboPO.Text != "NONE")
            {
                poid = comboPO.Text;
            }

            if (comboWO.Text != "NONE")
            {
                woid = comboWO.Text;
            }

            if(poid == "NO_ORDER")
            {
                poid = "";
            }

            string nowdate = lblNowdate.Text.Split(' ')[0];
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("fromDate", nowdate);
            paramsMap.Add("toDate", nowdate);
            paramsMap.Add("productOrderId", poid);
            paramsMap.Add("workOrderId", woid);
            paramsMap.Add("locationCd", clsStatic._FROMLINE);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsList.Add(paramsMap);

            string retvalue = "";

            _moveDt.Dispose();
            _moveDt = new DataTable();
            _moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialRelease_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            grdMain.RemoveAll();
            if (_moveDt == null)
            {
                return;
            }

            if (_moveDt.Rows.Count == 0)
            {
                grdMain.RemoveAll();
            }

            grdMain.DataBindDataSource(_moveDt, false, false);
            grdMain_Color_change();
        }

        private void btnManualPrint_Click(object sender, EventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                return;
            }
            int nownow = grdMain.CurrentRow.Index;
            string itemId = grdMain["품목", nownow].Value.ToString();
            string qty = grdMain["잔량", nownow].Value.ToString().Trim().Replace(",", "");
            string stocknm = lblFromStock.Text;

            frmGanbanManual frm = new frmGanbanManual(stocknm, clsStatic._FROMLINE, itemId, qty);
            frm.ShowDialog();
        }

        private void btnGI_Click(object sender, EventArgs e)
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                int planQty = 0;
                int scanQty = 0;

                planQty = int.Parse(grdMain["잔량", i].Value.ToString().Trim().Replace(",", ""));
                scanQty = int.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", ""));

                if (planQty <= scanQty || scanQty == 0)
                {
                    continue;
                }
                else
                {
                    frmMessage frm1 = new frmMessage("스캔수량은 잔량보다 많거나 같아야 불출 처리가 가능합니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
            }

            frmMessage frm = new frmMessage("입력한 품목들을 불출처리 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string retbuf = "";
                retbuf = get_moveSeq();

                if (retbuf == "NG")
                {
                    frmMessage frm1 = new frmMessage("현재 불출처리가 진행중입니다. 잠시후 불출처리 진행 하여 주세요.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string moveId = retbuf;

                string desc = "POP 불출처리";

                

                string outFlag = "NO";
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    Color color = grdMain["스캔수량", i].Style.ForeColor;

                    if (color == Color.Red && grdMain["불출상태", i].Value.ToString().Trim() != "출고완료")
                    {
                        string materialRequestId = ret_value(grdMain["불출요청번호", i].Value);
                        string workOrderId = ret_value(grdMain["WORK_ORDER", i].Value);
                        string itemId = ret_value(grdMain["품목", i].Value);
                        string remainQty = ret_value(grdMain["스캔수량", i].Value);
                        string inLocationCd = clsStatic._FROMLINE;
                        string outLocationCd = ret_value(grdMain["요청창고ID", i].Value);
                        string outsourcingFlag = ret_value(grdMain["OUTSOURCINGFLAG", i].Value).Replace(",", "");
                        string conversionUnit = ret_value(grdMain["단위", i].Value);
                        string conversionUnitQty = ret_value(grdMain["단위수량", i].Value);
                        string marketCd = ret_value(grdMain["Market", i].Value);
                        string currencyCd = ret_value(grdMain["환종", i].Value);


                        gi_item_tmp_insert(moveId, materialRequestId, workOrderId, itemId, remainQty, inLocationCd, outLocationCd, outsourcingFlag, conversionUnit, conversionUnitQty, marketCd, currencyCd);

                        outFlag = "OK";
                    }
                }

                if (outFlag == "OK")
                {
                    for (int i = 0; i < _scanDt.Rows.Count; i++)
                    {
                        string gikeycol = _scanDt.Rows[i]["GANBANID"].ToString().Trim();
                        string toline = _scanDt.Rows[i]["TOLINE"].ToString().Trim();

                        gi_label_tmp_insert(moveId, gikeycol, toline);
                    }

                    material_gi(moveId);

                    lblItem.Text = "";
                    lblQty.Text = "";
                    grdMain.RemoveAll();
                    newScanDt();
                    get_GI_list();
                }
                else
                {
                    frmMessage frm1 = new frmMessage("불출 대상이 존재하지 않습니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
                txtSN_Focus();
                return;
            }
        }
    }
}
