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
        }

        #region Init Event

        //메인그리드
        private void InitMainList()
        {
            //                                   1         2           3               4             5           6       7                8                9
            string[] headerText = new string[] { "품목", "품명", "품목타입명", "현재고", "이전재고", "단위", "규격", "유무상구분", "비고" }; //9
            string[] columnName = new string[] { "ITEMID", "ITEMNAME", "ITEMTYPENAME", "CURRENTQTY", "PREVQTY", "UNIT", "SPECIFICATION", "FREEOFFERNAME", "DESCRIPTION" };
            string[] columnType = new string[] { "T", "T", "T", "T", "T", "T", "T", "T", "T" };

            int[] columnWidth = new int[] { 165, 500, 190, 90, 150, 90, 256, 160, 255 };
            bool[] columnVisible = new bool[] { true, true, true, true, true, true, true, true, true };
            bool[] columnDisable = new bool[] { true, true, true, true, true, true, true, true, true };
            string[] cellAlign = new string[] { "L", "L", "C", "R", "R", "C", "L", "C", "C" };

            grdMain.SetBorderAndGridlineStyles();
            grdMain.SetGridHeader(true, headerText, columnName, columnType, columnWidth, cellAlign, columnVisible, columnDisable);
            grdMain.DefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
            grdMain.RowTemplate.Height = 50;

            grdMain.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 14F, FontStyle.Bold);
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

        #region 그리드 Event

        private void grdMain_CellClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        #endregion

        #region 라벨 스캔 Event

        //바코드 입력
        private void txtSN_KeyDown(object sender, KeyEventArgs e)
        {
            if(clsStatic._FROMLINE == "" || clsStatic._TOLINE == "")
            {
                frmMessage frm = new frmMessage("From 창고가 선택되지 않았습니다.", "AUTOCLOSE");
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
            paramsMap.Add("itemType", "");
            paramsMap.Add("itemId", item_id);
            paramsMap.Add("zeroFlag", "");

            paramsList.Add(paramsMap);

            DataTable stockDt = clsUtil.GetServiceData("com.thirautech.mom.purchase.stock.materialMove.get_materialMove_list.dummy", paramsList, clsStatic._serviceSelectURL, ref retvalue);
            if (stockDt == null)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
                frm.ShowDialog();
                txtSN_Focus();
                return;
            }

            if (stockDt.Rows.Count <= 0)
            {
                frmMessage frm = new frmMessage("현재창고(" + clsStatic._FROMLINE_DESC + ")에 해당 제품이 존재하지 않습니다. 라벨정보를 확인하여 주세요!", "AUTOCLOSE");
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
