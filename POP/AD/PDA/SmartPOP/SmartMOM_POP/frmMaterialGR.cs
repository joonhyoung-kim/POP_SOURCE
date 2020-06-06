using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
namespace SmartMOM_POP
{
    public partial class frmMaterialGR : Form
    {
        DataTable _departureDt = new DataTable();
        DataTable _scanDt = new DataTable();
        DataSet _BasicDs = new DataSet();
        private object lblVendorName;
        string _selectYN = "N";
        public frmMaterialGR()
        {
            InitializeComponent();
            _BasicDs = clsLabelSet.basic_info_search(clsStatic._MACADDRESS);


            lblToStock.Text = clsStatic._TOLINE_DESC + "(" + clsStatic._TOLINE + ")";

            InitGridList();

            get_maxDepartureGroupId2();

            //  string departureNo = clsStatic._dialogValue;
            
            search_departure_list();
            btnSet_Click(null, null);



        }
        private void get_maxDepartureGroupId2()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_maxDepartureGroupId.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (dt == null)
            {
                clsStatic._dialogValue = "";
                return;
            }

            if (dt.Rows.Count == 0)
            {
                clsStatic._dialogValue = "";
                return;
            }

            clsStatic._dialogValue = dt.Rows[0]["DEPARTUREGROUPID"].ToString();

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
            //                                   0                    1                    2        3          4             5                6           7              8         9              10         11         12         13           14              15           16              17             18             19          20            21            22             23
            string[] headerText = new string[] { "모델기준입고창고", "출발번호",        "간판ID",      "품목",  "품명",     "타입",       "규격",         "발주수량","출발수량",    "스캔수량","잔량",           "박스수량", "단위",       "납기일",    "출발일",       "업체코드", "발주번호",      "마켓코드", "출발처리유무",   "CHKYN", "라벨발행유무", "간판라벨타입",   "환종",      "자재LOT번호",  };
            string[] columnName = new string[] { "LOCATIONNAME", "MATERIALDEPARTUREID", "GANBANID", "ITEMID","ITEMNAME","ITEMTYPENAME","SPECIFICATION","ORDERQTY","DEPARTUREQTY","SCANQTY", "ORDERREMAINQTY", "POPCTQTY", "UNITNAME",  "ORDERDATE", "DEPARTUREDATE","VENDORCD", "MATERIALORDERID","MARKETCD","DEPARTUREFLAG",  "CHKYN", "GANBANYN", "    GANBANLABELYN", "CURRENCYCD", "VENDORLOT" };

            string[] columnType = new string[] { "T",   "T","T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T", "T" };
            int[] columnWidth = new int[] { 200, 230,230, 180, 270, 95, 200, 180, 200, 200, 180, 130, 250, 250, 250, 250, 250, 250, 150,100, 150, 150, 0, 0 };
            bool[] columnVisible = new bool[] { false, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false,true, true, true, true };
            bool[] columnDisable = new bool[] { true, true,false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true,true, true, true, true, true };
            string[] cellAlign = new string[] { "C", "C","C", "L", "L", "C", "L", "R", "R", "R", "C", "C", "C", "C", "C", "C", "C", "C", "C", "C","C", "C", "C", "C" };

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
                if (txtSN.Text.Trim() == "")
                {
                    return;
                }
              /*  if (lblDepartureCd.Text == "")
                {
                    insert_departure();
                }*/
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
            paramsMap1.Add("GANBAN_ID", ganban);
            paramsMap1.Add("DEPARTURE_GROUP_ID", "");
            //paramsMap1.Add("GANBAN_TYPE", "DP");
            paramsMap1.Add("dateFlag", "");
            paramsMap1.Add("USE_YN", "Y");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable ganBodyDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getGanbanBodyList.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (ganBodyDt == null)
            {
                frmMessage2 frm1 = new frmMessage2("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (ganBodyDt.Rows.Count == 0)
            {
                frmMessage2 frm1 = new frmMessage2("입력한 간판번호가 존재하지 않거나 사용 불가 처리 된 간판라벨 입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string ganbanType = ganBodyDt.Rows[0]["GANBANTYPE"].ToString();

            if (ganbanType != "DP")
            {
                frmMessage2 frm1 = new frmMessage2("원부자재 라벨이 아닙니다. 다시한번 확인하여 주세요.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            DataRow[] drs = _scanDt.Select("GANBANID = '" + ganban + "'");

            if (drs.Length > 0)
            {
                frmMessage2 frm1 = new frmMessage2("이미 입력한 간판라벨입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string dtItem_id = "";
            double scanQty = 0;
            string scanDtInsertFlag = "NO";


            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                string grid_departure = grdMain["출발번호", i].Value.ToString();

                if (grid_departure == ganBodyDt.Rows[0]["DEPARTUREGROUPID"].ToString().Trim())
                {
                    string viewtest = "";

                    string depatureFlag = grdMain["출발처리유무", i].Value.ToString();
                    double planQty = 0;

                    if (depatureFlag == "Y")
                    {
                        planQty = double.Parse(grdMain["출발수량", i].Value.ToString().Trim().Replace(",", ""));
                        viewtest = "출발수량";
                    }
                    else
                    {
                        planQty = double.Parse(grdMain["발주수량", i].Value.ToString().Trim().Replace(",", ""));
                        viewtest = "발주수량";
                    }

                    scanQty = double.Parse(ganBodyDt.Rows[0]["QTY"].ToString().Trim());


                    if (planQty < scanQty + double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")))
                    {
                        frmMessage2 frm1 = new frmMessage2("스캔한 수량이 " + viewtest + "보다 많습니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }
                    else if (planQty == scanQty + double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")))
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

                    grdMain["스캔수량", i].Value = (double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", "")) + scanQty).ToString("###,##0.##");

                    scanDtInsertFlag = "OK";
                }
            }

            if (scanDtInsertFlag == "OK")
            {
                _scanDt.Rows.Add(ganban, scanQty.ToString(), ganBodyDt.Rows[0]["DEPARTUREGROUPID"].ToString().Trim());
            }

        }

        private void insert_departure()
        {

            string departureNo = "";    

            if (txtSN.Text == "")
            {

                departureNo = lblDepartureCd.Text;
            }
            else
            {
                Debug.WriteLine(lblDepartureCd.Text);
                Debug.WriteLine(txtSN.Text);
                departureNo = txtSN.Text;
            }

            if (!chk_departure_no(departureNo)) //출발그룹번호 유효한지 검사
            {
                return;
            }

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap1.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap1.Add("departureGroupID", departureNo);
            paramsMap1.Add("locationCd", clsStatic._TOLINE);
            //paramsMap1.Add("flag", "DEPARTURE");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _departureDt.Dispose();
            _departureDt = new DataTable();
            _departureDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialInput.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (_departureDt == null)
            {
                frmMessage2 frm1 = new frmMessage2("존재하지 않는 출발번호입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

               if (_departureDt.Rows.Count == 0 )
                {
                   search_departure_list();

                btnSet_Click(null, null);
                    
                }

            grdMain.DataBindDataSource(_departureDt, false, false);

            grdMain_Color_change();

            if (_departureDt.Rows.Count > 0)
            {
                lblDepartureCd.Text = departureNo;
                txtSN.Text = "";
                //lblVendor.Text = _departureDt.Rows[0]["VENDORNAME"].ToString().Trim();
               // lblOrderFlag.Text = _departureDt.Rows[0]["ORDERFLAGNAME"].ToString().Trim();
            }

            newScanDt();
            lblItem.Text = "";
            lblQty.Text = "";
            txtSN_Focus();
        }
        
       

        private void search_departure_list()
        {

            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap1.Add("companyCd", clsStatic._COMPANY_CD);      
            paramsMap1.Add("locationCd", clsStatic._TOLINE);
            paramsMap1.Add("flag", "CANCEL");

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            _departureDt.Dispose();
            _departureDt = new DataTable();
            _departureDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialInput_list.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            /*if (_departureDt == null)
            {
                frmMessage frm1 = new frmMessage("존재하지 않는 출발번호입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (_departureDt.Rows.Count == 0)
            {
                frmMessage frm1 = new frmMessage("존재하지 않는 출발번호입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }*/
            
            grdMain.DataBindDataSource(_departureDt, false, false);
             
          

            if (_departureDt.Rows.Count > 0)
            {
                //lblDepartureCd.Text = departureNo;
                txtSN.Text = "";
               // lblVendor.Text = _departureDt.Rows[0]["VENDORNAME"].ToString().Trim();
               // lblOrderFlag.Text = _departureDt.Rows[0]["ORDERFLAGNAME"].ToString().Trim();
            }
            
            grdMain_Color_change();
            newScanDt();
            lblItem.Text = "";
            lblQty.Text = "";
            
            txtSN_Focus();
            
        }
        private bool chk_departure_no(string departureNo)
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap1.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap1.Add("P_DEPARTURE_ID", departureNo);

            paramsList1.Add(paramsMap1);

            string retvalue = "";

            DataTable chkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.chk_material_departure.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (chkDt == null)
            {
                frmMessage2 frm1 = new frmMessage2("존재하지 않는 출발번호입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return false;
            }

            if (chkDt.Rows.Count == 0)
            {
                frmMessage2 frm1 = new frmMessage2("존재하지 않는 출발번호입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return false;
            }


            int locCnt = 0;
            int departure = 0;
            int cancel = 0;

            for (int i = 0; i < chkDt.Rows.Count; i++)
            {
                Console.WriteLine("state=" + chkDt.Rows[i]["DEPARTURESTATE"].ToString());
                if (chkDt.Rows[i]["DEPARTURESTATE"].ToString() == "CANCEL")
                {
                    cancel = 1;
                }
                if (chkDt.Rows[i]["DEPARTURESTATE"].ToString() == "DEPARTURE")
                {
                    departure = 1;
                }

                if (chkDt.Rows[i]["FACILITYCD"].ToString() == clsStatic._TOLINE)
                {
                    locCnt = 1;
                }

            }
            /*if (locCnt == 0)
            {
                frmMessage frm1 = new frmMessage($"{clsStatic._TOLINE}({clsStatic._TOLINE_DESC})창고에 입고할 대상이 존재하지 않는 출발번호입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return false;
            }*/

            if (cancel == 1)
            {
                return true;
            }
            else if (departure == 0)
            {
                frmMessage2 frm1 = new frmMessage2("이미 입고처리 완료된 출발번호입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return false;
            }



            return true;

        }
        private void row_Color_change(int row)
        {
            //grdMain["출발수량", row].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold);
          //  grdMain["출발수량", row].Style.BackColor = Color.DodgerBlue;
           // grdMain["스캔수량", row].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold);
           // grdMain["스캔수량", row].Style.BackColor = Color.DodgerBlue;
        }
        private void grdMain_Color_change()
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["모델기준입고창고", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["출발번호", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품목", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["품명", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["잔량", i].Style.Font = new Font("맑은고딕", 20, FontStyle.Bold);

                string depatureFlag = grdMain["출발처리유무", i].Value.ToString();

                if (depatureFlag == "Y")
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
            frmMessage2 frm = new frmMessage2("현재 화면을 초기화 하시겠습니까?", "OK_CANCEL");
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
                lblVendor.Text = "";
                lblOrderFlag.Text = "";
            }
            else
            {
                int nownow = grdMain.CurrentRow.Index;
                lblItem.Text = grdMain["품목", nownow].Value.ToString();
                lblQty.Text = grdMain["스캔수량", nownow].Value.ToString().Trim().Replace(",", "");
                lblVendor.Text = _departureDt.Rows[nownow]["VENDORNAME"].ToString().Trim(); //grdMain["업체코드", nownow].Value.ToString();
                lblOrderFlag.Text = _departureDt.Rows[nownow]["ORDERFLAGNAME"].ToString().Trim();
                lblDepartureCd.Text=_departureDt.Rows[nownow]["MATERIALDEPARTUREID"].ToString().Trim();
              //  txtSN.Text = _departureDt.Rows[nownow]["GANBANID"].ToString().Trim();

            }
            chk_select_row(e);
        }
        private void chk_select_row(DataGridViewCellEventArgs e)
        {
            // 1. 그리드 컬럼헤더 영역 클릭했을 경우
            if (e.ColumnIndex == 0 && e.RowIndex < 0 && grdMain.Rows.Count > 0)
            {
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    if (_selectYN == "Y")
                    {
                        // 1.1 전체선택 해제
                        grdMain["CHKYN", i].Value = "N";

                        for (int j = 1; j < grdMain.ColumnCount; j++)
                        {
                            grdMain[j, i].Style.BackColor = Color.White;
                            row_Color_change(i);

                        }
                    }
                    else
                    {
                        grdMain["CHKYN", i].Value = "Y";
                        for (int j = 1; j < grdMain.ColumnCount; j++)
                        {
                            grdMain[j, i].Style.BackColor = Color.Yellow;
                            
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
            else if (e.RowIndex >= 0)
            {
                Debug.WriteLine("에러가뭔데1" + e.RowIndex);
                Debug.WriteLine("에러가뭔데2"+ grdMain["CHKYN", e.RowIndex].Value);
                // 2.1 선택되어 있었을 경우 선택 해제
                if (grdMain["CHKYN", e.RowIndex].Value.ToString() == "Y")
                {
                    grdMain["CHKYN", e.RowIndex].Value = "N";

                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.White;
                        row_Color_change(e.RowIndex);
                        grdMain[j, e.RowIndex].Style.Font = new Font("맑은고딕", 18);
                    }

                }
                // 2.2 선택되지 않았을 경우 선택
                else
                {
                    grdMain["CHKYN", e.RowIndex].Value = "Y";
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.Yellow;
                        grdMain[j, e.RowIndex].Style.Font = new Font("맑은고딕", 19, FontStyle.Bold);
                    }
                }
            }
        }
        private void btnInput_Click(object sender, EventArgs e)
        {
            if (grdMain.Rows.Count <= 0)
            {
                frmMessage2 frm1 = new frmMessage2("입고대상이 존재하지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            int selectedRow = grdMain.CurrentRow.Index;

            if (grdMain["CHKYN", selectedRow].Value.ToString() == "N")
            {
                frmMessage2 frm1 = new frmMessage2("데이터 체크상태(노랑색) 확인바람", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }
                /*
                if (grdMain["라벨발행유무", selectedRow].Value.ToString().Equals("Y") || grdMain["간판라벨타입", selectedRow].Value.ToString().Equals("Y"))
                {
                    frmMessage frm1 = new frmMessage("이미 라벨이 발행되었거나, 간판라벨 관리 대상 품목 입니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
                */
                if (lblQty.Text.Trim() == "")
            {
                lblQty.Text = "0";
            }

            clsStatic._dialogValue = "";

            frmLoginIDInsert2 frm = new frmLoginIDInsert2(lblQty.Text.Trim().Replace(",", ""));
            frm.ShowDialog();
            
            if (clsStatic._dialogValue != "")
            {
                lblQty.Text = double.Parse(clsStatic._dialogValue).ToString("###,##0.##");
                
                string viewtest = "";
                int nownow = grdMain.CurrentRow.Index;

                string depatureFlag = grdMain["출발처리유무", nownow].Value.ToString();
                double planQty = 0;
                double scanQty = 0;
                if (depatureFlag == "Y")
                {
                    planQty = double.Parse(grdMain["출발수량", nownow].Value.ToString().Trim().Replace(",", ""));
                    viewtest = "출발수량";
                }
                else
                {
                    planQty = double.Parse(grdMain["발주수량", nownow].Value.ToString().Trim().Replace(",", ""));
                    viewtest = "발주수량";
                }
                Debug.WriteLine(clsStatic._dialogValue + "세번째");
                scanQty = double.Parse(clsStatic._dialogValue);


                if (planQty < scanQty)
                {
                    frmMessage2 frm1 = new frmMessage2("입력한 수량이 " + viewtest + "보다 많습니다.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    txtSN_Focus();
                    return;
                }
                else if (planQty == scanQty)
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
                Debug.WriteLine(clsStatic._dialogValue + "네번째");
                grdMain["스캔수량", nownow].Value = double.Parse(clsStatic._dialogValue).ToString("###,##0.##");

                clsStatic._dialogValue = "";
            }
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
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("moveId", moveId);
            paramsMap.Add("itemId", itemId);
            paramsMap.Add("transferFlag", "WAIT");
            paramsMap.Add("locationCd", locationCd);
            paramsMap.Add("vendorCd", vendorCd);
           
            paramsMap.Add("materialOrderId", materialOrderId);
            paramsMap.Add("materialDepartureId", materialDepartureId);
            paramsMap.Add("inputQty", inputQty.Replace(",", ""));
            paramsMap.Add("conversionUnitQty", conversionUnitQty.Replace(",", ""));
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


        private void btnGR_Click(object sender, EventArgs e)
        {
            


            if (grdMain.Rows.Count <= 0)
            {
                frmMessage2 frm1 = new frmMessage2("입고대상이 존재하지 않습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                if (grdMain["CHKYN", i].Value.ToString() == "Y")
                {
    
                    string depatureFlag = grdMain["출발처리유무", i].Value.ToString();

                    double planQty = 0;
                    double scanQty = 0;
                    string viewtest = "";

                    if (depatureFlag == "Y")
                    {
                        planQty = double.Parse(grdMain["출발수량", i].Value.ToString().Trim().Replace(",", ""));
                        viewtest = "출발수량";
                    }
                    else
                    {
                        planQty = double.Parse(grdMain["발주수량", i].Value.ToString().Trim().Replace(",", ""));
                        viewtest = "출발수량";
                    }

                    scanQty = double.Parse(grdMain["스캔수량", i].Value.ToString().Trim().Replace(",", ""));

                    if (planQty == scanQty || scanQty == 0)
                    {
                        continue;
                    }
                    else
                    {
                        frmMessage2 frm1 = new frmMessage2("스캔수량은 " + viewtest + "과 일치하여야 자재입고 처리가 가능합니다.", "AUTOCLOSE");
                        frm1.ShowDialog();
                        txtSN_Focus();
                        return;
                    }
                }
            }

            frmMessage2 frm = new frmMessage2("입력한 품목들을 입고처리 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                string retbuf = "";
                retbuf = get_moveSeq();

                if (retbuf == "NG")
                {
                    frmMessage2 frm1 = new frmMessage2("현재 입고처리가 진행중입니다. 잠시후 입고처리 진행 하여 주세요.", "AUTOCLOSE");
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
                        if (grdMain["CHKYN", i].Value.ToString() == "Y")
                        {
                            Color color = grdMain["스캔수량", i].Style.ForeColor;

                            if (color == Color.Red)
                            {
                                string material_order_id = ret_value(grdMain["발주번호", i].Value);
                                string item_id = ret_value(grdMain["품목", i].Value);
                                string location_cd = clsStatic._TOLINE;
                                string vendor_cd = ret_value(grdMain["업체코드", i].Value);
                                string material_departure_id = ret_value(grdMain["출발번호", i].Value);
                                string qty = ret_value(grdMain["스캔수량", i].Value).Replace(",", "");
                                string conversion_unit_qty = ret_value(grdMain["스캔수량", i].Value).Replace(",", "");
                                string currency_cd = ret_value(grdMain["환종", i].Value);
                                string market_cd = ret_value(grdMain["마켓코드", i].Value);
                                string vendor_lot = ret_value(grdMain["자재LOT번호", i].Value);
                                string description = "GR";
                                string seq = rowcnt.ToString();
                                rowcnt++;

                                gr_item_tmp_insert(moveId, item_id, location_cd, vendor_cd, material_order_id, material_departure_id, qty, qty, currency_cd, market_cd, vendor_lot, description, seq);
                            }
                        }
                    }

                    //자재입고
                    material_gr(moveId);
                }
                catch (Exception ex)
                {
                    delete_temp(moveId, "GR");
                    frmMessage2 frm1 = new frmMessage2("입고처리가 실패하였습니다. 잠시후 입고처리 진행 하여 주세요.", "AUTOCLOSE");
                    frm1.ShowDialog();
                }


                
               txtSN.Text = lblDepartureCd.Text;
                lblDepartureCd.Text = "";
                lblVendor.Text = "";
                lblOrderFlag.Text = "";
                lblDepartureCd.Text = "";
                lblItem.Text = "";
                lblQty.Text = "";
                grdMain.RemoveAll();
                
                search_departure_list();
                //insert_departure();
                newScanDt();
                txtSN_Focus();
                return;
            }
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

        private void delete_temp(string moveId, string tmpType)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("p_err_msg", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_TMP_TYPE", tmpType);
            paramsMap.Add("P_TMP_ID", moveId);
            paramsList.Add(paramsMap);
            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.del_TmpData_proc.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
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
            DataTable moveDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_mat_gr_proc_new.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (moveDt == null)
            {
                frmMessage2 frm1 = new frmMessage2("자재입고 처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (moveDt.Rows.Count == 0)
            {
                frmMessage2 frm2 = new frmMessage2("자재입고 처리가 정상적으로 처리되지 않았습니다.", "AUTOCLOSE");
                frm2.ShowDialog();
                txtSN_Focus();
                return;
            }

            frmMessage2 frm3 = new frmMessage2("자재입고 처리가 정상적으로 처리되었습니다.", "AUTOCLOSE");
            frm3.ShowDialog();
            txtSN_Focus();
            return;
        }

        private void btnLabelPrintAuto_Click(object sender, EventArgs e) //간판라벨 자동생성 
        {
            if (_departureDt.Rows.Count == 0)
            {
                frmMessage2 frm1 = new frmMessage2("조회된 입고예정 자재가 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            string retbuf = "";
            retbuf = get_ganbanSeq();//라벨 발행중인지 체크

            if (retbuf == "NG")
            {
                frmMessage2 frm1 = new frmMessage2("현재 라벨발행 진행중입니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                txtSN_Focus();
                return;
            }

            for (int i = 0; i < _departureDt.Rows.Count; i++) 
            {
                if (_departureDt.Rows[i]["GANBANYN"].ToString().Equals("N") && _departureDt.Rows[i]["GANBANLABELYN"].ToString().Equals("N"))
                {
                    frmMessage2 frm1 = new frmMessage2($"간판라벨 디자인이 설정되지 않았습니다. 기본정보 설정 후 다시 시도해주십시오.\n품목 : {_departureDt.Rows[i]["ITEMID"].ToString()}", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }
            }

            frmMessage2 frm = new frmMessage2("자동 간판라벨발행을 실행 하시겠습니까?(박스구성수량 기준)", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();
            if (result == DialogResult.OK)
            {

                try
                {
                    int printQty = 0;

                    for (int i = 0; i < _departureDt.Rows.Count; i++)
                    {
                        //_departureDt.Rows[i]["GANBANYN"].ToString().Equals("N") &&
                        if (_departureDt.Rows[i]["GANBANLABELYN"].ToString().Equals("Y"))
                        {
                            //int pollibleQty = int.Parse(_departureDt.Rows[i]["DEPARTUREQTY"].ToString().Replace(",", ""));
                            double pollibleQty = double.Parse(get_pollibleQty(_departureDt.Rows[i]["MATERIALDEPARTUREID"].ToString())); //출발처리수량-간판라벨 출력수량
                            int makeqty = Convert.ToInt32(System.Math.Truncate(pollibleQty / double.Parse(_departureDt.Rows[i]["POPCTQTY"].ToString().Replace(",", ""))));//실제 출발처리수량 /박스구성수량
                            string etc = (pollibleQty % double.Parse(_departureDt.Rows[i]["POPCTQTY"].ToString().Replace(",", ""))).ToString("####0.##");

                            for (int j = 0; j < makeqty; j++)
                            {
                                make_ganban(retbuf, _departureDt.Rows[i]["POPCTQTY"].ToString().Replace(",", ""), _departureDt.Rows[i]["ITEMID"].ToString(), _departureDt.Rows[i]["MATERIALDEPARTUREID"].ToString());
                                Thread.Sleep(500);
                            }

                            if (double.Parse(etc) > 0)
                            {
                                make_ganban(retbuf, etc, _departureDt.Rows[i]["ITEMID"].ToString(), _departureDt.Rows[i]["MATERIALDEPARTUREID"].ToString());
                            }

                            txtSN_Focus();

                            printQty++;
                        }
                    }

                    if (printQty > 0)
                    {
                        ganban_print(retbuf);
                    }

                }
                catch (Exception ex)
                {
                    delete_temp(retbuf, "GANBAN");
                    frmMessage frm1 = new frmMessage("라벨 발행에 실패 했습니다. 잠시 후 다시 시도 하세요.", "AUTOCLOSE");
                    frm1.ShowDialog();
                }

                //insert_departure();
                get_maxDepartureGroupId2();

                //  string departureNo = clsStatic._dialogValue;

                search_departure_list();
            }
        }

        private void btnLabelPrint_Click(object sender, EventArgs e)
        {
            if (grdMain.CurrentCell == null)
            {
                return;
            }
            int currentIndex = grdMain.CurrentCell.RowIndex;

            if (currentIndex < 0)
            {
                return;
            }

            string startNumber = grdMain["출발번호", currentIndex].Value.ToString();


            frmGanban frm = new frmGanban(startNumber);
            frm.ShowDialog();

            insert_departure();
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

        private string get_pollibleQty(string materialdepartureId)
        {
            string qty = "0";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("DEPARTURE_GROUP_ID", materialdepartureId);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getganbanqty.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                qty = "0";
            }

            if (checkDt.Rows.Count <= 0)
            {
                qty = "0";
            }

            qty = checkDt.Rows[0]["QTY"].ToString();

            return qty;
        }


        private string get_defbin()
        {
            string def_bin = "";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("LOCATION_CD", clsStatic._TOLINE);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable checkDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.getInDefaultBin.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (checkDt == null)
            {
                def_bin = "";
            }

            if (checkDt.Rows.Count <= 0)
            {
                def_bin = "";
            }

            def_bin = checkDt.Rows[0]["BINID"].ToString();

            return def_bin;
        }

        private void make_ganban(string labelid, string makeGanban, string itemId, string materialdepartureId)
        {
            string ganban = "";
            string depature = "";

            ganban = "-";
            depature = materialdepartureId;

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
            paramsMap.Add("P_WORK_ORDER_ID", "");
            paramsMap.Add("P_GANBANTYPE", "DP");
            paramsMap.Add("P_GOOD_QTY", makeGanban);
            paramsMap.Add("P_FROM_SLOC", "");
            paramsMap.Add("P_SLOC", clsStatic._TOLINE);
            paramsMap.Add("P_VENDOR_CD", "-");
            paramsMap.Add("P_DESCRIPTION", "from DEPATURE");
            paramsMap.Add("P_PA_GANBAN_ID", ganban);
            paramsMap.Add("P_CREATE_BY", clsStatic._USER_ID);

            paramsList.Add(paramsMap);
            string retvalue = "";
            DataTable ganbanAddDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_ganbaninsert_proc_new1.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

            if (ganbanAddDt == null)
            {
                frmMessage2 frm1 = new frmMessage2("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows.Count == 0)
            {
                frmMessage2 frm1 = new frmMessage2("간판라벨 생성이 실패했습니다.(" + ganbanAddDt.Rows[0]["p_err_msg"].ToString() + ")", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (ganbanAddDt.Rows[0]["p_err_code"].ToString().Equals("ERROR"))
            {
                throw new Exception();
            }
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
                frmMessage2 frm1 = new frmMessage2("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (checkDt.Rows.Count <= 0)
            {
                frmMessage2 frm1 = new frmMessage2("출력할 간판라벨이 없습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            for (int i = 0; i < checkDt.Rows.Count; i++)
            {
                clsLabelSet.label_print(clsStatic._MACADDRESS, clsStatic._PRINTID, "", "", "", checkDt.Rows[i]["GANBANID"].ToString(), "", ref _BasicDs);
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


        private void btnDeparture_Click(object sender, EventArgs e)
        {
            frmDeparture frm = new frmDeparture();
            frm.ShowDialog();
            
            if (clsStatic._dialogValue != "")
            {

                txtSN.Text = clsStatic._dialogValue;
                insert_departure();
            }
        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void txtSN_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
