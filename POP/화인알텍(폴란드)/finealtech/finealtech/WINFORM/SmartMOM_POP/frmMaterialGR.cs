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
    public partial class frmMaterialGR : Form
    {
        DataTable _departureDt = new DataTable();
        DataTable _scanDt = new DataTable();

        public frmMaterialGR()
        {
            InitializeComponent();

            lblToStock.Text = clsStatic._TOLINE_DESC + "(" + clsStatic._TOLINE + ")";

            InitGridList();

            btnSet_Click(null, null);
        }

        private void newScanDt()
        {
            _scanDt.Dispose();
            _scanDt = new DataTable();

            _scanDt.Columns.Add("GANBANID");
            _scanDt.Columns.Add("SCANQTY");
            _scanDt.Columns.Add("DEPARTUREGROUPID");
        }

        private void InitGridList()
        {
            //                                   0                    1                      2         3           4               5                6            7                8           9                 10          11      12           13                13           13                 13               13           13                14             
            string[] headerText = new string[] { "모델기준입고창고",  "출발번호",            "품목",   "품번",     "타입",         "규격",          "발주수량",  "출발수량",      "스캔수량", "잔량",           "MKT",      "단위", "납기일",    "출발일",         "업체코드",  "발주번호",        "환종",          "마켓코드",  "자재LOT번호",  "출발처리유무"     }; 
            string[] columnName = new string[] { "LOCATIONNAME",      "MATERIALDEPARTUREID", "ITEMID", "ITEMNAME", "ITEMTYPENAME", "SPECIFICATION", "ORDERQTY",  "DEPARTUREQTY",  "SCANQTY",  "ORDERREMAINQTY", "MARKETCD", "SLOC", "ORDERDATE", "DEPARTUREDATE",  "VENDORCD",  "MATERIALORDERID", "CURRENCYCD",    "MARKETCD",  "VENDORLOT",    "DEPARTUREFLAG"    };
            string[] columnType = new string[] { "T",                 "T",                   "T",      "T",        "T",            "T",             "T",         "T",              "T",        "T",             "T",        "T",    "T",         "T",              "T",         "T",               "T",             "T",         "T",              "T"              };
                                                                                                                                                                                                                                                                                                                                                           
            int[] columnWidth    = new int[]   {  200,                 230,                   195,      270,        95,             270,            140,         140,             140,        140,              250,        250,    250,         250,              250,         250,               250,             250,         250,              0                };
            bool[] columnVisible = new bool[]  {  true,                true,                  true,     true,       true,           true,           true,        true,            true,       true,             true,       true,   true,        true,             true,        true,              true,            true,        true,             true             };
            bool[] columnDisable = new bool[]  {  true,                true,                  true,     true,       true,           true,           true,        true,            true,       true,             true,       true,   true,        true,             true,        true,              true,            true,        true,             true             };
            string[] cellAlign = new string[]  { "C",                 "C",                   "L",      "L",         "C",            "L",            "R",         "R",             "R",        "R",              "C",        "C",    "C",         "C",              "C",         "C",               "C",             "C",         "C",              "C"              };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 24, FontStyle.Bold);
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
                if(lblDepartureCd.Text == "")
                {
                    insert_departure();
                    newScanDt();
                    lblItem.Text = "";
                    lblQty.Text = "";
                    txtSN_Focus();
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

            string dtItem_id = "";
            int scanQty = 0;
            string scanDtInsertFlag = "NO";


            for (int i=0;i<grdMain.Rows.Count;i++)
            {
                string grid_departure = grdMain["출발번호", i].Value.ToString();

                if(grid_departure == ganBodyDt.Rows[0]["DEPARTUREGROUPID"].ToString().Trim())
                {
                    string viewtest = "";

                    string depatureFlag = grdMain["출발처리유무", i].Value.ToString();
                    int planQty = 0;
                    
                    if (depatureFlag == "Y")
                    {
                        planQty = int.Parse(grdMain["출발수량", i].Value.ToString().Trim().Replace(",", ""));
                        viewtest = "출발수량";
                    }
                    else
                    {
                        planQty = int.Parse(grdMain["발주수량", i].Value.ToString().Trim().Replace(",", ""));
                        viewtest = "발주수량";
                    }

                    scanQty = int.Parse(ganBodyDt.Rows[0]["GOODQTY"].ToString().Trim());


                    if (planQty < scanQty + int.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")))
                    {
                        frmMessage frm1 = new frmMessage("스캔한 수량이 " + viewtest + "보다 많습니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }
                    else if (planQty == scanQty + int.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")))
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

                    grdMain["스캔수량", i].Value = (int.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")) + scanQty).ToString("###,##0");

                    scanDtInsertFlag = "OK";
                }
            }

            if(scanDtInsertFlag == "OK")
            {
                _scanDt.Rows.Add(ganban, scanQty.ToString(), ganBodyDt.Rows[0]["DEPARTUREGROUPID"].ToString().Trim());
            }

        }

        private void insert_departure()
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap1.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap1.Add("departureGroupID", txtSN.Text.Trim());


            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _departureDt.Dispose();
            _departureDt = new DataTable();
            _departureDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialInput.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if(_departureDt == null)
            {
                frmMessage frm1 = new frmMessage("다른창고 재고이거나 출발번호가 존재하지 않는 재고입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_departureDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("다른창고 재고이거나 출발번호가 존재하지 않는 재고입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            grdMain.DataBindDataSource(_departureDt, false, false);

            grdMain_Color_change();

            if (_departureDt.Rows.Count > 0)
            {
                lblDepartureCd.Text = txtSN.Text;
                txtSN.Text = "";
                lblVendor.Text = _departureDt.Rows[0]["VENDORNAME"].ToString().Trim();
                lblOrderFlag.Text = _departureDt.Rows[0]["ORDERFLAGNAME"].ToString().Trim();
            }
            txtSN_Focus();
        }

        private void grdMain_Color_change()
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["모델기준입고창고", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["출발번호", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품목", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품번", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["잔량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold);

                string depatureFlag = grdMain["출발처리유무", i].Value.ToString();

                if(depatureFlag == "Y")
                {
                    grdMain["출발수량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                    grdMain["출발수량", i].Style.BackColor = Color.DodgerBlue;
                }
                else
                {
                    grdMain["발주수량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                    grdMain["발주수량", i].Style.BackColor = Color.DodgerBlue;
                }

                grdMain["스캔수량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold | FontStyle.Underline);
                grdMain["스캔수량", i].Style.BackColor = Color.DodgerBlue;
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
                lblDepartureCd.Text = "";
                txtSN.Text = "";
                lblVendor.Text = "";
                lblOrderFlag.Text = "";
                lblDepartureCd.Text = "";
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

        private void btnInit_Click(object sender, EventArgs e)
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
            if (grdMain.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("입고대상이 존재하지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

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

                string viewtest = "";
                int nownow = grdMain.CurrentRow.Index;

                string depatureFlag = grdMain["출발처리유무", nownow].Value.ToString();
                int planQty = 0;
                int scanQty = 0;
                if (depatureFlag == "Y")
                {
                    planQty = int.Parse(grdMain["출발수량", nownow].Value.ToString().Trim().Replace(",", ""));
                    viewtest = "출발수량";
                }
                else
                {
                    planQty = int.Parse(grdMain["발주수량", nownow].Value.ToString().Trim().Replace(",", ""));
                    viewtest = "발주수량";
                }

                scanQty = int.Parse(clsStatic._dialogValue);


                if (planQty < scanQty)
                {
                    frmMessage frm1 = new frmMessage("입력한 수량이 " + viewtest + "보다 많습니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
                else if(planQty == scanQty)
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

        private void gr_label_tmp_insert(string move_id, string grkeycol)
        {
            List <Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("DIVISION_CD",     clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD",      clsStatic._COMPANY_CD);
            paramsMap.Add("MOVE_ID",         move_id);
            paramsMap.Add("TRANSFER_FLAG",   "WAIT");
            paramsMap.Add("GRKEYCOL",        grkeycol);
            paramsMap.Add("TO_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("CREATE_BY",        clsStatic._USER_ID);


            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_labelPopGrTmp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
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

        private void gr_item_tmp_insert(string moveId, string itemId, string locationCd, string vendorCd, string materialOrderId, 
                                        string materialDepartureId, string inputQty, string conversionUnitQty, string currencyCd, 
                                        string marketCd, string vendorLot, string description, string seq)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("divisionCd",          clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd",           clsStatic._COMPANY_CD);
            paramsMap.Add("moveId",              moveId);
            paramsMap.Add("itemId",              itemId);
            paramsMap.Add("transferFlag",        "WAIT");
            paramsMap.Add("locationCd",          locationCd);
            paramsMap.Add("vendorCd",            vendorCd);
            paramsMap.Add("materialOrderId",     materialOrderId);
            paramsMap.Add("materialDepartureId", materialDepartureId);
            paramsMap.Add("inputQty",            inputQty.Replace(",", ""));
            paramsMap.Add("conversionUnitQty",   conversionUnitQty.Replace(",", ""));
            paramsMap.Add("currencyCd",          currencyCd);
            paramsMap.Add("marketCd",            marketCd);
            paramsMap.Add("vendorLot",           vendorLot);
            paramsMap.Add("description",         description);
            paramsMap.Add("createBy",            clsStatic._USER_ID);
            paramsMap.Add("seq",                 seq);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_grTemp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }


        private void btnGR_Click(object sender, EventArgs e)
        {
            if(grdMain.Rows.Count <= 0)
            {
                frmMessage frm1 = new frmMessage("입고대상이 존재하지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string depatureFlag = grdMain["출발처리유무", i].Value.ToString();

                int planQty = 0;
                int scanQty = 0;
                string viewtest = "";

                if (depatureFlag == "Y")
                {
                    planQty = int.Parse(grdMain["출발수량", i].Value.ToString().Trim().Replace(",", ""));
                    viewtest = "출발수량";
                }
                else
                {
                    planQty = int.Parse(grdMain["발주수량", i].Value.ToString().Trim().Replace(",", ""));
                    viewtest = "출발수량";
                }

                scanQty = int.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", ""));

                if(planQty == scanQty || scanQty == 0)
                {
                    continue;
                }
                else
                {
                    frmMessage frm1 = new frmMessage("스캔수량은 " + viewtest + "과 일치하여야 자재입고 처리가 가능합니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }   
            }

            frmMessage frm = new frmMessage("입력한 품목들을 입고처리 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string retbuf = "";
                retbuf = get_moveSeq();

                if (retbuf == "NG")
                {
                    frmMessage frm1 = new frmMessage("현재 이동처리가 진행중입니다. 잠시후 이동처리 진행 하여 주세요.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }

                string moveId = retbuf;

                string desc = "POP 자재입고";

                for (int i = 0; i < _scanDt.Rows.Count; i++)
                {
                    string grkeycol = _scanDt.Rows[i]["GANBANID"].ToString().Trim();

                    gr_label_tmp_insert(moveId, grkeycol);
                }

                int rowcnt = 1;
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    Color color = grdMain["스캔수량", i].Style.ForeColor;

                    if(color == Color.Red)
                    {
                        string material_order_id     = ret_value(grdMain["발주번호", i].Value);
                        string item_id               = ret_value(grdMain["품목", i].Value);
                        string location_cd           = clsStatic._TOLINE;
                        string vendor_cd             = ret_value(grdMain["업체코드", i].Value);
                        string material_departure_id = ret_value(grdMain["출발번호", i].Value);
                        string qty                   = ret_value(grdMain["스캔수량", i].Value).Replace(",", "");
                        string conversion_unit_qty   = ret_value(grdMain["스캔수량", i].Value).Replace(",", "");
                        string currency_cd           = ret_value(grdMain["환종", i].Value);
                        string market_cd             = ret_value(grdMain["마켓코드", i].Value);
                        string vendor_lot            = ret_value(grdMain["자재LOT번호", i].Value);
                        string description           = "GR";
                        string seq = rowcnt.ToString();
                        rowcnt++;

                        gr_item_tmp_insert(moveId, item_id, location_cd, vendor_cd, material_order_id, material_departure_id, qty, qty, currency_cd, market_cd, vendor_lot, description, seq);
                    }
                }

                material_gr(moveId);

                txtSN.Text = lblDepartureCd.Text;
                lblDepartureCd.Text = "";
                lblVendor.Text = "";
                lblOrderFlag.Text = "";
                lblDepartureCd.Text = "";
                lblItem.Text = "";
                lblQty.Text = "";
                grdMain.RemoveAll();
                newScanDt();

                insert_departure();

                txtSN_Focus();
                return;
            }
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
                frmMessage frm1 = new frmMessage("이동처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                frmMessage frm2 = new frmMessage("이동처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage frm3 = new frmMessage("자재입고 처리가 정상적으로 처리었습니다.", "AUTOCLOSE");
            frm3.ShowDialog();
            txtSN_Focus();
            return;
        }

        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            if(grdMain.CurrentCell == null)
            {
                return;
            }
            int currentIndex = grdMain.CurrentCell.RowIndex;

            if(currentIndex < 0)
            {
                return;
            }

            string startNumber = grdMain["출발번호", currentIndex].Value.ToString();


            frmGanban frm = new frmGanban(startNumber);
            frm.ShowDialog();
        }

        private void btnScanList_Click(object sender, EventArgs e)
        {
            frmScanView frm1 = new frmScanView(_scanDt, "자재입고");
            frm1.ShowDialog();
        }

        private void btnManualPrint_Click(object sender, EventArgs e)
        {
            frmGanbanManual frm = new frmGanbanManual(lblToStock.Text, clsStatic._TOLINE);
            frm.ShowDialog();
        }

        private void frmMaterialGR_Load(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
    }
}
