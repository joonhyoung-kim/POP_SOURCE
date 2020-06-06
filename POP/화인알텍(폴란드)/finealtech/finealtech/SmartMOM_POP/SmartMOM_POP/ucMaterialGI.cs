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

namespace SmartMOM_POP
{
    public partial class ucMaterialGI : UserControl
    {
        string _now_date = "";
        string _move_id = "";

        DataTable _gridDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataTable _poDt = new DataTable();
        DataTable _woDt = new DataTable();

        public ucMaterialGI()
        {
            InitializeComponent();

            InitMainList();
            newScanDt();

            //cbxWO.ItemHeight = 54; 
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                   1           2           3                4             5             6             7             8           9               11               12                 13                   14             15             16                  17          18                19                   20
            string[] headerText = new string[] { "ItemId",   "ItemName", "Specification", "CurrentQty", "PlanQty",    "RequestQty", "RemainQty",  "ScanQty",  "RequestDate",  "ToWarehouseId", "ToWarehouseName", "MaterialRequestId", "WorkOrderId", "State",       "OutsourcingFlag",  "Market",   "UnitCd",         "UnitQty",           "CurrencyCd", "StateCd" };
            string[] columnName = new string[] { "ITEMID",   "ITEMNAME", "SPECIFICATION", "CURRENTQTY", "CONFIRMQTY", "REQUESTQTY", "REMAINQTY",  "SCANQTY",  "REQUESTDATE",  "OUTLOCATIONCD", "OUTLOCATIONNAME", "MATERIALREQUESTID", "WORKORDERID", "STATENAME",   "OUTSOURCINGFLAG",  "MARKETCD", "CONVERSIONUNIT", "CONVERSIONUNITQTY", "CURRENCYCD", "REQUESTSTATE" };
            string[] columnType = new string[] { "T",        "T",        "T",             "T",          "T",          "T",          "T",          "T",        "T",            "T",             "T",               "T",                 "T",            "T",          "T",                "T" ,       "T" ,             "T" ,                "T", "T" };

            int[] columnWidth = new int[]      { 170,        195,        120,             120,          120,          120,          120,          120,        130,            160,             160,               200,                 200,            140,          10,                 10,         10,               10,                  10, 10 };
            bool[] columnVisible = new bool[]  { true,       true,       false,           true,         false,        true,         true,         true,       true,           true,            true,              true,                false,          true,         false,              false,      false,            false,               false, false };
            bool[] columnDisable = new bool[]  { true,       true,       true,            true,         true,         true,         true,         true,       true,           true,            true,              true,                true,           true,         true,               true ,      true ,            true ,               true, true };
            string[] cellAlign = new string[]  { "C",        "L",        "L",             "L",          "R",          "R",          "R",          "R",        "C",            "L",             "L",               "L",                 "L",            "C",          "L",                "L",        "L",              "L",                 "L", "C" };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        //스캔리스트
        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
            _scanDt.Columns.Add("TOLINE");
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
            grdMain.RemoveAll();
            _gridDt.Clear();
            newScanDt();

            lblItem.Text = "";
            lblQty.Text = "";
            lblWO.Text = "";
            lblModel.Text = "";
            txtSN.Text = "";
            lblWoItemId.Text = "";
            lblWoItemName.Text = "";
            txtSN_Focus();
        }

        

        #region 하단 Condition 영역 Event

        //수동수량입력 클릭
        private void btnInput_Click(object sender, EventArgs e)
        {
            if (grdMain.Rows.Count > 0)
            {
                if (lblQty.Text.Trim() == "")
                {
                    lblQty.Text = "0";
                }

                clsStatic._dialogValue = "";

                frmLoginIDInsertDouble frm = new frmLoginIDInsertDouble(lblQty.Text.Trim());
                frm.ShowDialog();

                if (clsStatic._dialogValue != "")
                {
                    lblQty.Text = double.Parse(clsStatic._dialogValue).ToString("######.##");

                    int nownow = grdMain.CurrentRow.Index;

                    double scanQty = double.Parse(clsStatic._dialogValue);
                    double remainQty = double.Parse(grdMain["RemainQty", nownow].Value.ToString());

                    if (remainQty <= scanQty)
                    {
                        for (int i = 0; i < grdMain.Columns.Count; i++)
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

                    grdMain["ScanQty", nownow].Value = double.Parse(clsStatic._dialogValue).ToString("######.##");

                    clsStatic._dialogValue = "";
                }
            }
            txtSN_Focus();
        }

        #endregion

        #region 그리드 Event

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
                lblItem.Text = grdMain["ItemId", nownow].Value.ToString();
                lblQty.Text = grdMain["ScanQty", nownow].Value.ToString().Trim();
            }
        }


        //특성 Row 색 변경
        private void grdMain_Color_change()
        {
            if(grdMain.Rows.Count <= 0 )
            {
                return;
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["ItemId", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
                grdMain["ItemName", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
                grdMain["Specification", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold);

                grdMain["RemainQty", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                grdMain["RemainQty", i].Style.BackColor = Color.DodgerBlue;

                grdMain["ScanQty", i].Style.Font = new Font("맑은고딕", 16F, FontStyle.Bold | FontStyle.Underline);
                grdMain["ScanQty", i].Style.BackColor = Color.DodgerBlue;

                double remainQty = double.Parse(grdMain["RemainQty", i].Value.ToString());
                double scanQty = double.Parse(grdMain["ScanQty", i].Value.ToString());
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
        #endregion

        #region 라벨 스캔 Event

        //바코드 입력
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if(clsStatic._FROMLINE == "")
                {
                    //창고가 선택되지 않았습니다.
                    frmMessage frm = new frmMessage("No warehouse is selected.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (txtSN.Text.Trim() == "")
                {
                    return;
                }
                else if(lblWO.Text == "")
                {
                    get_GI_list();
                }
                else
                {
                    add_Ganban();
                }
                txtSN_Focus();
            }
        }

        //불출리스트 조회
        private void get_GI_list()
        {

            if (txtSN.Text == "")
            {
                return;
            }

            string woid = "";

            if (lblWO.Text == "")
            {

                woid = txtSN.Text;
            }
            else
            {
                woid = lblWO.Text;
            }

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("fromDate", "");
            paramsMap.Add("toDate", "");
            paramsMap.Add("productOrderId", "");
            paramsMap.Add("workOrderId", woid);
            paramsMap.Add("locationCd", clsStatic._FROMLINE);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsList.Add(paramsMap);

            string retvalue = "";

            _gridDt.Dispose();
            _gridDt = new DataTable();
            _gridDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialRelease_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            grdMain.RemoveAll();
            if (_gridDt == null)
            {
                return;
            }

            if (_gridDt.Rows.Count == 0)
            {
                grdMain.RemoveAll();
                return;
            }

            lblWO.Text = _gridDt.Rows[0]["WORKORDERID"].ToString();
            lblModel.Text = _gridDt.Rows[0]["MODEL"].ToString();
            lblWoItemId.Text = _gridDt.Rows[0]["WOITEMID"].ToString();
            lblWoItemName.Text = _gridDt.Rows[0]["WOITEMNAME"].ToString();

            grdMain.DataBindDataSource(_gridDt, false, false);
            grdMain_Color_change();
        }


        //라벨정보 조회
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

            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_GanbanBody_List.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

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

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
            {
                //이미 입력한 간판라벨입니다.
                frmMessage frm1 = new frmMessage("This label has already been entered.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string toline = "";
            double scanQty = 0;
            string scanDtInsertFlag = "NO";


            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string grid_itemId = grdMain["ItemId", i].Value.ToString();

                if (grid_itemId == ganBodyDt.Rows[0]["ITEMID"].ToString().Trim())
                {
                    double planQty = planQty = double.Parse(grdMain["RemainQty", i].Value.ToString().Trim());
                    scanQty = double.Parse(ganBodyDt.Rows[0]["GOODQTY"].ToString().Trim());

                    if (planQty <= scanQty + double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()))
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
                    toline = grdMain["ToWarehouseId", i].Value.ToString().Trim();
                    grdMain["ScanQty", i].Value = (double.Parse(grdMain["ScanQty", i].Value.ToString().Trim()) + scanQty).ToString("######.##");
                    scanDtInsertFlag = "OK";
                    break;
                }
            }

            if (scanDtInsertFlag == "OK")
            {
                _scanDt.Rows.Add(ganban, scanQty.ToString(), toline);
            }
            else
            {
                //해당 하는 품목이 없습니다.
                frmMessage frm = new frmMessage("There is no corresponding item.", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

        }

        //바코드 입력창 포커싱
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



        #endregion

        #region 불출 처리

        //불출
        private void btnIssue_Click(object sender, EventArgs e)
        {
            //입력한 품목들을 불출처리 하시겠습니까?
            frmMessage frm = new frmMessage("Do you want to process the items you entered?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string retbuf = "";
                retbuf = get_moveSeq();

                if (retbuf == "NG")
                {
                    //현재 불출처리가 진행중입니다. 잠시후 불출처리 진행 하여 주세요.
                    frmMessage frm1 = new frmMessage("Processing is currently in progress. Please try again later.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string moveId = retbuf;

                string desc = "POP 불출처리";



                string outFlag = "NO";

                try
                {
                    for (int i = 0; i < grdMain.Rows.Count; i++)
                    {
                        Color color = grdMain["ScanQty", i].Style.ForeColor;
                        double scanQty = double.Parse(grdMain["ScanQty", i].Value.ToString());
                        //if (color == Color.Red && grdMain["State", i].Value.ToString().Trim() != "출고완료")
                        if (scanQty > 0 && grdMain["StateCd", i].Value.ToString().Trim() != "R")
                        {
                            string materialRequestId = ret_value(grdMain["MaterialRequestId", i].Value);
                            string workOrderId = ret_value(grdMain["WorkOrderId", i].Value);
                            string itemId = ret_value(grdMain["ItemId", i].Value);
                            string remainQty = ret_value(grdMain["ScanQty", i].Value);
                            string inLocationCd = clsStatic._FROMLINE;
                            string outLocationCd = ret_value(grdMain["ToWarehouseId", i].Value);
                            string outsourcingFlag = ret_value(grdMain["OutsourcingFlag", i].Value).Replace(",", "");
                            string conversionUnit = ret_value(grdMain["UnitCd", i].Value);
                            string conversionUnitQty = ret_value(grdMain["UnitQty", i].Value);
                            string marketCd = ret_value(grdMain["Market", i].Value);
                            string currencyCd = ret_value(grdMain["CurrencyCd", i].Value);


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
                        //불출 대상이 존재하지 않습니다.
                        frmMessage frm1 = new frmMessage("The target does not exist.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }
                }
                catch (Exception ex)
                {
                    //불출처리 시 오류가 발생하였습니다. 다시 실행하여주십시오.
                    frmMessage frm1 = new frmMessage("An error occurred while processing. Please run again.", "AUTOCLOSE");
                    frm.ShowDialog();

                    deleteTmp(moveId);
                }

                
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

        private void gi_label_tmp_insert(string move_id, string gikeycol, string toline)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID", move_id);
            paramsMap.Add("TRANSFER_FLAG", "WAIT");
            paramsMap.Add("GIKEYCOL", gikeycol);
            paramsMap.Add("TO_LOCATION_CD", toline);
            paramsMap.Add("CREATE_BY", clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopGiTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void gi_item_tmp_insert(string moveId, string materialRequestId, string workOrderId, string itemId, string remainQty,
                                        string inLocationCd, string outLocationCd, string outsourcingFlag, string conversionUnit, string conversionUnitQty,
                                        string marketCd, string currencyCd)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("moveId", moveId);
            paramsMap.Add("transferFlag", "WAIT");
            paramsMap.Add("materialRequestId", materialRequestId);
            paramsMap.Add("workOrderId", workOrderId);
            paramsMap.Add("itemId", itemId);
            paramsMap.Add("remainQty", remainQty);
            paramsMap.Add("inLocationCd", inLocationCd);
            paramsMap.Add("outLocationCd", outLocationCd);
            paramsMap.Add("outsourcingFlag", outsourcingFlag);
            paramsMap.Add("createBy", clsStatic._USER_ID);
            paramsMap.Add("conversionUnit", conversionUnit);
            paramsMap.Add("conversionUnitQty", conversionUnitQty);
            paramsMap.Add("marketCd", marketCd);
            paramsMap.Add("currencyCd", currencyCd);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_giTemp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
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
            DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_material_gi_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (moveDt == null)
            {
                //불출처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm1 = new frmMessage("Processing did not proceed normally.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                //불출처리가 정상적으로 처리되지 않았습니다.
                frmMessage frm2 = new frmMessage("Processing did not proceed normally.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }
            //불출처리가 정상적으로 처리되었습니다.
            frmMessage frm3 = new frmMessage("Processing was successful", "AUTOCLOSE");
            frm3.ShowDialog();
            txtSN_Focus();
            return;
        }


        private void deleteTmp(string move_id)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_TMP_TYPE", "ISSUE");
            paramsMap.Add("P_TMP_ID", move_id);
            paramsList.Add(paramsMap);
            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.del_TmpData_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        #endregion

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }

        
    }
}
