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
    public partial class ucProductStatus : UserControl
    {
        string _sn = "";
        string _move_id = "";


        DataTable _gridDt = new DataTable();
        DataTable _scanDt = new DataTable();

        public ucProductStatus()
        {
            InitializeComponent();

            InitMainList();
            InitGanbanList();
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                   1.품목    2.품명      3.타입          4.라벨수량  5.현재고      6.이전재고   7.단위    8.규격           9.유무상구분     10.비고
            string[] headerText = new string[] { "ItemId", "ItemName", "ItemTypeName", "LabelQty", "CurrentQty", "PrevQty",   "UnitCd", "Specification", "FreeOfferName", "Description" }; //9
            string[] columnName = new string[] { "ITEMID", "ITEMNAME", "ITEMTYPENAME", "BOXQTY",   "CURRENTQTY", "PREVQTY",   "UNIT",   "SPECIFICATION", "FREEOFFERNAME", "DESCRIPTION" };
            string[] columnType = new string[] { "T",      "T",        "T",            "T",        "T",          "T",         "T",      "T",             "T",             "T" };

            int[] columnWidth = new int[]     {  170,      200,        85,             100,        100,          100,          90,      256,             160,             255 };
            bool[] columnVisible = new bool[] {  true,     true,       true,           true,       true,         true,         true,    true,            true,            true };
            bool[] columnDisable = new bool[] {  true,     true,       true,           true,       true,         true,         true,    true,            true,            true };
            string[] cellAlign = new string[] {  "L",      "L",        "C",            "C",        "R",          "R",          "C",     "L",             "C",             "C" };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdMain.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
        }

        private void InitGanbanList()
        {
            //                                   1           2         3
            string[] headerText = new string[] { "Label",    "BoxQty", "CreateDate"};
            string[] columnName = new string[] { "GANBANID", "BOXQTY", "CREATEDATE"};
            string[] columnType = new string[] { "T",        "T",      "T"};

            int[] columnWidth = new int[]     {  140,        100,      120};
            bool[] columnVisible = new bool[] {  true,       true,     true};
            bool[] columnDisable = new bool[] {  true,       true,     true};
            string[] cellAlign = new string[] {  "L",        "L",      "L"};

            grdGanban.SetBorderAndGridlineStyles();
            grdGanban.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdGanban.DefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdGanban.RowTemplate.Height = 50;

            grdGanban.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 16F, FontStyle.Bold);
            grdGanban.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;
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

        #region 간판라벨 리스트 조회

        //재고현황 그리드에서 셀 클릭 시 간판리스트 조회
        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if(e.RowIndex < 0)
            {
                return;
            }

            string itemid = grdMain["ItemId", e.RowIndex].Value.ToString();

            get_ganbanList(itemid);
        }


        private void get_ganbanList(string item)
        {
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("location", clsStatic._FROMLINE);
            paramsMap.Add("itemId", item);

            paramsList.Add(paramsMap);

            string retvalue = "";

            DataTable ganbanDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialGanban_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);

            if (ganbanDt == null)
            {
                grdGanban.RemoveAll();
                return;
            }

            if (ganbanDt.Rows.Count <= 0)
            {
                grdGanban.RemoveAll();
                return;
            }

            grdGanban.DataBindDataSource(ganbanDt, false, false);
        }
        


        #endregion

        #region 라벨 스캔 Event

        //바코드 입력
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {

            if(clsStatic._FROMLINE == "")
            {
                //From 창고가 선택되지 않았습니다.
                frmMessage frm = new frmMessage("From warehouse is not selected.", "AUTOCLOSE");
                frm.ShowDialog();
                return;
            }

            if (e.KeyCode == Keys.Enter)
            {
                if (txtSN.Text.Trim() == "")
                {
                    txtSN_Focus();
                    return;
                }
                else
                {
                    search_process(txtSN.Text);
                }
                txtSN_Focus();
            }
        }

        private string toItemid(string labeltype)
        {
            string item_id = "";
            string retvalue = "";
            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            DataTable dt = new DataTable();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("DIVISION_CD", clsStatic._DIVISION_CD);
            paramsMap.Add("COMPANY_CD", clsStatic._COMPANY_CD);

            if (labeltype == "GANBAN")
            {
                paramsMap.Add("GANBAN_ID", txtSN.Text.Trim());
            }
            else
            {
                paramsMap.Add("SN", txtSN.Text.Trim());
            }

            paramsList.Add(paramsMap);

            if (labeltype == "GANBAN")
            {
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ganban2item.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }
            else
            {
                dt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_ct2item.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            }

            if (dt == null)
            {
                return "";
            }

            if (dt.Rows.Count == 0)
            {
                return "";
            }

            item_id = dt.Rows[0]["ITEMID"].ToString().Trim();

            return item_id;
        }

        private void search_process(string item_id)
        {
            string retvalue = "";

            List<Dictionary<string, object>> paramsList = new List<Dictionary<string, object>>();
            Dictionary<string, object> paramsMap = new Dictionary<string, object>();
            paramsMap.Add("p_err_code", "");
            paramsMap.Add("divisionCd", clsStatic._DIVISION_CD);
            paramsMap.Add("companyCd", clsStatic._COMPANY_CD);
            paramsMap.Add("stockType", clsStatic._STOCK_TYPE);
            paramsMap.Add("location", clsStatic._FROMLINE);
            paramsMap.Add("itemId", item_id);

            paramsList.Add(paramsMap);

            DataTable stockDt = clsUtil.GetServiceData("com.thirautech.mom.pop.popResult.get_materialMove_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            if (stockDt == null)
            {
                //현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!
                frmMessage frm = new frmMessage("This product is not currently in storage(" + clsStatic._FROMLINE_DESC + "). Please check the label information!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (stockDt.Rows.Count <= 0)
            {
                //현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!
                frmMessage frm = new frmMessage("This product is not currently in storage(" + clsStatic._FROMLINE_DESC + "). Please check the label information!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            grdMain.DataBindDataSource(stockDt, false, false);
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

        //전체검색
        private void btnSearch_Click(object sender, EventArgs e)
        {
            txtSN.Clear();
            search_process("");
            txtSN_Focus();
        }

        private void btnSet_Click(object sender, EventArgs e)
        {
            txtSN_Focus();
        }
    }
}
