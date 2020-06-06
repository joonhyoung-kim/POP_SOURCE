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
    public partial class ucMaterialGR : UserControl
    {
        string _now_date = "";
        string _move_id = "";
        string _selectYN = "N"; //전체선택 여부

        DataTable _gridDt = new DataTable();
        DataSet _BasicDs = new DataSet();

        public ucMaterialGR()
        {
            InitializeComponent();

            InitMainList();

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
            btnDate.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                   1         2           3                4         5              6              7                      8           9   
            string[] headerText = new string[] { "ItemId", "ItemName", "Specification", "IOQty",  "VendorName",  "BoxQty",      "ItemstockInputId",    "LabelYN",  "ChkYN"  , "DepartureId"     , "VendorCd" };
            string[] columnName = new string[] { "ITEMID", "ITEMNAME", "ITEMTYPENAME",  "QTY",    "VENDOR_NAME", "POPCTQTY",    "ITEMSTOCKINOUTID",    "LABELYN",  "CHKYN"  , "ITEMDEPARTUREID" , "VENDORCD"};
            string[] columnType = new string[] { "T",      "T",        "T",             "T",      "T",           "T",           "T",                   "T",        "T"      , "T"               , "T"       };
                                                                                                                                                      
            int[] columnWidth    = new int[]   { 230,      250,        180,             150,      180,           100,           90,                    90,         10       , 100               , 100       };
            bool[] columnVisible = new bool[]  { true,     true,       true,            true,     true,          true,          false,                 false,      false    , false             , false     };
            bool[] columnDisable = new bool[]  { true,     true,       true,            true,     true,          true,          true,                  true,       true     , true              , true      };
            string[] cellAlign = new string[]  { "L",      "C",        "R",             "R",      "L",           "C",           "C",                   "L",        "L"      , "C"               , "C"       };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
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
            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");
            btnDate.Text = DateTime.Now.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        #region 날짜변경 Event

        private void btnMonPrev_Click(object sender, EventArgs e)
        {
            addMonths(-1);
        }

        private void btnDayPrev_Click(object sender, EventArgs e)
        {
            addDays(-1);
        }

        private void btnDayNext_Click(object sender, EventArgs e)
        {
            addDays(1);
        }

        private void btnMonNext_Click(object sender, EventArgs e)
        {
            addMonths(1);
        }

        private void addMonths(int month)
        {
            string strDate = btnDate.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddMonths(month);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            btnDate.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        private void addDays(int day)
        {
            string strDate = btnDate.Text;

            strDate = strDate.Split(' ')[0];

            DateTime dt = DateTime.Parse(strDate).AddDays(day);

            _now_date = dt.ToString("yyyy-MM-dd");

            CultureInfo cultures = CultureInfo.CreateSpecificCulture("ko-KR");

            btnDate.Text = dt.ToString(string.Format("yyyy-MM-dd ddd", cultures));
        }

        #endregion

        #region 조회 Event
        //조회
        private void btnDate_Click(object sender, EventArgs e)
        {
            if (clsStatic._TOLINE == "")
            {
                //입고창고가 선택되지 않았습니다.
                frmMessage frm1 = new frmMessage("Receiving warehouse not selected.", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            ganban_search();
        }

        private void ganban_search()
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("P_DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("P_COMPANY_CD", clsStatic._COMPANY_CD);
            paramsMap.Add("P_LOCATION_CD", clsStatic._TOLINE);
            paramsMap.Add("P_NOWDATE", _now_date);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable result = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialGR_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            grdMain.DataBindDataSource(result, false, false);
            _gridDt = result;

            grdMain_Color_change();
        }

        #endregion

        #region 그리드 Event
        //선택한 Row 색 변경
        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if(_gridDt.Rows.Count < 1)
            {
                return;
            }

            if (e.ColumnIndex == 0 && e.RowIndex < 0 && grdMain.Rows.Count > 0)
            {

                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    string labelYN = grdMain["LabelYN", i].Value.ToString();

                    if (labelYN != "Y")
                    {
                        if (_selectYN == "Y")
                        {
                            grdMain["ChkYN", i].Value = "N";

                            for (int j = 1; j < grdMain.ColumnCount; j++)
                            {
                                grdMain[j, i].Style.BackColor = Color.White;
                            }
                        }
                        else
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
            else
            {
                //라벨이 생성된 경우 
                string labelYN = grdMain["LabelYN", e.RowIndex].Value.ToString();

                if (labelYN == "Y")
                {
                    //이미 라벨이 생성된 항목입니다.
                    frmMessage frm1 = new frmMessage("This item has already been created.", "AUTOCLOSE");
                    frm1.ShowDialog();
                    return;
                }

                if (grdMain["ChkYN", e.RowIndex].Value.ToString() == "Y")
                {
                    grdMain["ChkYN", e.RowIndex].Value = "N";

                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.White;
                    }
                    //grdMain.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.White;
                }
                else
                {
                    grdMain["ChkYN", e.RowIndex].Value = "Y";
                    for (int j = 1; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, e.RowIndex].Style.BackColor = Color.Yellow;
                    }
                    //grdMain.Rows[e.RowIndex].DefaultCellStyle.BackColor = Color.Yellow;
                }
            }            

        }

        //특성 Row 색 변경
        private void grdMain_Color_change()
        {
            for (int i = 0; i < grdMain.Rows.Count; i++)
            {
                //라벨이 생성된 경우 
                string labelYN = grdMain["LabelYN", i].Value.ToString();

                if (labelYN == "Y")
                {
                    for (int j = 0; j < grdMain.ColumnCount; j++)
                    {
                        grdMain[j, i].Style.ForeColor = Color.Red;
                    }
                }
            }
        }

        #endregion

        #region 라벨 생성

        private void btnLabel_Click(object sender, EventArgs e)
        {
            if(_gridDt.Rows.Count == 0)
            {
                //입고된 자재가 없습니다.
                frmMessage frm1 = new frmMessage("No material has been received.", "AUTOCLOSE");
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

                    for (int i = 0; i < _gridDt.Rows.Count; i++)
                    {
                        if (_gridDt.Rows[i]["CHKYN"].ToString().Equals("Y") && _gridDt.Rows[i]["LABELYN"].ToString().Equals("N"))
                        {
                            int pollibleQty = int.Parse(_gridDt.Rows[i]["QTY"].ToString().Replace(",", ""));
                            int makeqty = pollibleQty / int.Parse(_gridDt.Rows[i]["POPCTQTY"].ToString().Replace(",", ""));
                            int etc = pollibleQty % int.Parse(_gridDt.Rows[i]["POPCTQTY"].ToString().Replace(",", ""));

                            for (int j = 0; j < makeqty; j++)
                            {
                                make_ganban(retbuf, _gridDt.Rows[i]["POPCTQTY"].ToString().Replace(",", ""), _gridDt.Rows[i]["ITEMID"].ToString(), _gridDt.Rows[i]["ITEMSTOCKINOUTID"].ToString(), _gridDt.Rows[i]["ITEMDEPARTUREID"].ToString(), _gridDt.Rows[i]["VENDORCD"].ToString());
                                Thread.Sleep(500);
                            }

                            if (etc > 0)
                            {
                                make_ganban(retbuf, etc.ToString(), _gridDt.Rows[i]["ITEMID"].ToString(), _gridDt.Rows[i]["ITEMSTOCKINOUTID"].ToString(), _gridDt.Rows[i]["ITEMDEPARTUREID"].ToString(), _gridDt.Rows[i]["VENDORCD"].ToString());
                            }
                        }
                    }
                }
            } catch (Exception ex)
            {
                delete_ganban_tmp(retbuf);
                //라벨 발행에 실패했습니다.
                frmMessage frm1 = new frmMessage("Failed to publish label", "AUTOCLOSE");
                frm1.ShowDialog();
                return;
            }

            ganban_print(retbuf);

            ganban_search();
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

        private void make_ganban(string labelid, string makeGanban, string itemId, string stockInoutId, string itemDepartureId, string vendorCd)
        {
            string ganban = "";
            string depature = "";
            string stockId = "";

            ganban = "-";
            stockId = stockInoutId;
            depature = itemDepartureId;

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
            paramsMap.Add("P_ITEM_STOCK_INOUT_ID", stockId);
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

        private void grdMain_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            if(e.ColumnIndex == 0 && grdMain.Rows.Count > 0)
            {
                
                for (int i = 0; i < grdMain.Rows.Count; i++)
                {
                    string labelYN = grdMain["LabelYN", i].Value.ToString();

                    if (labelYN != "Y")
                    {
                        if (_selectYN == "Y")
                        {
                            grdMain["ChkYN", i].Value = "N";

                            for (int j = 1; j < grdMain.ColumnCount; j++)
                            {
                                grdMain[j, i].Style.BackColor = Color.White;
                            }
                        }
                        else
                        {
                            grdMain["ChkYN", i].Value = "Y";
                            for (int j = 1; j < grdMain.ColumnCount; j++)
                            {
                                grdMain[j, i].Style.BackColor = Color.Yellow;
                            }
                        }
                    }
                }

                if(_selectYN == "Y")
                {
                    _selectYN = "N";
                }
                else
                {
                    _selectYN = "Y";
                }
                
            }
        }
    }
}
