using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SmartMom_Lib;
using System.Globalization;
using System.Threading;

namespace SmartMOM_POP
{
    public partial class ucMaterialGRNew : UserControl
    {
        string _now_date = "";
        string _move_id = "";
        string _selectYN = "N"; //전체선택 여부

        DataTable _gridDt = new DataTable();
        DataTable _departureDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        public ucMaterialGRNew()
        {
            InitializeComponent();

            InitMainList();
            newScanDt();
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            string[] headerText = new string[] { "ModelIOWarehouse", "DepartureId",         "ItemId",   "ItemName", "ItemType",     "OrderQty", "DepartureQty", "ScanQty",  "RemainQty",     "Specification",  "BoxQty",   "UnitCd", "DueDate",   "DepartureDate", "VendorCd", "OrderId",         "MarketCd", "DepartureFlag", "CurrencyCd",   "GanbanYN",   "MaterialLOT",  "ChkYN", "DepartureGroupId" };
            string[] columnName = new string[] { "LOCATIONNAME",     "MATERIALDEPARTUREID", "ITEMID",   "ITEMNAME", "ITEMTYPENAME", "ORDERQTY", "DEPARTUREQTY", "SCANQTY",  "ORDERREMAINQTY","SPECIFICATION",  "POPCTQTY", "SLOC",   "ORDERDATE", "DEPARTUREDATE", "VENDORCD", "MATERIALORDERID", "MARKETCD", "DEPARTUREFLAG", "CURRENCYCD",   "GANBANYN",   "VENDORLOT",    "CHKYN", "DEPARTUREGROUPID" };


            string[] columnType = new string[] { "T",                "T",                   "T",        "T",        "T",            "T",        "T",            "T",        "T",             "T",              "T",        "T",      "T",         "T",             "T",        "T",               "T",        "T",             "T",            "T",          "T",            "T",     "T"    };
            int[] columnWidth = new int[]      { 170,                200,                   170,        230,        85,             120,        120,            120,        120,             230,              120,        90,       170,         170,             150,        200,               150,        120,             90,             90,           0,              0,       0      };
            bool[] columnVisible = new bool[]  { false,              false,                 true,       true,       true,           true,       true,           true,       true,            true,             true,       true,     true,        true,            true,       true,              true,       false,           true,           true,         true,           false,   false  };
            bool[] columnDisable = new bool[]  { true,               true,                  true,       true,       true,           true,       true,           true,       true,            true,             false,      true,     true,        true,            true,       true,              true,       true,            true,           true,         true,           true,    true   };
            string[] cellAlign = new string[]  { "C",                "C",                   "L",        "L",        "C",            "R",        "R",            "R",        "C",             "L",              "C",        "C",      "C",         "C",             "C",        "C",               "C",        "C",             "C",            "C",          "C",            "C",     "C"    };


            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
            _scanDt.Columns.Add("DEPARTUREGROUPID");
        }
        #endregion

        //화면 초기화
        private void btnInit_Click(object sender, EventArgs e)
        {
            //화면을 초기화 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to reset the screen?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                init();
            }
        }

        public void init()
        {
            lblDepartureCd.Text = "";
            lblOrderFlag.Text = "";
            lblToStock.Text = "";
            lblVendor.Text = "";

            txtSN.Text = "";
            txtSN_Focus();
            grdMain.RemoveAll();
            _gridDt.Clear();
            newScanDt();
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
        }

        #region 그리드 Event
        //선택한 Row 색 변경
        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if(grdMain.Rows.Count < 1)
            {
                return;
            }

            // 1. 그리드 컬럼헤더 영역 클릭했을 경우
            if (e.ColumnIndex == 0 && e.RowIndex < 0 && grdMain.Rows.Count > 0)
            {
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    if (_selectYN == "Y") 
                    {
                        // 1.1 전체선택 해제
                        grdMain["ChkYN", i].Value = "N";

                        for (int j = 1; j < grdMain.ColumnCount; j++)
                        {
                            grdMain[j, i].Style.BackColor = Color.White;
                            row_Color_change(i);
                        }
                    }
                    else
                    {
                        // 1.2 라벨 생성된 항목을 제외한 항목 전체 선택
                        if (grdMain["GanbanYN", i].Value.ToString() != "Y")
                        {
                            grdMain["ChkYN", i].Value = "Y";
                            for (int j = 1; j < grdMain.ColumnCount; j++)
                            {
                                grdMain[j, i].Style.BackColor = Color.Yellow;
                            }
                        }
                    }
                }

                if (_selectYN == "Y")
                {
                    _selectYN = "N";
                }
                else
                {
                    _selectYN = "Y";
                }

            }
            // 2. 그리드 리스트 영역 클릭했을 경우
            else if(e.RowIndex >= 0)
            {
                // 2.1 선택되어 있었을 경우 선택 해제
                if (grdMain["ChkYN", e.RowIndex].Value.ToString() == "Y")
                {
                    grdMain["ChkYN", e.RowIndex].Value = "N";

                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.White;
                        row_Color_change(e.RowIndex);
                    }
                    
                }
                // 2.2 선택되지 않았을 경우 선택
                else
                {
                    //라벨 생성된 경우는 제외
                    if (grdMain["GanbanYN", e.RowIndex].Value.ToString() != "Y")
                    {
                        grdMain["ChkYN", e.RowIndex].Value = "Y";
                        for (int j = 1; j < grdMain.ColumnCount; j++)
                        {
                            grdMain[j, e.RowIndex].Style.BackColor = Color.Yellow;
                        }
                    }
                }
            }           

        }

        //특성 Row 색 변경
        private void grdMain_Color_change()
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["ModelIOWarehouse", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
                grdMain["DepartureId", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
                grdMain["ItemId", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
                grdMain["ItemName", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
                grdMain["RemainQty", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);

                string depatureFlag = grdMain["DepartureFlag", i].Value.ToString();

                if (depatureFlag == "Y")
                {
                    grdMain["DepartureQty", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                    grdMain["DepartureQty", i].Style.BackColor = Color.DodgerBlue;
                }
                else
                {
                    grdMain["OrderQty", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                    grdMain["OrderQty", i].Style.BackColor = Color.DodgerBlue;
                }

                grdMain["ScanQty", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                grdMain["ScanQty", i].Style.BackColor = Color.DodgerBlue;
            }
        }

        private void row_Color_change(int row)
        {

            string depatureFlag = grdMain["DepartureFlag", row].Value.ToString();

            if (depatureFlag == "Y")
            {
                grdMain["DepartureQty", row].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                grdMain["DepartureQty", row].Style.BackColor = Color.DodgerBlue;
            }
            else
            {
                grdMain["OrderQty", row].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                grdMain["OrderQty", row].Style.BackColor = Color.DodgerBlue;
            }

            grdMain["ScanQty", row].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
            grdMain["ScanQty", row].Style.BackColor = Color.DodgerBlue;

        }

        #endregion

        #region 라벨 생성

        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            if (grdMain.Rows.Count == 0)
            {
                //선택된 항목이 없습니다.
                frmMessage frm1 = new frmMessage("No item selected.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();

            if (retbuf == "NG")
            {
                //현재 라벨발행 진행중입니다.
                frmMessage frm1 = new frmMessage("Label is currently being published.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            //자동 간판라벨발행을 실행 하시겠습니까?(박스구성수량 기준)
            frmMessage frm = new frmMessage("Do you want to auto run the GANBAN label?(Based on box composition quantity)", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            try
            {
                if (result == DialogResult.OK)
                {

                    for (int i = 0; i < grdMain.Rows.Count; i++)
                    {
                        if (_departureDt.Rows[i]["CHKYN"].ToString().Equals("Y"))
                        {
                            double pollibleQty = double.Parse(_departureDt.Rows[i]["DEPARTUREQTY"].ToString());
                            int makeqty = Convert.ToInt32(pollibleQty / double.Parse(_departureDt.Rows[i]["POPCTQTY"].ToString()));
                            double etc = pollibleQty % double.Parse(_departureDt.Rows[i]["POPCTQTY"].ToString());

                            for (int j = 0; j < makeqty; j++)
                            {
                                make_ganban(retbuf, _departureDt.Rows[i]["POPCTQTY"].ToString(), _departureDt.Rows[i]["ITEMID"].ToString(), _departureDt.Rows[i]["MATERIALDEPARTUREID"].ToString(), _departureDt.Rows[i]["VENDORCD"].ToString());
                                Thread.Sleep(500);
                            }

                            if (etc > 0)
                            {
                                make_ganban(retbuf, etc.ToString(), _departureDt.Rows[i]["ITEMID"].ToString(), _departureDt.Rows[i]["MATERIALDEPARTUREID"].ToString(), _departureDt.Rows[i]["VENDORCD"].ToString());
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                delete_ganban_tmp(retbuf);
                //라벨 발행에 실패했습니다.
                frmMessage frm1 = new frmMessage("Failed to publish label", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            ganban_print(retbuf);
            txtSN.Text = lblDepartureCd.Text;
            insert_departure();
        }


        private string get_ganbanSeq()
        {
            string retvalue = "";
            string retbuf = "";

            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("IP_ADDRESS", clsStatic._GANBANPRINT);

            paramsCheckList.Add(paramsCheckMap);

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                return "NG";
            }

            if (checkDt.Rows.Count <= 0)
            {
                return "NG";
            }

            if (int.Parse(checkDt.Rows[0]["LABELCNT"].ToString().Trim()) > 0)
            {
                return "NG";
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");

            paramsList.Add(paramsMap);

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanseq.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                return "NG";
            }

            if (dt.Rows.Count <= 0)
            {
                return "NG";
            }

            retbuf = dt.Rows[0]["GANBANSEQ"].ToString().Trim();

            return retbuf;

        }

        private void make_ganban(string labelid, string makeGanban, string itemId, string itemDepartureId, string vendorCd)
        {
            string ganban = "-";
            string depature = itemDepartureId;


            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("p_ganbanid", "");
            paramsMap.Add("P_LABEL_ID", labelid);
            paramsMap.Add("P_IP_ADDRESS", clsStatic._GANBANPRINT);
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_ITEM_ID", itemId);
            paramsMap.Add("P_DEPARTURE_GROUP_ID", depature);
            paramsMap.Add("P_WORK_ORDER_ID", "-");
            paramsMap.Add("P_GOOD_QTY", makeGanban);
            paramsMap.Add("P_FROM_SLOC", "-");
            paramsMap.Add("P_SLOC", clsStatic._TOLINE);
            paramsMap.Add("P_VENDOR_CD", vendorCd);
            paramsMap.Add("P_DESCRIPTION", "from DEPATURE");
            paramsMap.Add("P_PA_GANBAN_ID", ganban);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc_new1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                //간판라벨 생성이 실패했습니다.
                frmMessage frm1 = new frmMessage("GANBAN Label creation failed.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                //간판라벨 생성이 실패했습니다.
                frmMessage frm1 = new frmMessage("GANBAN Label creation failed.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }
        }

        private void delete_ganban_tmp(string labelid)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LABEL_ID", labelid);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.deleteGanbanTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void ganban_print(string labelid)
        {
            List<Dictionary<string, object>> paramsCheckList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsCheckMap = new Dictionary<string, object>();
            paramsCheckMap.Add("p_err_code", "");
            paramsCheckMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsCheckMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsCheckMap.Add("LABEL_ID", labelid);

            paramsCheckList.Add(paramsCheckMap);
            string retvalue = "";
            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanPrintList.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                //출력할 간판라벨이 없습니다.
                frmMessage frm1 = new frmMessage("There are no GANBAN labels to print.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                //출력할 간판라벨이 없습니다.
                frmMessage frm1 = new frmMessage("There are no GANBAN labels to print.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            for (int i = 0; i < checkDt.Rows.Count; i++)
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", checkDt.Rows[i]["GANBANID"].ToString(), checkDt.Rows.Count, i, "", ref _BasicDs);
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("p_runCount", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LABEL_ID", labelid);

            paramsList.Add(paramsMap);

            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.deleteGanbanTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

        }

        #endregion        

        #region 바코드 입력창 이벤트
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

        //라벨 스캔
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if (txtSN.Text.Trim() == "")
                {
                    return;
                }
                if (lblDepartureCd.Text == "")
                {
                    insert_departure();
                    newScanDt();
                    txtSN_Focus();
                }
                else
                {
                    add_Ganban();
                }
                txtSN_Focus();
            }
        }

        //출발번호 조회
        private void insert_departure()
        {

            if (clsStatic._TOLINE == "")
            {
                //입고창고가 선택되지 않았습니다.
                frmMessage frm1 = new frmMessage("Receiving warehouse not selected.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            string departureId = "";
            string labelId = "";
            if(txtSN.Text.Substring(0,2) == "DP")
            {
                departureId = txtSN.Text;
            }
            else
            {
                labelId = txtSN.Text;
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap1.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap1.Add("departureGroupID", departureId);
            paramsMap1.Add("ganbanID", labelId);
            paramsMap1.Add("locationCd", clsStatic._TOLINE);


            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _departureDt.Dispose();
            _departureDt = new DataTable();
            _departureDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialInput.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (_departureDt == null)
            {
                //다른창고 재고이거나 출발번호가 존재하지 않는 재고입니다.
                frmMessage frm1 = new frmMessage("The stock is from another warehouse or has no departure number.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_departureDt.Rows.Count == 0)
            {
                //다른창고 재고이거나 출발번호가 존재하지 않는 재고입니다.
                frmMessage frm1 = new frmMessage("The stock is from another warehouse or has no departure number.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            grdMain.DataBindDataSource(_departureDt, false, false);
            _gridDt = _departureDt.Copy();
            grdMain_Color_change();

            if (_departureDt.Rows.Count > 0)
            {
                lblDepartureCd.Text = _departureDt.Rows[0]["DEPARTUREGROUPID"].ToString().Trim();
                //txtSN.Text = "";
                lblToStock.Text = clsStatic._TOLINE_DESC;
                lblVendor.Text = _departureDt.Rows[0]["VENDORNAME"].ToString().Trim();
                lblOrderFlag.Text = _departureDt.Rows[0]["ORDERFLAGNAME"].ToString().Trim();
            }

            if(labelId != "")
            {
                add_Ganban();
            }

            txtSN_Focus();
        }

        //입고간판라벨 조회
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
            paramsMap1.Add("GANBAN_ID", ganban);
            paramsMap1.Add("DEPARTURE_GROUP_ID", "");
            paramsMap1.Add("GANBAN_TYPE", "DP");
            paramsMap1.Add("dateFlag", "");
            paramsMap1.Add("USE_YN", "Y");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                //입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.
                frmMessage frm1 = new frmMessage("No GANBAN number entered or GANBAN label not available.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                //입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.
                frmMessage frm1 = new frmMessage("No GANBAN number entered or GANBAN label not available.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (lblDepartureCd.Text != ganBodyDt.Rows[0]["DEPARTURE"].ToString())
            {
                //출발처리 번호가 다른 간판라벨 입니다.
                frmMessage frm1 = new frmMessage("Departure number is a different label.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
            {
                //이미 입력한 간판라벨입니다.
                frmMessage frm1 = new frmMessage("This GANBAN label has already been entered.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string dtItem_id = "";
            double scanQty = 0;
            string scanDtInsertFlag = "NO";


            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string grid_departure = grdMain["DepartureId", i].Value.ToString();

                if (grid_departure == ganBodyDt.Rows[0]["DEPARTUREGROUPID"].ToString().Trim())
                {
                    string viewtest = "";

                    string depatureFlag = grdMain["DepartureFlag", i].Value.ToString();
                    double planQty = 0;

                    if (depatureFlag == "Y")
                    {
                        planQty = double.Parse(grdMain["DepartureQty", i].Value.ToString().Trim());
                        viewtest = "DepartureQty";
                    }
                    else
                    {
                        planQty = double.Parse(grdMain["OrderQty", i].Value.ToString().Trim());
                        viewtest = "OrderQty";
                    }

                    scanQty = double.Parse(ganBodyDt.Rows[0]["GOODQTY"].ToString().Trim());


                    if (planQty < scanQty + double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()))
                    {
                        //스캔한 수량이 " + viewtest + "보다 많습니다.
                        frmMessage frm1 = new frmMessage("The quantity scanned is more than " + viewtest + ".", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }
                    else if (planQty == scanQty + double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()))
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

                    grdMain["ScanQty", i].Value = (double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()) + scanQty).ToString("######.##");

                    scanDtInsertFlag = "OK";
                }
            }

            if (scanDtInsertFlag == "OK")
            {
                _scanDt.Rows.Add(ganban, scanQty.ToString(), ganBodyDt.Rows[0]["DEPARTUREGROUPID"].ToString().Trim());
            }

        }

        #endregion

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        #region 입고 처리

        private void btnGR_Click(object sender, EventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                //입고대상이 존재하지 않습니다.
                frmMessage frm1 = new frmMessage("The target does not exist.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string depatureFlag = grdMain["DepartureFlag", i].Value.ToString();

                double planQty = 0;
                double scanQty = 0;
                string viewtest = "";

                if (depatureFlag == "Y")
                {
                    planQty = double.Parse(grdMain["DepartureQty", i].Value.ToString().Trim());
                    viewtest = "DepartureQty";
                }
                else
                {
                    planQty = double.Parse(grdMain["OrderQty", i].Value.ToString().Trim());
                    viewtest = "DepartureQty";
                }

                scanQty = double.Parse(grdMain["ScanQty", i].Value.ToString().Trim());

                if (planQty == scanQty || scanQty == 0)
                {
                    continue;
                }
                else
                {
                    //스캔수량은 " + viewtest + "과 일치하여야 자재입고 처리가 가능합니다.
                    frmMessage frm1 = new frmMessage("To receive a product, Scan quantity should be equal to " + viewtest + ".", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
            }

            //입력한 품목들을 입고처리 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to process the items you entered?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string retbuf = "";
                retbuf = get_moveSeq();

                if (retbuf == "NG")
                {
                    //현재 입고처리가 진행중입니다. 잠시후 입고처리 진행 하여 주세요.
                    frmMessage frm1 = new frmMessage("Processing is currently in progress. Please try again later.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string moveId = retbuf;

                string desc = "POP 자재입고";

                try
                {
                    for (int i = 0; i < _scanDt.Rows.Count; i++)
                    {
                        string grkeycol = _scanDt.Rows[i]["GANBANID"].ToString().Trim();

                        gr_label_tmp_insert(moveId, grkeycol);
                    }

                    int rowcnt = 1;
                    for (int i = 0; i < grdMain.Rows.Count; i++)
                    {
                        Color color = grdMain["ScanQty", i].Style.ForeColor;

                        if (color == Color.Red)
                        {
                            string material_order_id = ret_value(grdMain["OrderId", i].Value);
                            string item_id = ret_value(grdMain["ItemId", i].Value);
                            string location_cd = clsStatic._TOLINE;
                            string vendor_cd = ret_value(grdMain["VendorCd", i].Value);
                            string material_departure_id = ret_value(grdMain["DepartureId", i].Value);
                            string qty = ret_value(grdMain["ScanQty", i].Value);
                            string conversion_unit_qty = ret_value(grdMain["ScanQty", i].Value);
                            string currency_cd = ret_value(grdMain["CurrencyCd", i].Value);
                            string market_cd = ret_value(grdMain["MarketCd", i].Value);
                            string vendor_lot = ret_value(grdMain["MaterialLOT", i].Value);
                            string description = "GR";
                            string seq = rowcnt.ToString();
                            rowcnt++;

                            gr_item_tmp_insert(moveId, item_id, location_cd, vendor_cd, material_order_id, material_departure_id, qty, qty, currency_cd, market_cd, vendor_lot, description, seq);
                        }
                    }

                    material_gr(moveId);
                }
                catch (Exception ex)
                {
                    //delete_temp(moveId, "GR");
                    //입고처리가 실패하였습니다. 잠시후 입고처리 진행 하여 주세요.
                    frmMessage frm1 = new frmMessage("Processing failed. Please try again later.", "AUTOCLOSE");
                    frm1.ShowDialog();
                }

                txtSN.Text = lblDepartureCd.Text;
                lblDepartureCd.Text = "";
                lblVendor.Text = "";
                lblOrderFlag.Text = "";
                lblDepartureCd.Text = "";
                grdMain.RemoveAll();
                newScanDt();

                insert_departure();

                txtSN_Focus();
                return;
            }
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

            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGRseqCheck.dummy", paramsCheckList, clsStatic._serviceSelectURL, ref retvalue);

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

        private void gr_label_tmp_insert(string move_id, string grkeycol)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("GRKEYCOL", grkeycol);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopGrTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private string ret_value(object value)
        {
            string retbuf = "";

            if (value == null)
            {
                return retbuf;
            }

            retbuf = value.ToString();

            return retbuf;
        }

        private void gr_item_tmp_insert(string moveId, string itemId, string locationCd, string vendorCd, string materialOrderId,
                                        string materialDepartureId, string inputQty, string conversionUnitQty, string currencyCd,
                                        string marketCd, string vendorLot, string description, string seq)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("moveId", moveId);
            paramsMap.Add("itemId", itemId);
            paramsMap.Add("transferFlag", "WAIT");
            paramsMap.Add("locationCd", locationCd);
            paramsMap.Add("vendorCd", vendorCd);
            paramsMap.Add("materialOrderId", materialOrderId);
            paramsMap.Add("materialDepartureId", materialDepartureId);
            paramsMap.Add("inputQty", inputQty);
            paramsMap.Add("conversionUnitQty", conversionUnitQty);
            paramsMap.Add("currencyCd", currencyCd);
            paramsMap.Add("marketCd", marketCd);
            paramsMap.Add("vendorLot", vendorLot);
            paramsMap.Add("description", description);
            paramsMap.Add("createBy", clsStatic._USER_ID);
            paramsMap.Add("seq", seq);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_grTemp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void material_gr(string move_id)
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
            DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_mat_gr_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (moveDt == null)
            {
                //이동처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm1 = new frmMessage("Move processing did not process successfully.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                //이동처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm2 = new frmMessage("Move processing did not process successfully.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            //자재입고 처리가 정상적으로 처리었습니다.
            frmMessage frm3 = new frmMessage("The goods receipt has been processed normally.", "AUTOCLOSE");
            frm3.ShowDialog();
            txtSN_Focus();
            return;
        }

        #endregion

        private void btnSet_Click_1(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
    }
}

