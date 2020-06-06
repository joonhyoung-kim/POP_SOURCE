using SmartMom_Lib;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartMOM_POP
{
    public partial class frmDeparture : Form
    {
        DataTable _departureDt = new DataTable();
        string _selectYN = "N"; //전체선택 여부

        public frmDeparture()
        {
            InitializeComponent();

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
            lblFromDate.Text = DateTime.Now.AddDays(-7).ToString(string.Format("yyyy-MM-dd ddd", cultures));
            lblToDate.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));

            InitVendorCombo();
            InitGridList();

        }

        #region Init

        private void InitVendorCombo()
        {
            List<Dictionary<string, object>> paramsList1 = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap1 = new Dictionary<string, object>();
            paramsMap1.Add("p_err_code", "");
            paramsMap1.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap1.Add("companyCd", clsStatic._COMPANY_CD);

            paramsList1.Add(paramsMap1);

            string retvalue = "";
            DataTable vendorDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_popVendor_list.dummy", paramsList1, clsStatic._serviceSelectURL, ref retvalue);

            if (vendorDt == null)
            {
               
                return;
            }

            if (vendorDt.Rows.Count <= 0)
            {
                
                return;
            }
            comboVendor.DataSource = vendorDt;
            comboVendor.ValueMember = "code";
            comboVendor.DisplayMember = "name";
            
        }

        private void InitGridList()
        {

            // SCANQTY                                0             1                2             3           4            5            6               7                 8            9             10              11            12                    13                 14           15              16              17            18
            string[] headerText = new string[] { "발주일자",   "발주번호",      "발주업체",   "품목",     "품명",      "발주수량",  "출발수량",     "출발일자",       "잔량",      "납기일자",  "규격",          "단위",       "환산수량",           "발주구분",      "Market",      "환종",         "수정자",       "수정일",     "CHKYN",   "MATERIALORDERID" }; 
            string[] columnName = new string[] { "CREATEDATE", "ORDERGROUPID",  "VENDORNAME", "ITEMID",   "ITEMNAME",  "ORDERQTY",  "DEPARTUREQTY", "CREATEDATE",  "REMAINQTY", "ORDERDATE",   "SPECIFICATION", "UNITNAME",   "CONVERSIONUNITQTY",  "ORDERFLAGNAME", "MARKETNAME",  "CURRENCYNAME", "UPDATEBYNAME", "UPDATEDATE", "CHKYN",   "MATERIALORDERID" };
            string[] columnType = new string[] { "T",          "T",             "T",          "T",        "T",         "T",         "T",            "T",              "T",         "T",         "T",             "T",          "T",                  "T",             "T",           "T",            "T",            "T",          "T",       "T"               };
                                                                                                                                                                                                                                                                                                                                         
            int[] columnWidth    = new int[]   { 160,          170,             160,          180,        230,         180,         200,            170,              180,         200,         230,             80,           130,                  150,             130,           130,             130,           200,          100,       10                };
            bool[] columnVisible = new bool[]  { true,         true,            true,         true,       true,        true,        true,           true,             true,        true,        true,            true,         true,                 true,            true,          true,            true,          true,         false,     false             };
            bool[] columnDisable = new bool[]  { true,         true,            true,         true,       true,        true,        true,           true,             true,        true,        true,            true,         true,                 true,            true,          true,            true,          true,         true,      true              };
            string[] cellAlign = new string[]  { "C",          "C",             "L",          "L",        "L",         "R",         "R",            "C",              "R",         "C",         "L",             "C",          "R",                  "C",             "C",           "C",             "C",           "C",          "C",       "C"               };
                                                                                                                                                                                                  
            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 18);
            grdMain.DefaultCellStyle.ForeColor = Color.Black;
            grdMain.RowTemplate.Height = 70;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 19, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        #endregion

        #region 그리드 Event

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if(grdMain.Rows.Count < 1)
            {
                return;
            }

            if (e.RowIndex >= 0 && grdMain[e.ColumnIndex, e.RowIndex].OwningColumn.HeaderText == "출발일자")
            {
                edit_departure_date(e.RowIndex);
            }
            else
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
                    lblQty.Text = grdMain["출발수량", nownow].Value.ToString().Trim().Replace(",", "");
                }

                chk_select_row(e);
            }
        }

        //선택된 row 표시
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
                Debug.WriteLine("에러가뭔데2" + grdMain["CHKYN", e.RowIndex].Value);
                // 2.1 선택되어 있었을 경우 선택 해제
                if (grdMain["CHKYN", e.RowIndex].Value.ToString() == "Y")
                {
                    grdMain["CHKYN", e.RowIndex].Value = "N";

                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.White;
                        row_Color_change(e.RowIndex);
                    }

                }
                // 2.2 선택되지 않았을 경우 선택
                else
                {
                    grdMain["CHKYN", e.RowIndex].Value = "Y";
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.Yellow;
                    }
                }
            }
        }

        //그리드 전체 Row의 컬럼색 변경
        private void grdMain_Color_change()
        {
            
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                grdMain["출발수량", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["출발일자", i].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
                grdMain["출발수량", i].Style.BackColor = Color.DodgerBlue;
                grdMain["출발일자", i].Style.BackColor = Color.DodgerBlue;
            }
            
        }

        //선택된 Row의 컬럼색 변경
        private void row_Color_change(int row)
        {
            grdMain["출발수량", row].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
            grdMain["출발수량", row].Style.BackColor = Color.DodgerBlue;
            grdMain["출발일자", row].Style.Font = new Font("맑은고딕", 18, FontStyle.Bold);
            grdMain["출발일자", row].Style.BackColor = Color.DodgerBlue;
        }

        //출발일자 변경 팝업 오픈
        private void edit_departure_date(int row)
        {
            clsStatic._dialogValue = "";

            frmNowDate frm = new frmNowDate(grdMain["출발일자", row].Value.ToString());
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                grdMain["출발일자", row].Value = clsStatic._dialogValue.Split(' ')[0].ToString();
                clsStatic._dialogValue = "";
            }
        }
        
        #endregion

        #region 출발처리 리스트 조회 Event
        /// <summary>
        /// 조회 버튼 클릭
        /// </summary>
        private void btnListSearch_Click(object sender, EventArgs e)
        {
            if(lblFromDate.Text == "" || lblToDate.Text == "")
            {

                return;
            }
            if (comboVendor.SelectedValue== null)
            {
                return;
            }
            if (comboVendor.SelectedValue.ToString() == "")
            {
                return;
            }
           

            get_materialDeparture_list();
        }

        /// <summary>
        /// 출발처리 리스트 조회
        /// </summary>
        private void get_materialDeparture_list()
        {
            string fromdate = lblFromDate.Text.Split(' ')[0];
            string todate = lblToDate.Text.Split(' ')[0];

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("fromDate", fromdate);
            paramsMap.Add("toDate", todate);
            paramsMap.Add("vendorCd", comboVendor.SelectedValue.ToString());
            paramsList.Add(paramsMap);

            string retvalue = "";

            _departureDt.Dispose();
            _departureDt = new DataTable();
            _departureDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialDeparture_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            grdMain.RemoveAll();
            if (_departureDt == null)
            {
                grdMain.RemoveAll();
                return;
            }

            if (_departureDt.Rows.Count == 0)
            {
                grdMain.RemoveAll();
                return;
            }

            grdMain.DataBindDataSource(_departureDt, false, false);
            grdMain_Color_change();
        }

        #endregion
        
        #region 화면 상단 Control Event
        /// <summary>
        /// 일자 컨트롤 클릭
        /// </summary>
        private void lblFromDate_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmNowDate frm = new frmNowDate(lblFromDate.Text.Split(' ')[0]);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblFromDate.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        private void lblToDate_Click(object sender, EventArgs e)
        {
            clsStatic._dialogValue = "";

            frmNowDate frm = new frmNowDate(lblToDate.Text.Split(' ')[0]);
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblToDate.Text = clsStatic._dialogValue;

                clsStatic._dialogValue = "";
            }
        }

        /// <summary>
        /// 닫기 버튼 클릭
        /// </summary>
        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }
        #endregion

        #region 화면 하단 Control Event

        /// <summary>
        /// 수동수량 입력 버튼 클릭
        /// </summary>
        private void btnInput_Click(object sender, EventArgs e)
        {
            if(lblItem.Text == "")
            {
                frmMessage2 frm1 = new frmMessage2("수량입력할 행을 선택해주세요.","AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            if (lblQty.Text.Trim() == "")
            {
                lblQty.Text = "0";
            }

            clsStatic._dialogValue = "";

            int selectedRow = grdMain.CurrentRow.Index;

            frmLoginIDInsert2 frm = new frmLoginIDInsert2(lblQty.Text.Trim().Replace(",", ""));
            frm.ShowDialog();

            if (clsStatic._dialogValue != "")
            {
                lblQty.Text = double.Parse(clsStatic._dialogValue).ToString("######.##");

                int nownow = grdMain.CurrentRow.Index;

                double departureQty = double.Parse(clsStatic._dialogValue);
                double orderQty = double.Parse(grdMain["발주수량", nownow].Value.ToString());

                if (orderQty <= departureQty)
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

                grdMain["출발수량", nownow].Value = double.Parse(clsStatic._dialogValue).ToString("######.##");

                clsStatic._dialogValue = "";
            }
        }


        /// <summary>
        /// 간판라벨 발행(Split) 버튼 클릭
        /// </summary>
        private void btnManualPrint_Click(object sender, EventArgs e)
        {
            frmGanbanSplit frm = new frmGanbanSplit();
            frm.ShowDialog();
        }

        /// <summary>
        /// 화면 초기화 버튼 클릭
        /// </summary>
        private void btnPageInit_Click(object sender, EventArgs e)
        {
            frmMessage2 frm = new frmMessage2("현재 화면을 초기화 하시겠습니까?", "OK_CANCEL");
            DialogResult result = frm.ShowDialog();

            if (result == DialogResult.OK)
            {
                lblItem.Text = "";
                lblQty.Text = "";
                grdMain.RemoveAll();
            }
        }

        #endregion

        #region 출발처리 Event

        private void btnDeparture_Click(object sender, EventArgs e)
        {
            //tmp 테이블 데이터 삭제
            remove_materialDeliveryTemp();

            int dpQty = 0;
            //tmp 테이블 데이터 insert
            for (int i = 0; i < grdMain.Rows.Count;  i++)
            {
                if (grdMain["CHKYN", i].Value.ToString() == "Y") //출발처리여부 검사
                {
                    string materialOrderId = grdMain["MATERIALORDERID", i].Value.ToString();
                    string departureQty = grdMain["출발수량", i].Value.ToString().Replace(",","");
                    string departureDate = grdMain["출발일자", i].Value.ToString();
                    string conversionUnitQty = grdMain["환산수량", i].Value.ToString();

                    create_materialDeliveryTemp(materialOrderId, departureQty, departureDate, conversionUnitQty);

                    dpQty++;
                }
            }

            if (dpQty > 0)
            {
                //출발처리
                create_materialDelivery();

                //MAX 출발번호 취득
                get_maxDepartureGroupId();
                
            }
            else
            {
                frmMessage2 frm = new frmMessage2("출발처리 할 대상이 없습니다.", "AUTOCLOSE");
                frm.ShowDialog();
            }

            //출발처리 리스트 재조회
            get_materialDeparture_list();


        }

        private void remove_materialDeliveryTemp()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("departureType", "D");
            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.remove_materialDepartureTemp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);
        }

        private void create_materialDeliveryTemp(string materialOrderId, string departureQty, string departureDate, string conversionUnitQty)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("materialOrderId", materialOrderId);
            paramsMap.Add("departureQty", departureQty);
            paramsMap.Add("departureDate", departureDate);
            paramsMap.Add("description", "");
            paramsMap.Add("departureType", "D");
            paramsMap.Add("vendorLot", "");
           // paramsMap.Add("checkFlag", "N");
            paramsMap.Add("conversionUnitQty", conversionUnitQty);
            paramsMap.Add("seq", "");
            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_materialDepartureTemp.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);

        }

        private void create_materialDelivery()
        {
            try
            {
                List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
                Dictionary<string, object> paramsMap = new Dictionary<string, object>();
                paramsMap.Add("p_err_code", "");
                paramsMap.Add("p_err_msg", "");
                paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
                paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
                paramsMap.Add("departureType", "D");
                paramsMap.Add("userId", clsStatic._USER_ID);
                paramsList.Add(paramsMap);

                string retvalue = "";

                DataTable result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.create_materialDeparture.dummy", paramsList, clsStatic._serviceUsertURL, ref retvalue);


                if (result == null)
                {
                    frmMessage2 frm = new frmMessage2("출발처리 실패하였습니다.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (result.Rows.Count == 0)
                {
                    frmMessage2 frm = new frmMessage2("출발처리 실패하였습니다.", "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                if (result.Rows[0]["p_err_code"].ToString() != "S")
                {
                    frmMessage2 frm = new frmMessage2("ERROR! : " + result.Rows[0]["p_err_msg"].ToString(), "AUTOCLOSE");
                    frm.ShowDialog();
                    return;
                }

                frmMessage2 frm1 = new frmMessage2("출발처리 완료되었습니다.", "AUTOCLOSE");
                frm1.ShowDialog();
            }
            catch(Exception ex)
            {
                frmMessage2 frm = new frmMessage2(ex.Message.ToString(), "AUTOCLOSE");
                frm.ShowDialog();
            }
        }

        private void get_maxDepartureGroupId()
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
            Debug.WriteLine(clsStatic._dialogValue + "그룹아이디 넣기전");
            clsStatic._dialogValue = dt.Rows[0]["DEPARTUREGROUPID"].ToString();
            Debug.WriteLine(clsStatic._dialogValue + "그룹아이디 넣은후");
        }

        #endregion

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void comboVendor_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
